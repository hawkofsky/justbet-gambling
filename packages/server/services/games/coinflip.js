const Sentry = require('@sentry/node');
const BN = require('bn.js');
const debug = require('debug')('justbet:coinflip.js');
const { Container } = require('typedi');
const Base = require('../cores/base');

const { tables } = require('../../database/info');

const contractsList = Container.get('contractsList');

class CoinFlip extends Base {
  constructor() {
    super(contractsList.COINFLIP_ADDR);
  }

  async getLastBets(USDT = false, limit = 100, offset = 0) {
    try {
      const eventsList = await this.knex(
        USDT ? tables.COINFLIP_USDT : tables.COINFLIP
      )
        .orderBy('timestamp', 'desc')
        .limit(limit)
        .offset(offset);
      return eventsList.map(val => {
        return {
          token: USDT ? 'USDT' : 'TRX',
          game: 'Coinflip',
          timestamp: val.timestamp,
          player: val.player,
          wager: val.wager,
          profit: ((new BN(val.prize)).sub(new BN(val.wager))).toString(10),
          multiplier: val.multiplier,
          mined: val.mined
        };
      });
    } catch (err) {
      Sentry.captureException(err);
      debug('getLastBets(): err: %o', err);
      throw new Error(err);
    }
  }

  async getHighRolls(minWager = 0, USDT = false) {
    try {
      const eventsList = await this.knex(
        USDT ? tables.COINFLIP_USDT : tables.COINFLIP
      ).orderBy('timestamp', 'desc');

      const usersList = [];
      eventsList.forEach(val => {
        usersList.push({
          token: USDT ? 'USDT' : 'TRX',
          game: 'Coinflip',
          timestamp: val.timestamp,
          player: val.player,
          wager: val.wager,
          profit: ((new BN(val.prize)).sub(new BN(val.wager))).toString(10),
          multiplier: val.multiplier
        });
      });
      return usersList.filter(val => (new BN(val.wager)).gte(new BN(minWager)));
    } catch (err) {
      Sentry.captureException(err);
      debug('getHighRolls(): err: %o', err);
      throw new Error(err);
    }
  }
}

module.exports = CoinFlip;
