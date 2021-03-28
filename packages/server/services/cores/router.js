const Sentry = require('@sentry/node');
const { Container } = require('typedi');
const BN = require('bn.js');
const debug = require('debug')('justbet:router.js');
const Base = require('./base');

const contractsList = Container.get('contractsList');

const { tables } = require('../../database/info');
const TRC20List = require('./trc20list');
const { inactiveSkip, timeSkip } = require('../../config').referralTimeOuts;
const { weekAgo, startOfWeek } = require('../../utils');

const { tronWeb } = Container.get('tronWebOwner');

class Router extends Base {
  constructor() {
    super(contractsList.ROUTER_ADDR, tronWeb);
  }

  async totalWon() {
    try {
      const coinflip = await this.knex(tables.COINFLIP).whereNot({
        prize: '0'
      }).select();
      const dice = await this.knex(tables.DICE).whereNot({
        prize: '0'
      }).select();
      let win = new BN();
      coinflip.forEach(elem => {
        win = win.add(new BN(elem.prize));
      });
      dice.forEach(elem => {
        win = win.add(new BN(elem.prize));
      });
      return win.toString(10);
    } catch (e) {
      debug('totalWon(): err: %o', e);
      throw new Error(e);
    }
  }

  async totalWonUSDT() {
    try {
      const coinflip = await this.knex(tables.COINFLIP_USDT).whereNot({
        prize: '0'
      }).select();
      const dice = await this.knex(tables.DICE_USDT).whereNot({
        prize: '0'
      }).select();
      let win = new BN();
      coinflip.forEach(elem => {
        win = win.add(new BN(elem.prize));
      });
      dice.forEach(elem => {
        win = win.add(new BN(elem.prize));
      });
      return win.toString(10);
    } catch (e) {
      Sentry.captureException(e);
      debug('totalWonUSDT(): err: %o', e);
      throw new Error(e);
    }
  }

  async getMultiplier(addr) {
    const ctr = await this.contract;
    const { multiplier } = await ctr.refMultiplier(addr).call();
    return this.tronWeb.toDecimal(multiplier);
  }

  async getTopTen() {
    try {
      const dices = await this.knex(tables.DICE).select();
      const coinflips = await this.knex(tables.COINFLIP).select();
      const dicesUSDT = await this.knex(tables.DICE_USDT).select();
      const coinflipsUSDT = await this.knex(tables.COINFLIP_USDT).select();
      const res = [];
      const trc20convert = new TRC20List();
      const rate = this.tronWeb.toDecimal(await trc20convert.tokenToSun(contractsList.USDTMOCK_ADDR, 1));
      [...dices, ...coinflips]
          .forEach(value => {
            const index = res.findIndex(val => val.player === value.player);
            if (index === -1) {
              res.push({
                player: value.player,
                wager: value.wager
              });
            } else {
              res[index].wager = ((new BN(res[index].wager)).add(new BN(value.wager))).toString(10);
            }
          });
      [...dicesUSDT, ...coinflipsUSDT]
          .forEach(value => {
            const index = res.findIndex(val => val.player === value.player);
            if (index === -1) {
              res.push({
                player: value.player,
                wager: ((new BN(value.wager)).mul(new BN(rate))).toString(10)
              });
            } else {
              res[index].wager = ((new BN(res[index].wager)).add((new BN(value.wager)).mul(new BN(rate)))).toString(10);
            }
          });
      res.sort((b, a) => ((new BN(a.wager)).lt(new BN(b.wager)) ? -1 : 1));
      return res.length <= 10 ? res : res.slice(0, 10);
    } catch (err) {
      Sentry.captureException(err);
      debug('getTopTen(): err: %o', err);
      throw new Error(err);
    }
  }

  async setTopPlayers(addressesList) {
    try {
      const ctr = await this.contract;
      await ctr
          .setTopPlayers(
              ...addressesList
          )
          .send();
    } catch (err) {
      Sentry.captureException(err);
      debug('setTopPlayers(addressesList): err: %o', err);
    }
  }

