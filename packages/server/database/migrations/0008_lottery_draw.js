exports.up = knex => {
  return knex.raw(`
    CREATE TABLE lottery_draw
    (
      "roundId"             int             NOT NULL,
      "winningTickets"      int[]           NOT NULL,
      "winners"             varchar[]       DEFAULT NULL,
      "jackpotTRX"          real            NOT NULL,
      "jackpotUSDT"         real            NOT NULL,
      "timestamp"           bigint          NOT NULL,
      primary key ("roundId")
    )
  `);
};

exports.down = knex => {
  return knex.schema.dropTableIfExists('lottery_draw');
};
