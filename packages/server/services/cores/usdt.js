const Sentry = require('@sentry/node');
const debug = require('debug')('justbet:usdt.js');
const { Container } = require('typedi');
const Base = require('./base');

const contractsList = Container.get('contractsList');

class USDT extends Base {
  constructor() {
    super(contractsList.USDTMOCK_ADDR);
  }

  async getBalance(addr) {
    try {
      const usdt = await this.contract;
      return (await usdt.balanceOf(addr).call()).toString(10);
    } catch (err) {
      Sentry.captureException(err);
      debug('getBalance(addr): err: %o', err);
      throw new Error(err);
    }
  }

  async getBalanceRaw(addr) {
    try {
      const usdt = await this.contract;
      return (await usdt.balanceOf(addr).call()).toString(10);
    } catch (err) {
      Sentry.captureException(err);
      debug('getBalanceRaw(addr): err: %o', err);
      throw new Error(err);
    }
  }
}

module.exports = USDT;
