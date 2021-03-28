const Sentry = require('@sentry/node');
const debug = require('debug')('justbet:referralEvent.js');
const { Container } = require('typedi');

const Base = require('../cores/base');
const { tables } = require('../../database/info');
const { mockAddressReferral, emptyAddress } = require('../../config');

const contractsList = Container.get('contractsList');

class LotteryEventHandler extends Base {
  constructor() {
    super(contractsList.ROUTER_ADDR);
  }

  async UpdateOldReferrals() {
    const trxProvider = this.knex.transactionProvider();
    const trx = await trxProvider();
    try {
      const [{ max }] = await trx(tables.REFERRALS).max('timestamp', {
        as: 'max'
      });
      const eventsList = await this.tronWeb.getEventResult(this.addr, {
        eventName: 'AddReferral',
        size: 200
      });
      // eslint-disable-next-line no-restricted-syntax
      for (const event of eventsList) {
        if (
          event.timestamp > max &&
          this.tronWeb.address.fromHex(event.result.parent) !==
            mockAddressReferral &&
          event.result.parent !== emptyAddress
        ) {
          // eslint-disable-next-line no-await-in-loop
          const [res] = await trx(tables.REFERRALS).where({
            parent: event.result.parent,
            child: event.result.child,
          });
          if (res) {
            // eslint-disable-next-line no-await-in-loop
            await trx(tables.REFERRALS).where({
              parent: this.tronWeb.address.fromHex(event.result.parent),
              child: this.tronWeb.address.fromHex(event.result.child)
            }).update({ isActive: true });
          } else {
          // eslint-disable-next-line no-await-in-loop
          await trx(tables.REFERRALS).insert({
            parent: this.tronWeb.address.fromHex(event.result.parent),
            child: this.tronWeb.address.fromHex(event.result.child),
            timestamp: event.timestamp
            });
          }
        }
      }
      await trx.commit();
    } catch (e) {
      Sentry.captureException(e);
      debug('UpdateOldReferrals(): err: %o', e);
      await trx.rollback();
    }
    return this;
  }

  async ListenForReferrals() {
    const ctr = await this.contract;
    ctr.AddReferral().watch(async (err, event) => {
      const trxProvider = this.knex.transactionProvider();
      const trx = await trxProvider();
      try {
        if (err) throw err;
        if (
          this.tronWeb.address.fromHex(event.result.parent) !==
            mockAddressReferral &&
          event.result.parent !== emptyAddress
        ) {
          const [res] = await trx(tables.REFERRALS).where({
            parent: event.result.parent,
            child: event.result.child,
          });
          if (res) {
            // eslint-disable-next-line no-await-in-loop
            await trx(tables.REFERRALS).where({
              parent: this.tronWeb.address.fromHex(event.result.parent),
              child: this.tronWeb.address.fromHex(event.result.child)
            }).update({ isActive: true });
          } else {
            // eslint-disable-next-line no-await-in-loop
            await trx(tables.REFERRALS).insert({
              parent: this.tronWeb.address.fromHex(event.result.parent),
              child: this.tronWeb.address.fromHex(event.result.child),
              timestamp: event.timestamp
            });
          }
        }
        await trx.commit();
      } catch (e) {
        Sentry.captureException(e);
        debug('ListenForReferrals(): err: %o', e);
        await trx.rollback();
        await this.UpdateOldReferrals();
      }
    });
  }
}

module.exports = LotteryEventHandler;
