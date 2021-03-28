const Sentry = require('@sentry/node');
const debug = require('debug')('justbet:diceEvent.js');
const { Container } = require('typedi');
const Base = require('../cores/base');

const contractsList = Container.get('contractsList');
const Router = require('../cores/router');
const Stake = require('../games/staking');

class DiceEventHandler extends Base {
    constructor() {
        super(contractsList.DICE_ADDR);
        this.RouterInst = new Router();
        this.Staking = new Stake();
    }

    async UpdateOld(table, eventName) {
        const trxProvider = this.knex.transactionProvider();
        const trx = await trxProvider();
        try {
            const [{ max }] = await trx(table).max('timestamp');
            const eventsList = await this.tronWeb.getEventResult(this.addr, {
                eventName,
                size: 200
            });
            // eslint-disable-next-line no-restricted-syntax
            for (const event of eventsList) {
                if (event.timestamp > max || 0) {
                    // eslint-disable-next-line no-await-in-loop
                    const res = await this.tronWeb.getEventByTransactionID(event.transaction);
                    const eventIndex = res.findIndex(
                        value => value.name === 'Transfer' && value.contract === contractsList.WINR_ADDR
                    );
                    // eslint-disable-next-line no-await-in-loop
                    const multiplier = (await this.RouterInst.getMultiplier(event.result.player)
                        // eslint-disable-next-line no-await-in-loop
                        * await this.Staking.getMultiplierTopPlayer(event.result.player)) / 1e4;
                    // eslint-disable-next-line no-await-in-loop
                    await trx(table).insert({
                        gameId: event.result.gameId,
                        roll: event.result.roll,
                        var1: event.result.var1,
                        var2: event.result.var2,
                        player: this.tronWeb.address.fromHex(event.result.player),
                        wager: event.result.wager,
                        result: event.result.result === 'true',
                        prize: event.result.prize,
                        timestamp: event.timestamp,
                        multiplier,
                        mined: res[eventIndex].result.value
                    });
                }
            }
            await trx.commit();
        } catch (err) {
            await trx.rollback();
            Sentry.captureException(err);
            debug('UpdateOld() - %o: err: %o', table, err);
        }
    }

    async ListenLive(table, eventName) {
        const ctr = await this.contract;
        ctr[eventName]().watch(async (err, event) => {
            const trxProvider = this.knex.transactionProvider();
            const trx = await trxProvider();
            try {
                if (err) throw err;
                const res = await this.tronWeb.getEventByTransactionID(event.transaction);
                const eventIndex = res.findIndex(
                    value => value.name === 'Transfer' && value.contract === contractsList.WINR_ADDR
                );
                // eslint-disable-next-line no-await-in-loop
                const multiplier = (await this.RouterInst.getMultiplier(event.result.player)
                    // eslint-disable-next-line no-await-in-loop
                    * await this.Staking.getMultiplierTopPlayer(event.result.player)) / 1e4;
                await trx(table).insert({
                    gameId: event.result.gameId,
                    roll: event.result.roll,
                    var1: event.result.var1,
                    var2: event.result.var2,
                    player: this.tronWeb.address.fromHex(event.result.player),
                    wager: event.result.wager,
                    result: event.result.result === 'true',
                    prize: event.result.prize,
                    timestamp: event.timestamp,
                    multiplier,
                    mined: res[eventIndex].result.value
                });
                await trx.commit();
            } catch (e) {
                Sentry.captureException(e);
                debug('ListenLive(): err: %o', e);
                await trx.rollback();
                await this.UpdateOld(table, eventName);
            }
        });
    }
}
module.exports = DiceEventHandler;
