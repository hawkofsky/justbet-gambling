const { contracts } = require('../../config').default;

const Lottery = require('../services/games/lottery');
const USDT = require('../services/cores/usdt');

const USDTinst = new USDT();
const Lotteryinst = new Lottery();

const drawn = async (req, res) => {
  try {
    const winrBal = await Lotteryinst.getDrawn();
    res.status(200).send(winrBal);
  } catch (e) {
    res.status(500).json({ err: e.message });
  }
};

const lotteryStats = async (req, res) => {
  try {
    const winrBal = await Lotteryinst.getBalance();
    const USDTBal = await USDTinst.getBalance(contracts.LOTTERY_ADDR);
    const weeksTrx = await Lotteryinst.getTransferedWeeks();
    const currentRoundID = await Lotteryinst.getCurrentRoundId();
    const { totalTicketCount } = await Lotteryinst.getRoundById(currentRoundID);
    const isSaleAvailable = await Lotteryinst.isSaleAvailable();
    res.status(200).send({
      winrBalance: winrBal,
      USDTBalance: USDTBal,
      weeksTransfered: weeksTrx,
      totalTickets: totalTicketCount,
      isSaleAvailable
    });
  } catch (e) {
    res.status(500).json({ err: e.message });
  }
};
const purchasedTickets = async (req, res) => {
  try {
    res.status(200).send(await Lotteryinst.getTickets(req.params.addr));
  } catch (e) {
    res.status(500).json({ err: e.message });
  }
};

module.exports = {
  lotteryStats,
  purchasedTickets,
  drawn
};
