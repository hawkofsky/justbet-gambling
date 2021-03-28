const Sentry = require('@sentry/node');
const debug = require('debug')('justbet:lotteryEvent.js');
const { Container } = require('typedi');

const Base = require('../cores/base');
const { tables } = require('../../database/info');

const contractsList = Container.get('contractsList');
const { regulateNumbers, parseDraw } = require('../../utils');

class LotteryEventHandler extends Base {
  constructor() {
    super(contractsList.LOTTERY_ADDR);
  }

  async UpdateOldTickets() {
    const trxProvider = this.knex.transactionProvider();
    const trx = await trxProvider();
    try {
      const [{ max }] = await trx(tables.TICKETS).max('timestamp');
      const eventsList = await this.tronWeb.getEventResult(this.addr, {
        eventName: 'TicketBuy',
        size: 200
      });
      // eslint-disable-next-line no-restricted-syntax
      for (const event of eventsList) {
        if (event.timestamp > max) {
          const nums = regulateNumbers(event.result[3]);
          // eslint-disable-next-line no-await-in-loop
          await trx(tables.TICKETS).insert({
            roundId: event.result.roundId,
            player: this.tronWeb.address.fromHex(event.result.player),
            timestamp: event.timestamp,
            ticketHash: event.result.ticketHash,
            numbers: nums.slice(0, 5),
            ticketIndex: nums[nums.length - 1]
          });
        }
      }
      await trx.commit();
    } catch (err) {
      Sentry.captureException(err);
      debug('UpdateOldTickets(): err: %o', err);
      await trx.rollback();
    }
  }

  async ListenForTickets() {
    debug('Tickets handling started!');
    const ctr = await this.contract;
    ctr.TicketBuy().watch(async (err, event) => {
      const trxProvider = this.knex.transactionProvider();
      const trx = await trxProvider();
      try {
        if (err) throw err;
        const nums = regulateNumbers(event.result[3]);
        await trx(tables.TICKETS).insert({
          roundId: event.result.roundId,
          player: this.tronWeb.address.fromHex(event.result.player),
          timestamp: event.timestamp,
          ticketHash: event.result.ticketHash,
          numbers: nums.slice(0, 5),
          ticketIndex: nums[nums.length - 1]
        });
        await trx.commit();
      } catch (e) {
        Sentry.captureException(e);
        await trx.rollback();
        debug('ListenForTickets(): err: %o', err);
        await this.UpdateOldTickets();
      }
    });
  }

  /*
   * Get old BlockNumber events (setTCBlockNumber), proceed and save data
   * */
  async UpdateOldSetBlock() {
    const trxProvider = this.knex.transactionProvider();
    const trx = await trxProvider();
    try {
      const [{ max }] = await trx(tables.LOTTERY_BLOCK_NUMBER).max('timestamp');
      const eventsList = await this.tronWeb.getEventResult(this.addr, {
        eventName: 'BlockNumber'
      });
      // eslint-disable-next-line no-restricted-syntax
      for (let i = 0; i < eventsList.length; i += 1) {
        if (eventsList[i].timestamp > +max) {
          // eslint-disable-next-line no-await-in-loop
          await trx.raw(
            `
                        INSERT INTO lottery_block_number ("roundId", "blockNumber", timestamp)
                        VALUES (?, ?, ?)
                        ON CONFLICT ("roundId") DO UPDATE SET "blockNumber" = ?,
                                                              timestamp     = ?
                    `,
            [
              eventsList[i].result.roundId,
              eventsList[i].result.blockNumber,
              eventsList[i].timestamp,
              eventsList[i].result.blockNumber,
              eventsList[i].timestamp
            ]
          );
          debug('BlockNumber for round %o stored, block: $%o', eventsList[i].result.roundId, eventsList[i].result.blockNumber);
        }
      }
      await trx.commit();
    } catch (err) {
      Sentry.captureException(err);
      debug('UpdateOldSetBlock(): err: %o', err);
      await trx.rollback();
    }
  }

  /*
   * Subscribe to BlockNumber event (setTCBlockNumber)
   * */
  async ListenSetBLock() {
    debug('BlockNumber handling started!');
    const ctr = await this.contract;
    ctr.BlockNumber().watch(async (err, event) => {
      const trxProvider = this.knex.transactionProvider();
      const trx = await trxProvider();
      try {
        if (err) throw err;
        await trx.raw(
          `
                    INSERT INTO lottery_block_number ("roundId", "blockNumber", timestamp) VALUES (?, ?, ?)
                    ON CONFLICT ("roundId") DO UPDATE SET "blockNumber" = ?, timestamp = ?
                `,
          [
            event.result.roundId,
            event.result.blockNumber,
            event.timestamp,
            event.result.blockNumber,
            event.timestamp
          ]
        );
        await trx.commit();
        debug('BlockNumber for round %o stored, block: %o', event.result.roundId, event.result.blockNumber);
      } catch (e) {
        Sentry.captureException(e);
        debug('ListenSetBLock(): err: %o', e);
        await trx.rollback();
        await this.UpdateOldSetBlock();
      }
    });
  }

  /*
   * Get old Drawn events (draw) starting from last timestamp, proceed and save data
   * */
  async UpdateOldDraws() {
    const trxProvider = this.knex.transactionProvider();
    const trx = await trxProvider();
    try {
      const [{ max }] = await trx(tables.LOTTERY_DRAW).max('timestamp');
      const eventsList = await this.tronWeb.getEventResult(this.addr, {
        eventName: 'Drawn'
      });
      // eslint-disable-next-line no-restricted-syntax
      for (let i = 0; i < eventsList.length; i += 1) {
        if (eventsList[i].timestamp > +max) {
          const parsedDraw = parseDraw(
            eventsList[i].result[3],
            eventsList[i].result.winnerLength
          );
          // eslint-disable-next-line no-await-in-loop
          await trx(tables.LOTTERY_DRAW).insert({
            roundId: eventsList[i].result.roundId,
            winningTickets: parsedDraw.winningTickets,
            winners: parsedDraw.winners,
            jackpotTRX: parsedDraw.jackpotTRX,
            jackpotUSDT: parsedDraw.jackpotUSDT,
            timestamp: eventsList[i].timestamp
          });
          debug('Draw for round %o stored', eventsList[i].result.roundId);
        }
      }
      await trx.commit();
    } catch (err) {
      Sentry.captureException(err);
      debug('UpdateOldDraws(): err: %o', err);
      await trx.rollback();
    }
  }

  /*
   * Subscribe to Drawn event (draw), receive, parse and store data
   * */
  async ListenDraws() {
    debug('Draw handling started!');
    const ctr = await this.contract;
    ctr.Drawn().watch(async (err, event) => {
      const trxProvider = this.knex.transactionProvider();
      const trx = await trxProvider();
      try {
        if (err) throw err;
        const parsedDraw = parseDraw(event.result[3], event.result.winnerLength);
        await trx(tables.LOTTERY_DRAW).insert({
          roundId: event.result.roundId,
          winningTickets: parsedDraw.winningTickets,
          winners: parsedDraw.winners,
          jackpotTRX: parsedDraw.jackpotTRX,
          jackpotUSDT: parsedDraw.jackpotUSDT,
          timestamp: event.timestamp
        });
        await trx.commit();
        debug('Draw for round %o stored', event.result.roundId);
      } catch (e) {
        Sentry.captureException(e);
        debug('ListenDraws(): err: %o', e);
        await trx.rollback();
        await this.UpdateOldDraws();
      }
    });
  }
}

module.exports = LotteryEventHandler;
