const express = require('express');

const { Router } = express;

const diceRouter = require('./routes/statistic/dice').default;
const lotteryRouter = require('./routes/statistic/lottery').default;
const statsRouter = require('./routes/statistic/info').default;
const coinflipRouter = require('./routes/statistic/coinflip').default;
const stakingRouter = require('./routes/statistic/staking').default;
const mining = require('./routes/statistic/mining').default;

exports.default = () => {
  const app = Router();

  /* Register new routes here */
  statsRouter(app);
  lotteryRouter(app);
  diceRouter(app);
  coinflipRouter(app);
  stakingRouter(app);
  mining(app);

  return app;
};
