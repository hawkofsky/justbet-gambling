exports.up = knex => {
  return knex.raw(`
    CREATE TABLE contracts_addresses
    (
      "name"        varchar     NOT NULL,
      "address"     varchar     NOT NULL,
      primary key ("name")
    )
  `);
};

exports.down = knex => {
  return knex.schema.dropTableIfExists('contracts_addresses');
};
