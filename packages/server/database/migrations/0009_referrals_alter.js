const { REFERRALS } = require('../info.js').tables;

exports.up = async knex => {
    return Promise.all([
        knex.schema.dropTableIfExists(REFERRALS),
        knex.schema.createTable(REFERRALS, table => {
            table.string('parent');
            table.string('child');
            table.bigInteger('timestamp');
            table.boolean('isActive').defaultTo(true);
            table.boolean('isRemoved').defaultTo(false);
        })
    ]);
};

exports.down = () => {
    return null;
};
