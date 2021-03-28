const Dice = require('../services/games/dice');

const Diceinst = new Dice();

const getChartData = async (req, res) => {
  try {
    const diceLastBets = await Diceinst.getChartData();
    res.status(200).send(diceLastBets);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

const getLastGames = async (req, res) => {
  try {
    const query = req.path.split('/')[2];
    const diceLastBets = await Diceinst.getLastBets(query === 'usdt');
    res.status(200).send(diceLastBets);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

const getTopPlayers = async (req, res) => {
  try {
    const query = req.path.split('/')[2];
    const diceLastBets = await Diceinst.getTopPlayers(query === 'usdt');
    res.status(200).send(diceLastBets);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

module.exports = {
  getChartData,
  getLastGames,
  getTopPlayers
};
