const express = require('express');

const router = express.Router();

const { statistic, lottery } = require('../../../controllers');

exports.default = app => {
  app.use('/stats', router);
  router.get('/info', statistic.statisticsGeneralInfo);
  router.get('/latestbets', statistic.statisticsLatestBets);
  router.get('/mybets/:addr', statistic.statisticsMyBets);
  router.get('/highrollers', statistic.highRollers);
  router.get('/leaderboard', statistic.leaderBoard);
  router.get('/lottery', lottery.lotteryStats);
};
