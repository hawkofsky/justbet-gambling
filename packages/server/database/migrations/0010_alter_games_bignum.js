const {
    DICE,
    DICE_USDT,
    COINFLIP_USDT,
    COINFLIP
} = require('../info.js').tables;

exports.up = async knex => {
    return Promise.all([
        knex.schema.dropTableIfExists(DICE),
        knex.schema.dropTableIfExists(DICE_USDT),
        knex.schema.dropTableIfExists(COINFLIP_USDT),
        knex.schema.dropTableIfExists(COINFLIP),
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
            table.float('multiplier');
            table.string('mined');
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
            table.float('multiplier');
            table.string('mined');
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
            table.float('multiplier');
            table.string('mined');
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
            table.float('multiplier');
            table.string('mined');
        })
    ]);
};

exports.down = () => {
    return null;
};
