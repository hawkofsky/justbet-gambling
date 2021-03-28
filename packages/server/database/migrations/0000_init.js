const {
  DICE,
  DICE_USDT,
  COINFLIP_USDT,
  COINFLIP,
  STAKE,
  TICKETS
} = require('../info.js').tables;

exports.up = async knex => {
  return Promise.all([
    knex.schema.createTable(DICE, table => {
      table.integer('gameId').primary();
      table.integer('roll');
      table.string('prize');
      table.boolean('result');
      table.string('wager');
      table.integer('var2');
      table.integer('var1');
      table.string('player');
      table.bigInteger('timestamp');
    }),
    knex.schema.createTable(DICE_USDT, table => {
      table.integer('gameId').primary();
      table.integer('roll');
      table.string('prize');
      table.boolean('result');
      table.string('wager');
      table.integer('var2');
      table.integer('var1');
      table.string('player');
      table.bigInteger('timestamp');
    }),
    knex.schema.createTable(COINFLIP_USDT, table => {
      table.integer('gameId').primary();
      table.integer('roll');
      table.string('prize');
      table.boolean('result');
      table.string('wager');
      table.integer('side');
      table.string('player');
      table.bigInteger('timestamp');
    }),
    knex.schema.createTable(COINFLIP, table => {
      table.integer('gameId').primary();
      table.integer('roll');
      table.string('prize');
      table.boolean('result');
      table.string('wager');
      table.integer('side');
      table.string('player');
      table.bigInteger('timestamp');
    }),
    knex.schema.createTable(STAKE, table => {
      table.string('amount');
      table.string('user');
      table.string('type');
      table.bigInteger('timestamp');
    }),
    knex.schema.createTable(TICKETS, table => {
      table.string('ticketHash');
      table.string('player');
      table.integer('roundId');
      table.bigInteger('timestamp');
      table.specificType('numbers', 'integer []');
      table.integer('ticketIndex');
    })
  ]);
};

exports.down = knex => {
  return Promise.all([
    knex.schema.dropTableIfExists(DICE),
    knex.schema.dropTableIfExists(DICE_USDT),
    knex.schema.dropTableIfExists(COINFLIP),
    knex.schema.dropTableIfExists(COINFLIP_USDT),
    knex.schema.dropTableIfExists(STAKE),
    knex.schema.dropTableIfExists(TICKETS)
  ]);
};
