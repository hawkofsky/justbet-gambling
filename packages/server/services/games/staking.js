const Sentry = require('@sentry/node');
const BN = require('bn.js');
const debug = require('debug')('justbet:staking.js');
const { Container } = require('typedi');
const Base = require('../cores/base');

const contractsList = Container.get('contractsList');

const { tables } = require('../../database/info');

const RouterInst = require('../cores/router');
const USDTInst = require('../cores/usdt');
const TRC20List = require('../cores/trc20list');

const { tronWeb } = Container.get('tronWebOwner');

const removerouterBalance = { up: new BN(1), down: new BN(10) };
const stakePercentageDecimalRaw = { up: new BN(8), down: new BN(10) };

const Router = new RouterInst();

class Staking extends Base {
    constructor() {
        super(contractsList.STAKE_ADDR, tronWeb);
    }

    async getTotalEarned(addr) {
        try {
            let usdt = new BN(0); let trx = new BN(0);
            const payouts = await this.knex(tables.STAKE_SNAPSHOT).select();
            payouts.forEach(val => {
                val.stakedList.forEach(value => {
                    if (value.user === addr) {
                        usdt = usdt.add(new BN(value.usdt));
                        trx = trx.add(new BN(value.trx));
                    }
                });
            });
            return {
                usdt: usdt.toString(10), trx: trx.toString(10)
            };
        } catch (e) {
            Sentry.captureException(e);
            debug('getTotalEarned(addr): err: %o', e);
            throw new Error(e);
        }
    }

    async getTotalStakes() {
        try {
            const ctr = await this.contract;
            const res = await ctr.activeStakesAmount().call();
            return res.toString(10);
        } catch (err) {
            Sentry.captureException(err);
            debug('getTotalStakes(addr): err: %o', err);
            throw new Error(err);
        }
    }

    async makeSnap() {
        const trxProvider = this.knex.transactionProvider();
        const trx = await trxProvider();
        try {
        debug('Snapshooting started!');
        const USDT = new USDTInst();
        const adresses = [];
        const usdts = [];
        const trxs = [];

            let snap = [];
            // const [{ lastTimestamp }] = await this.knex(tables.STAKE_SNAPSHOT).max('timestamp', { as: 'lastTimestamp' });

            const stakeList = await this.knex(tables.STAKE).orderBy('timestamp', 'desc').select();

            stakeList.forEach(val => {
                const userindex = snap.findIndex(
                    value => value.user === val.user
                );
                if (userindex !== -1) {
                    snap[userindex].stakedAmount = val.type === 'stake' ?
                        (new BN(snap[userindex].stakedAmount)).add(new BN(val.amount)).toString(10) :
                        (new BN(snap[userindex].stakedAmount)).sub(new BN(val.amount)).toString(10);
                } else {
                    snap.push({
                        user: val.user,
                        stakedAmount: val.type === 'stake' ? (new BN(val.amount)).toString(10) : `-${(new BN(val.amount)).toString(10)}`
                    });
                }
            });
            snap = snap.filter(val => !(new BN(val.stakedAmount)).isZero());
            const routerBalance =
                (new BN(await this.tronWeb.trx.getBalance(Router.addr))).mul(removerouterBalance.up).div(removerouterBalance.down);
            // TODO remove on mainnet stakePercentage;
            const routerBalanceUSDT =
                (new BN(await USDT.getBalanceRaw(Router.addr))).mul(removerouterBalance.up).div(removerouterBalance.down);
            // TODO remove on mainnet stakePercentage;
            const trxToDistribute = routerBalance.mul(stakePercentageDecimalRaw.up).div(stakePercentageDecimalRaw.down);
            const usdtToDistribute = routerBalanceUSDT.mul(stakePercentageDecimalRaw.up).div(stakePercentageDecimalRaw.down);

            const totalStake = new BN(await this.getTotalStakes());
            for (let i = 0; i < snap.length; i += 1) {
                if (snap[i].stakedAmount !== 0) {
                    adresses.push(snap[i].user);
                    const trxReward = trxToDistribute.mul(new BN(snap[i].stakedAmount)).div(totalStake).toString(10);
                    const usdtReward = usdtToDistribute.mul(new BN(snap[i].stakedAmount)).div(totalStake).toString(10);
                    trxs.push(trxReward);
                    usdts.push(usdtReward);
                    snap[i].usdt = usdtReward;
                    snap[i].trx = trxReward;
                }
            }
            if (adresses.length !== 0) {
            const [snapIndex] = await trx(tables.STAKE_SNAPSHOT).insert({
                timestamp: stakeList[0].timestamp,
                stakedList: snap,
                trxToDistribute: trxToDistribute.toString(10),
                usdtToDistribute: usdtToDistribute.toString(10),
                totalStaked: totalStake.toString(10)
            }, 'index');
            // eslint-disable-next-line no-unused-vars
            const txProfit = await Router.distributeProfit(routerBalance.toString(10), [routerBalanceUSDT.toString(10)], [USDT.addr]);
            const ctr = await this.contract;
            // eslint-disable-next-line no-unused-vars
            const withdrawRewardsRes = await ctr.distributeTRXRewards(adresses, trxs).send();
            // eslint-disable-next-line no-unused-vars
            const withdrawRewardsTRC20Res = await ctr.distributeTRC20Rewards(adresses, usdts, USDT.addr).send();
            await trx(tables.STAKE_SNAPSHOT).where({ index: snapIndex }).update({ distributed: true });
            }
            await trx.commit();
            debug('Staking payout success!');
        } catch (err) {
            Sentry.captureException(err);
            debug('makeSnap(): err: %o', err);
            await trx.rollback();
        }
    }
    //
    // async getTotalRewards() {
    //     try {
    //         const ctr = await this.contract;
    //         const res = await ctr.totalRewards().call();
    //         return this.tronWeb.toDecimal(res);
    //     } catch (err) {
    //         Sentry.captureException(err);
    //         debug('getTotalRewards(): err: %o', err);
    //         throw new Error(err);
    //     }
    // }

