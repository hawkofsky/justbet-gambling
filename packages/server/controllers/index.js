const statistic = require('./statistic.controller');
const dice = require('./dice.controller');
const lottery = require('./lottery.controller');
const coinFlip = require('./coinFlip.controller');
const staking = require('./staking.controller');

module.exports = {
  statistic,
  lottery,
  dice,
  coinFlip,
  staking
};