  async removeReferralBonus() {
    debug('Referral removing started.');
    const trxProvider = this.knex.transactionProvider();
    const trx = await trxProvider();
    try {
      const now = Date.now();
      const ctr = await this.contract;
      const referralList = await trx(tables.REFERRALS).where({ isActive: true }).select();
      const removeList = [];
      const turnOffList = [];
      // eslint-disable-next-line no-restricted-syntax
      for (const val of referralList) {
        if (now - val.timestamp >= timeSkip) {
          removeList.push(val.child);
          // eslint-disable-next-line no-await-in-loop
          await trx(tables.REFERRALS).where({ child: val.child }).update({ isRemoved: true });
        } else {
          // eslint-disable-next-line no-await-in-loop
          const { rows } = await this.knex.raw(`SELECT player from dice where player = '${val.child}' and timestamp<=${now - inactiveSkip} union
    SELECT player from "coinflipUSDT" where  player='${val.child}' and timestamp>=${now - inactiveSkip} union
        SELECT player from dice where  player='${val.child}' and timestamp>=${now - inactiveSkip} union
            SELECT player from "diceUSDT" where   player='${val.child}' and timestamp>=${now - inactiveSkip}`);
          if (rows.length === 0) {
            turnOffList.push(val.child);
            // eslint-disable-next-line no-await-in-loop
            await trx(tables.REFERRALS).where({ child: val.child }).update({ isActive: false });
          }
        }
      }
      if (removeList.length !== 0) await ctr.deleteReferences(removeList).send();
      if (turnOffList.length !== 0) await ctr.disableReferences(turnOffList).send();
      await trx.commit();
    } catch (err) {
      Sentry.captureException(err);
      debug('removeReferralBonus(): err: %o', err);
      await trx.rollback();
    }
  }

  async bankRoll() {
    try {
      return (await this.tronWeb.trx.getBalance(contractsList.ROUTER_ADDR)).toString(10);
    } catch (err) {
      Sentry.captureException(err);
      debug('bankRoll(): err: %o', err);
      throw new Error(err);
    }
  }

  async distributeProfit(trxToDistribute, usdtToDistribute, adresses) {
    try {
      const ctr = await this.contract;
      return ctr.distributeProfit(trxToDistribute, usdtToDistribute, adresses).send();
    } catch (err) {
      Sentry.captureException(err);
      debug('distributeProfit(): err: %o', err);
      throw new Error(err);
    }
  }

  async getMiningList() {
    try {
      const currentMonday = startOfWeek();
      const previousMonday = weekAgo(currentMonday);
      const dices = await this.knex(tables.DICE).where('timestamp', '>', previousMonday.getTime())
          .andWhere('timestamp', '<', currentMonday.getTime()).select();
      const coinflips = await this.knex(tables.COINFLIP).where('timestamp', '>', previousMonday.getTime())
          .andWhere('timestamp', '<', currentMonday.getTime()).select();
      const dicesUSDT = await this.knex(tables.DICE_USDT).where('timestamp', '>', previousMonday.getTime())
          .andWhere('timestamp', '<', currentMonday.getTime()).select();
      const coinflipsUSDT = await this.knex(tables.COINFLIP_USDT).where('timestamp', '>', previousMonday.getTime())
          .andWhere('timestamp', '<', currentMonday.getTime()).select();
      const res = [];
      [...dices, ...coinflips, ...dicesUSDT, ...coinflipsUSDT]
          .forEach(value => {
            const index = res.findIndex(val => val.player === value.player);
            if (index === -1) {
              res.push({
                player: value.player,
                mined: (new BN(value.mined)).toString(10)
              });
            } else {
              res[index].mined = ((new BN(res[index].mined)).add(new BN(value.mined))).toString(10);
            }
          });
      res.sort((b, a) => ((new BN(a.mined)).lt(new BN(b.mined)) ? -1 : 1));
      return res;
    } catch (err) {
      Sentry.captureException(err);
      debug('getMiningList(): err: %o', err);
      throw new Error(err);
    }
  }
}

module.exports = Router;
