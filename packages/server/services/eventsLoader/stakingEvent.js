const Sentry = require('@sentry/node');
const debug = require('debug')('justbet:stakingEvent.js');
const { Container } = require('typedi');
const Base = require('../cores/base');
const { tables } = require('../../database/info');

const contractsList = Container.get('contractsList');

class StakingEventHandler extends Base {
    constructor() {
        super(contractsList.STAKE_ADDR);
    }

    async UpdateOldStake() {
        const trxProvider = this.knex.transactionProvider();
        const trx = await trxProvider();
        try {
            const [{ max }] = await trx(tables.STAKE).where({ type: 'stake' }).max('timestamp');
            const eventsList = await this.tronWeb.getEventResult(this.addr, {
                eventName: 'Staked',
                sinceTimestamp: max || 0
            });
            // eslint-disable-next-line no-restricted-syntax
            for (const event of eventsList) {
                if (event.timestamp > max) {
                    // eslint-disable-next-line no-await-in-loop
                    await trx(tables.STAKE).insert({
                        amount: event.result.amount,
                        user: this.tronWeb.address.fromHex(event.result.user),
                        timestamp: event.timestamp,
                        type: 'stake'
                    });
                }
            }
            await trx.commit();
        } catch (e) {
            Sentry.captureException(e);
            debug('UpdateOldStake(): err: %o', e);
            await trx.rollback();
        }
    }

    async UpdateOldUnstake() {
        const trxProvider = this.knex.transactionProvider();
        const trx = await trxProvider();
        try {
            const [{ max }] = await trx(tables.STAKE).where({ type: 'unstake' }).max('timestamp', { as: 'max' });
            const eventsList = await this.tronWeb.getEventResult(this.addr, {
                eventName: 'Unstaked',
                size: 200
            });
            // eslint-disable-next-line no-restricted-syntax
            for (const event of eventsList) {
                if (event.timestamp > max) {
                    // eslint-disable-next-line no-await-in-loop
                    await trx(tables.STAKE).insert({
                        amount: event.result.amount,
                        user: this.tronWeb.address.fromHex(event.result.user),
                        timestamp: event.timestamp,
                        type: 'unstake'
                    });
                }
            }
            await trx.commit();
        } catch (err) {
            Sentry.captureException(err);
            debug('UpdateOldUnstake(): err: %o', err);
            await trx.rollback();
        }
    }

    async StakingListener() {
        debug('Staked handling started!');
        const ctr = await this.contract;
        ctr.Staked().watch(async (err, event) => {
            const trxProvider = this.knex.transactionProvider();
            const trx = await trxProvider();
            try {
                if (err) throw err;
                await trx(tables.STAKE).insert({
                    amount: event.result.amount,
                    user: this.tronWeb.address.fromHex(event.result.user),
                    timestamp: event.timestamp,
                    type: 'stake'
                });
                await trx.commit();
            } catch (e) {
                Sentry.captureException(e);
                debug('StakingListener(): err: %o', e);
                await trx.rollback();
                await this.UpdateOldStake();
            }
        });
        ctr.Unstaked().watch(async (err, event) => {
            const trxProvider = this.knex.transactionProvider();
            const trx = await trxProvider();
            try {
                if (err) throw err;
                await trx(tables.STAKE).insert({
                    amount: event.result.amount,
                    user: this.tronWeb.address.fromHex(event.result.user),
                    timestamp: event.timestamp,
                    type: 'unstake'
                });
                await trx.commit();
            } catch (e) {
                Sentry.captureException(e);
                debug('StakingListener(): err: %o', e);
                await trx.rollback();
                await this.UpdateOldUnstake();
            }
        });
    }
}

module.exports = StakingEventHandler;
