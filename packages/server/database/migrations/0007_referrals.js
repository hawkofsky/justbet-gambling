const { REFERRALS } = require('../info.js').tables;

exports.up = async knex => {
  return Promise.all([
    knex.schema.createTable(REFERRALS, table => {
      table.string('parent');
      table.string('child');
      table.bigInteger('timestamp');
      table.boolean('isActive').defaultTo(true);
    })
  ]);
};

exports.down = knex => {
  return knex.schema.dropTableIfExists(REFERRALS);
};
