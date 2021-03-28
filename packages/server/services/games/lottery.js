const Sentry = require('@sentry/node');
const debug = require('debug')('justbet:lottery.js');
const { Container } = require('typedi');
const Base = require('../cores/base');

const contractsList = Container.get('contractsList');
const { tables } = require('../../database/info');

// TODO fix events listenings
class Lottery extends Base {
  constructor() {
    super(contractsList.LOTTERY_ADDR);
  }

  async getBalance() {
    try {
      return (await this.tronWeb.trx.getBalance(contractsList.LOTTERY_ADDR)).toString(10);
    } catch (err) {
      Sentry.captureException(err);
      debug('getBalance(): err: %o', err);
      throw new Error(err);
    }
  }

  async getDrawn() {
    const data = await this.knex.raw(`
            SELECT ld."roundId",
                   ld."winningTickets",
                   ld.winners, ld."jackpotTRX",
                   ld."jackpotUSDT",
                   ld.timestamp,
                   lbn."blockNumber"
            FROM lottery_draw ld
            LEFT JOIN lottery_block_number lbn on ld."roundId" = lbn."roundId"
            ORDER BY timestamp DESC
        `);
    return data.rows;
  }

  async getCurrentRoundId() {
    try {
      const ctr = await this.contract;
      return this.tronWeb.toDecimal(await ctr.currentRoundId().call());
    } catch (err) {
      Sentry.captureException(err);
      debug('getCurrentRoundId(): err: %o', err);
      throw new Error(err);
    }
  }

  async isSaleAvailable() {
    const roundId = await this.getCurrentRoundId();
    const setBlock = await this.knex(tables.LOTTERY_BLOCK_NUMBER)
      .select()
      .where({ roundId });
    return !setBlock[0];
  }

  async getRoundById(id) {
    try {
      const ctr = await this.contract;
      const values = await ctr.getRoundById(id).call();
      return {
        roundId: this.tronWeb.toDecimal(values[0]),
        totalTicketCount: this.tronWeb.toDecimal(values[1]),
        blockNumber: this.tronWeb.toDecimal(values[3]),
        transferred: values[7],
        bitcoinBlockHash: values[5]
      };
    } catch (err) {
      Sentry.captureException(err);
      debug('getRoundById(): err: %o', err);
      throw new Error(err);
    }
  }

  async getTransferedWeeks() {
    try {
      const ctr = await this.contract;
      return this.tronWeb.toDecimal(await ctr.transferredWeeks().call());
    } catch (err) {
      Sentry.captureException(err);
      debug('getTransferedWeeks(): err: %o', err);
      throw new Error(err);
    }
  }

  async getTickets(address) {
    try {
      const roundId = await this.getCurrentRoundId();
      const eventsList = address
        ? await this.knex(tables.TICKETS)
            .where({ player: address, roundId })
            .orderBy('ticketIndex', 'desc')
        : await this.knex(tables.TICKETS)
            .where({ roundId })
            .orderBy('ticketIndex', 'desc');
      const parsed = eventsList.map(val => {
        return {
          player: val.player,
          numbers: val.numbers,
          roundId: val.roundId,
          index: val.ticketIndex
        };
      });
      return parsed;
    } catch (err) {
      Sentry.captureException(err);
      debug('getTickets(): err: %o', err);
      throw new Error(err);
    }
  }
}

module.exports = Lottery;
