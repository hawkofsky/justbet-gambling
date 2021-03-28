const express = require('express');

const router = express.Router();

const { getChartData, getLastGames } = require('../../../controllers').dice;

const { topPlayers } = require('../../../controllers').statistic;

exports.default = app => {
  app.use('/dice', router);
  router.get('/chartdata', getChartData);
  router.get('/latestbets/trx', getLastGames);
  router.get('/latestbets/usdt', getLastGames);
  router.get('/topplayers/trx', topPlayers);
  router.get('/topplayers/usdt', topPlayers);
};
