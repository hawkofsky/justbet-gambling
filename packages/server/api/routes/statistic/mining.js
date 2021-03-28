const express = require('express');

const { miningStats } = require('../../../controllers').staking;

const router = express.Router();

exports.default = app => {
  app.use('/mining', router);
  router.get('/:addr', miningStats);
};