    async distributedYesterday() {
        const [res] = await this.knex(tables.STAKE_SNAPSHOT).orderBy('timestamp', 'desc').limit(1);
        if (res) {
            const { trxToDistribute } = res;
            const { usdtToDistribute } = res;
            return {
                    trx: trxToDistribute,
                    usdt: usdtToDistribute
            };
        }
        return {
                trx: 0,
                usdt: 0
        };
    }

    async getMultiplierTopPlayer(addr) {
        const ctr = await this.contract;
        const multiplierTopPlayer = await ctr.getTopPlayerMultiplier(addr).call();
        return this.tronWeb.toDecimal(multiplierTopPlayer);
    }

    async distributedLastWeek() {
        let trx = new BN(0); let usdt = new BN(0);
        const res = await this.knex(tables.STAKE_SNAPSHOT).orderBy('timestamp', 'desc').limit(7);
        if (res.length !== 0) {
             res.forEach(val => {
                 trx = trx.add(new BN(val.trxToDistribute));
                 usdt = usdt.add(new BN(val.usdtToDistribute));
        });
        }
        return {
                trx: trx.toString(10),
                usdt: usdt.toString(10)
        };
    }

    async totalDistributed() {
        let trx = new BN(0); let usdt = new BN(0);
        const res = await this.knex(tables.STAKE_SNAPSHOT).orderBy('timestamp', 'desc').select();
        if (res.length !== 0) {
            res.forEach(val => {
                trx = trx.add(new BN(val.trxToDistribute));
                usdt = usdt.add(new BN(val.usdtToDistribute));
            });
        }
        return {
            trx: trx.toString(10),
            usdt: usdt.toString(10)
        };
    }

    async getBalance() {
        try {
            return (await this.tronWeb.trx.getBalance(contractsList.STAKE_ADDR)).toString(10);
        } catch (err) {
            Sentry.captureException(err);
            debug('getBalance(): err: %o', err);
            throw new Error(err);
        }
    }

    async stakeOf(addr) {
        try {
            const ctr = await this.contract;
            const res = await ctr.stakeOf(addr).call();
            return {
                staked: res[0].toString(10),
                passiveStaked: res[1].toString(10)
            };
        } catch (err) {
            debug('stakeOf(): err: %o', err);
            throw new Error(err);
        }
    }

    async balanceOf(addr) {
        try {
            const ctr = await this.contract;
            const res = await ctr.balanceOf(addr).call();
            return res.toString(10);
        } catch (err) {
            Sentry.captureException(err);
            debug('balanceOf(): err: %o', err);
            throw new Error(err);
        }
    }

    // eslint-disable-next-line class-methods-use-this
    async totalWagered(addr) {
        try {
            let trx = new BN(0);
            let usdt = new BN(0);
            const diceTRX = await this.knex(tables.DICE).where({ player: addr }).select('wager');
            const diceUSDT = await this.knex(tables.DICE_USDT).where({ player: addr }).select('wager');
            const coinflipTRX = await this.knex(tables.COINFLIP).where({ player: addr }).select('wager');
            const coinflipUSDT = await this.knex(tables.COINFLIP_USDT).where({ player: addr }).select('wager');
            [...diceUSDT, ...coinflipUSDT].forEach(val => {
                usdt = usdt.add(new BN(val.wager));
            });
            [...diceTRX, ...coinflipTRX].forEach(val => {
                trx = trx.add(new BN(val.wager));
            });

            return {
                usdt: usdt.toString(10),
                trx: trx.toString(10)
            };
        } catch (err) {
            Sentry.captureException(err);
            debug('totalWagered(): err: %o', err);
            throw new Error(err);
        }
    }

