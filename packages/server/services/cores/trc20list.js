const Sentry = require('@sentry/node');
const debug = require('debug')('justbet:trc20list.js');
const { Container } = require('typedi');
const Base = require('./base');

const contractsList = Container.get('contractsList');

class TRC20List extends Base {
  constructor() {
    super(contractsList.TRC20List_ADDR);
  }

  async tokenToSun(addr, amount) {
    try {
      const TRC20ListInst = await this.contract;
      const res = await TRC20ListInst.tokenToSun(addr, amount).call();
      return res;
    } catch (err) {
      Sentry.captureException(err);
      debug('tokenToSun(addr,amount): err: %o', err);
      throw new Error(err);
    }
  }
}

module.exports = TRC20List;
