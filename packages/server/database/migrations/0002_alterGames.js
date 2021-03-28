const {
  DICE,
  DICE_USDT,
  COINFLIP_USDT,
  COINFLIP,
  STAKE
} = require('../info.js').tables;

exports.up = async knex => {
  return Promise.all([
    knex.schema.dropTableIfExists(DICE),
    knex.schema.dropTableIfExists(DICE_USDT),
    knex.schema.dropTableIfExists(COINFLIP_USDT),
    knex.schema.dropTableIfExists(COINFLIP),
    knex.schema.dropTableIfExists(STAKE),
    knex.schema.createTable(DICE, table => {
      table.integer('gameId').primary();
      table.integer('roll');
      table.bigInteger('prize');
      table.boolean('result');
      table.bigInteger('wager');
      table.integer('var2');
      table.integer('var1');
      table.string('player');
      table.bigInteger('timestamp');
    }),
    knex.schema.createTable(DICE_USDT, table => {
      table.integer('gameId').primary();
      table.integer('roll');
      table.bigInteger('prize');
      table.boolean('result');
      table.bigInteger('wager');
      table.integer('var2');
      table.integer('var1');
      table.string('player');
      table.bigInteger('timestamp');
    }),
    knex.schema.createTable(COINFLIP_USDT, table => {
      table.integer('gameId').primary();
      table.integer('roll');
      table.bigInteger('prize');
      table.boolean('result');
      table.bigInteger('wager');
      table.integer('side');
      table.string('player');
      table.bigInteger('timestamp');
    }),
    knex.schema.createTable(COINFLIP, table => {
      table.integer('gameId').primary();
      table.integer('roll');
      table.bigInteger('prize');
      table.boolean('result');
      table.bigInteger('wager');
      table.integer('side');
      table.string('player');
      table.bigInteger('timestamp');
    }),
    knex.schema.createTable(STAKE, table => {
      table.bigInteger('amount');
      table.string('user');
      table.string('type');
      table.bigInteger('timestamp');
    })
  ]);
};

exports.down = () => {
  return null;
};