    async totalSupply() {
        try {
            const ctr = await this.contract;
            return (await ctr.totalSupply().call()).toString(10);
        } catch (err) {
            Sentry.captureException(err);
            debug('totalSupply(): err: %o', err);
            throw new Error(err);
        }
    }

    async efficiencyOfWinr() {
        try {
            let total = 0;
            const tick = await this.tronWeb.getEventResult(contractsList.ROUTER_ADDR, {
                eventName: 'Tick',
                onlyConfirmed: true
            });
            tick.forEach(val => {
                total += this.tronWeb.toDecimal(val.result.dailyCoefficient || 0);
            });
            return total / tick.length;
        } catch (err) {
            Sentry.captureException(err);
            debug('efficiencyOfWinr(): err: %o', err);
            throw new Error(err);
        }
    }

    async efficiencyOfWinrUSDT() {
        try {
            const USDT = new USDTInst();
            const trc20convert = new TRC20List();
            const rate = this.tronWeb.toDecimal(await trc20convert.tokenToSun(USDT.addr, 1));

            let total = 0;
            const tick = await this.tronWeb.getEventResult(contractsList.ROUTER_ADDR, {
                eventName: 'Tick',
                onlyConfirmed: true
            }) || 0;
            tick.forEach(val => {
                total += this.tronWeb.toDecimal(val.result.dailyCoefficient || 0);
            });
            return (total * rate) / tick.length;
        } catch (err) {
            Sentry.captureException(err);
            debug('efficiencyOfWinrUSDT(): err: %o', err);
            throw new Error(err);
        }
    }

    async efficiencyOfWinrYesterday() {
        try {
            const [res] = await this.tronWeb.getEventResult(contractsList.ROUTER_ADDR, {
                eventName: 'Tick',
                size: 1,
                onlyConfirmed: true
            });
            return Number(res ? res.result.dailyCoefficient : 0);
        } catch (err) {
            Sentry.captureException(err);
            debug('efficiencyOfWinrYesterday(): err: %o', err);
            throw new Error(err);
        }
    }

    async efficiencyOfWinrYesterdayUSDT() {
        try {
            const USDT = new USDTInst();
            const trc20convert = new TRC20List();
            const rate = this.tronWeb.toDecimal(await trc20convert.tokenToSun(USDT.addr, 1));
            const [{ result }] = await this.tronWeb.getEventResult(contractsList.ROUTER_ADDR, {
                eventName: 'Tick',
                size: 1,
                onlyConfirmed: true
            });
            return Number(result.dailyCoefficient || 0) * rate;
        } catch (err) {
            Sentry.captureException(err);
            debug('efficiencyOfWinrYesterdayUSDT(): err: %o', err);
            throw new Error(err);
        }
    }

    async efficiencyOfStakingWinr() {
        try {
            const totalStaked = new BN(0);
            const totalpayoutTRX = new BN(0);
            const totalpayoutUSDT = new BN(0);
            const list = await this.knex(tables.STAKE_SNAPSHOT).select();
            if (list.length !== 0) {
                 list.forEach(val => {
                totalStaked.add(new BN(val.totalStaked));
                totalpayoutTRX.add(new BN(val.trxToDistribute));
                totalpayoutUSDT.add(new BN(val.usdtToDistribute));
            });
            }
            return {
                trx: (1000 * this.tronWeb.toDecimal(this.tronWeb.fromSun(totalpayoutTRX)))
                    / (this.tronWeb.toDecimal(this.tronWeb.fromSun(totalStaked)) || 1),
                usdt: (1000 * this.tronWeb.toDecimal(this.tronWeb.fromSun(totalpayoutUSDT)))
                    / (this.tronWeb.toDecimal(this.tronWeb.fromSun(totalStaked)) || 1)
            };
        } catch (err) {
            Sentry.captureException(err);
            debug('efficiencyOfStakingWinr(): err: %o', err);
            throw new Error(err);
        }
    }

    async efficiencyOfStakingWinrYest() {
        try {
            const [list] = await this.knex(tables.STAKE_SNAPSHOT).orderBy('timestamp', 'desc').limit(1);
            return {
                trx: Math.round((1000 * list ? list.trxToDistribute : 0) / list ? list.totalStaked : 0),
                usdt: Math.round((1000 * list ? list.usdtToDistribute : 0) / list ? list.totalStaked : 0)
            };
        } catch (err) {
            Sentry.captureException(err);
            debug('efficiencyOfStakingWinrYest(): err: %o', err);
            throw new Error(err);
        }
    }
}

module.exports = Staking;
