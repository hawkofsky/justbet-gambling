const Staking = require('./games/staking');
const Lottery = require('./games/lottery');
const Router = require('./cores/router');
const Dice = require('./games/dice');
const CoinFlip = require('./games/coinflip');
const USDT = require('./cores/usdt');

module.exports = {
  Staking,
  Lottery,
  Router,
  Dice,
  CoinFlip,
  USDT
};
