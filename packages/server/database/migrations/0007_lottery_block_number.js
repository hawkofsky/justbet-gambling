exports.up = knex => {
  return knex.raw(`
    CREATE TABLE lottery_block_number
    (
      "roundId"             int             NOT NULL,
      "blockNumber"         int             NOT NULL,
      "timestamp"           bigint          NOT NULL,
      primary key ("roundId")
    )
  `);
};

exports.down = knex => {
  return knex.schema.dropTableIfExists('lottery_block_number');
};
