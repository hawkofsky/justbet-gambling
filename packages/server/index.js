require('dotenv').config();
const debug = require('debug')('justbet:app.js');
const Sentry = require('@sentry/node');
const config = require('config');

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: 'https://4c2c076346c946b193c2aa1e6e950031@sentry.blaize.tech/12'
  });
}

const bodyParser = require('body-parser');
const express = require('express');
const { Container } = require('typedi');

const TronWebInstance = require('./tronWeb');

const { contracts } = require('../config').default;
const knex = require('./database/knex');

const { contractCheck } = require('./utils/db_clean');

Container.set('knex', knex);
Container.set('tronWeb', new TronWebInstance());
Container.set(
  'tronWebOwner',
  new TronWebInstance(process.env.TRON_CONTRACTS_OWNER_SECRET)
);
Container.set('contractsList', contracts);

require('./tronWeb');
const { startUp } = require('./services/eventsLoader');

const routes = require('./api').default;

contractCheck().then(() => {
  startUp();

  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use('/', routes());
  app.get('/', (req, res) => {
    return res.send('Alive!');
  });

  app.listen(config.port, () => {
    debug('Server listening on %o', config.port);
  });
});
