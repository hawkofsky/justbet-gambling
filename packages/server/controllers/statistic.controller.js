const BN = require('bn.js');
const Router = require('../services/cores/router');
const Lottery = require('../services/games/lottery');
const Dice = require('../services/games/dice');
const Staking = require('../services/games/staking');
const CoinFlip = require('../services/games/coinflip');
const USDT = require('../services/cores/usdt');

const minWagerHighRoll = 1000 * 1e6;
const minWagerHighRollUSDT = 100 * 1e6;
const USDTinst = new USDT();
const Lotteryinst = new Lottery();
const Routerinst = new Router();
const Stakinginst = new Staking();
const Diceinst = new Dice();
const CoinFlipinst = new CoinFlip();

const statisticsGeneralInfo = async (req, res) => {
  try {
    const USDTBal = await USDTinst.getBalance(Lotteryinst.addr);
    const weeksTrx = await Lotteryinst.getTransferedWeeks();
    const currentRoundID = await Lotteryinst.getCurrentRoundId();
    const { totalTicketCount } = await Lotteryinst.getRoundById(currentRoundID);
    res.status(200).send({
      lotteryJackpotUSDT: USDTBal,
      weeksTransfered: weeksTrx,
      totalTickets: totalTicketCount,
      totalStaked: await Stakinginst.getTotalStakes(),
      totalWon: await Routerinst.totalWon(),
      totalWonUSDT: await Routerinst.totalWonUSDT(),
      bankroll: await Routerinst.bankRoll(),
      bankrollUSDT: await USDTinst.getBalance(Routerinst.addr),
      airdropped: await Stakinginst.totalDistributed(),
      airdroppedYesterday: await Stakinginst.distributedYesterday(),
      airdroppedLastWeek: await Stakinginst.distributedLastWeek(),
      currentDailyPoolTRX: (new BN(await Routerinst.bankRoll())).mul(new BN(64)).div(new BN(100)).toString(10),
      currentDailyPoolUSDT:
          (new BN(await USDTinst.getBalance(Routerinst.addr))).mul(new BN(64)).div(new BN(100)).toString(10),
      lotteryJackpot: await Lotteryinst.getBalance(),
      winrBalance: (await Stakinginst.getBalance()),
      totalSupply: await Stakinginst.totalSupply()
    });
  } catch (e) {
    res.status(500).json({ err: e.message });
  }
};

const statisticsLatestBets = async (req, res) => {
  try {
    const { offset = 0, count = 30 } = req.query;
    const dices = await Diceinst.getLastBets(false, count);
    const coinflips = await CoinFlipinst.getLastBets(false, count);
    const dicesUSDT = await Diceinst.getLastBets(true, count);
    const coinflipsUSDT = await CoinFlipinst.getLastBets(true, count);
    const allgames = [];
    allgames.push(...dices, ...coinflips, ...dicesUSDT, ...coinflipsUSDT);
    res
      .status(200)
      .send(
        allgames
          .sort((a, b) => b.timestamp - a.timestamp)
          .slice(+offset, +count + +offset)
      );
  } catch (e) {
    res.status(500).json({ err: e.message });
  }
};

const statisticsMyBets = async (req, res) => {
  try {
    // eslint-disable-next-line no-unused-vars
    const { offset = 0, count = 30, isUsdt = false } = req.query;
    const dices = await Diceinst.getLastBets(false, count, offset);
    const coinflips = await CoinFlipinst.getLastBets(false, count, offset);
    const dicesUSDT = await Diceinst.getLastBets(true);
    const coinflipsUSDT = await CoinFlipinst.getLastBets(true);
    const allgames = [];
    allgames.push(...dices, ...coinflips, ...dicesUSDT, ...coinflipsUSDT);
    res
      .status(200)
      .send(
        allgames
          .filter(val => val.player === req.params.addr)
          .sort((a, b) => b.timestamp - a.timestamp)
      );
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

const highRollers = async (req, res) => {
  try {
    const { offset = 0, count = 30 } = req.query;
    const dices = await Diceinst.getHighRolls(minWagerHighRoll);
    const coinflips = await CoinFlipinst.getHighRolls(minWagerHighRoll);
    const dicesUSDT = await Diceinst.getHighRolls(minWagerHighRollUSDT, true);
    const coinflipsUSDT = await CoinFlipinst.getHighRolls(
      minWagerHighRollUSDT,
      true
    );
    const allgames = [
      ...coinflipsUSDT,
      ...dicesUSDT,
      ...coinflips,
      ...dices
    ].sort((b, a) => b.timestamp - a.timestamp);
    res.status(200).send(allgames.slice(+offset, +count + +offset));
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

const leaderBoard = async (req, res) => {
  try {
    const { offset = 0, count = 30 } = req.query;
    res
      .status(200)
      .send(
        (await Routerinst.getMiningList()).slice(+offset, +count + +offset)
      );
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

const topPlayers = async (req, res) => {
  try {
    res.status(200).send(await Routerinst.getTopTen());
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

module.exports = {
  statisticsGeneralInfo,
  statisticsLatestBets,
  statisticsMyBets,
  highRollers,
  leaderBoard,
  topPlayers
};
