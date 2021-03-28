const Staking = require('../services/games/staking');

const Stakinginst = new Staking();

const getUserStake = async (req, res) => {
  try {
    const { staked, passiveStaked } = await Stakinginst.stakeOf(
      req.params.addr
    );
    const totalEarned = await Stakinginst.getTotalEarned(req.params.addr);
    res.status(200).send({
      balance: (await Stakinginst.balanceOf(req.params.addr)),
      staked,
      passiveStaked,
      totalEarned: {
        usdt: totalEarned.usdt,
        trx: totalEarned.trx
      }
    });
  } catch (e) {
    // eslint-disable-next-line no-unused-expressions
    res.status(500).json({ err: e.message });
  }
};

const balanceOf = async (req, res) => {
  try {
    res.status(200).json(await Stakinginst.balanceOf(req.params.addr));
  } catch (e) {
    res.status(500).json({ err: e.message });
  }
};

const stakedOf = async (req, res) => {
  try {
    res.status(200).json(await Stakinginst.stakeOf(req.params.addr));
  } catch (e) {
    res.status(500).json({ err: e.message });
  }
};

const miningStats = async (req, res) => {
  try {
    const resp = await Stakinginst.totalWagered(req.params.addr);
    const stakeEfi = await Stakinginst.efficiencyOfStakingWinr();
    const stakeEfiYest = await Stakinginst.efficiencyOfStakingWinrYest();
    res.status(200).send({
      totalWagered: resp,
      efficiency: {
        all: {
          trx: await Stakinginst.efficiencyOfWinr(),
          usdt: await Stakinginst.efficiencyOfWinrUSDT(),
        },
        yesterday: {
          trx: await Stakinginst.efficiencyOfWinrYesterday(),
          usdt: await Stakinginst.efficiencyOfWinrYesterdayUSDT(),
        }
      },
      efficiency_staking: {
        yesterday: { ...stakeEfiYest },
        all: { ...stakeEfi }
      },
    });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

module.exports = {
  balanceOf,
  stakedOf,
  getUserStake,
  miningStats
};
