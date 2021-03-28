const CoinFlip = require('../services/games/coinflip');

const CoinFlipinst = new CoinFlip();

const getLastGames = async (req, res) => {
  try {
    const query = req.path.split('/')[2];
    const conflipLastBets = await CoinFlipinst.getLastBets(query === 'usdt');
    res.status(200).send(conflipLastBets);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

const getTopPlayers = async (req, res) => {
  try {
    const query = req.path.split('/')[2];
    const coinflipLastBets = await CoinFlipinst.getTopPlayers(query === 'usdt');
    res.status(200).send(coinflipLastBets);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

module.exports = {
  getLastGames,
  getTopPlayers
};
