const express = require('express');

const { getUserStake } = require('../../../controllers').staking;

const router = express.Router();

exports.default = app => {
  app.use('/staking', router);
  router.get('/:addr', getUserStake);
};
