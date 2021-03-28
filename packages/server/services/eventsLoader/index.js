const scheduler = require('node-schedule');
const DiceEventInst = require('./diceEvent');
const CoinflipEventInst = require('./coinflipEvent');
const StakeEventInst = require('./stakingEvent');
const LotteryEventInst = require('./lotteryEvent');
const ReferralInst = require('./referralEvent');
const StakeInst = require('../games/staking');
const RouterInst = require('../cores/router');
const { tables } = require('../../database/info');

async function startUp() {
    const DiceEvent = new DiceEventInst();
    const CoinflipEvent = new CoinflipEventInst();
    const LotteryEvent = new LotteryEventInst();
    const StakeEvent = new StakeEventInst();
    const Staking = new StakeInst();
    const Router = new RouterInst();
    const Referral = new ReferralInst();
    await DiceEvent.UpdateOld(tables.DICE, 'Result');
    await DiceEvent.UpdateOld(tables.DICE_USDT, 'ResultTRC20');
    await CoinflipEvent.UpdateOld(tables.COINFLIP, 'Result');
    await CoinflipEvent.UpdateOld(tables.COINFLIP_USDT, 'ResultTRC20');
    await StakeEvent.UpdateOldStake();
    await StakeEvent.UpdateOldUnstake();
    await LotteryEvent.UpdateOldTickets();
    await LotteryEvent.UpdateOldSetBlock();
    await LotteryEvent.UpdateOldDraws();
    await Referral.UpdateOldReferrals();
    DiceEvent.ListenLive(tables.DICE, 'Result').catch(console.error);
    DiceEvent.ListenLive(tables.DICE_USDT, 'ResultTRC20').catch(console.error);
    CoinflipEvent.ListenLive(tables.COINFLIP, 'Result').catch(console.error);
    CoinflipEvent.ListenLive(tables.COINFLIP_USDT, 'ResultTRC20').catch(console.error);
    StakeEvent.StakingListener().catch(console.error);
    LotteryEvent.ListenForTickets().catch(console.error);
    LotteryEvent.ListenSetBLock().catch(console.error);
    LotteryEvent.ListenDraws().catch(console.error);
    Referral.ListenForReferrals().catch(console.error);
    if (process.env.NODE_ENV) {
        scheduler.scheduleJob('59 * * * *', async () => {
        await Staking.makeSnap();
    });
        scheduler.scheduleJob('* */1 * * *', async () => {
            const res = await Router.getTopTen();
            await Router.setTopPlayers([res[0].player, res[1].player, res[2].player]);
        });
        scheduler.scheduleJob('*/10 * * * *', async () => {
            await Router.removeReferralBonus();
        });
    }
}
module.exports = {
    startUp
};
