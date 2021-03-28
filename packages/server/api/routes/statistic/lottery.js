const express = require('express');

const { purchasedTickets, drawn } = require('../../../controllers').lottery;

const router = express.Router();

exports.default = app => {
  app.use('/lottery', router);
  router.get('/drawn', drawn);
  router.get('/sale', drawn);
  router.get('/tickets', purchasedTickets);
  router.get('/tickets/:addr', purchasedTickets);
};
