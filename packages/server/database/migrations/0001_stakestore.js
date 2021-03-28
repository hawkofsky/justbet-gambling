const { STAKE_SNAPSHOT } = require('../info.js').tables;

exports.up = async knex => {
  return Promise.all([
    knex.schema.createTable(STAKE_SNAPSHOT, table => {
      table.increments('index').primary();
      table.specificType('stakedList', 'json[]');
      table.bigInteger('timestamp');
      table.boolean('distributed').defaultTo(false);
    })
  ]);
};

exports.down = knex => {
  return Promise.all([knex.schema.dropTableIfExists(STAKE_SNAPSHOT)]);
};
