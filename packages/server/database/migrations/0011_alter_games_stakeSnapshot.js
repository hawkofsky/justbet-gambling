const { STAKE_SNAPSHOT } = require('../info.js').tables;

exports.up = async knex => {
    return Promise.all([
        knex.schema.dropTableIfExists(STAKE_SNAPSHOT),
        knex.schema.createTable(STAKE_SNAPSHOT, table => {
            table.increments('index').primary();
            table.specificType('stakedList', 'json[]');
            table.bigInteger('timestamp');
            table.boolean('distributed').defaultTo(false);
            table.string('trxToDistribute');
            table.string('usdtToDistribute');
            table.string('totalStaked');
        })
    ]);
};

exports.down = () => {
return null;
};
