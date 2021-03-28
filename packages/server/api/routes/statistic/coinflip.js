const express = require('express');

const router = express.Router();

const { getLastGames } = require('../../../controllers').coinFlip;
const { topPlayers } = require('../../../controllers').statistic;

exports.default = app => {
  app.use('/coinflip', router);
  router.get('/latestbets/trx', getLastGames);
  router.get('/latestbets/usdt', getLastGames);
  router.get('/topplayers/trx', topPlayers);
  router.get('/topplayers/usdt', topPlayers);
};
