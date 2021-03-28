require('dotenv').config();
const config = require('config');
const tronWeb = require('tronweb');

// utility functions common to the project go here
function regulateNumbers(numbers) {
  const nms = [];
  for (let i = 0; i < numbers.length / 64; i += 1) {
    nms[i] = Number(`0x${numbers.substring(i * 64, (i + 1) * 64)}`);
  }
  return nms;
}

/*
 * Parse Drawn event result
 *
 * @param  {String}  resultData      Drawn event result result[3]
 * @param  {Number}  winnersAmount   Amount of winners
 * */
function parseDraw(resultData, winnersAmount) {
  const nms = [];
  const winners = [];
  const numsWithoutUSDT = resultData.substring(0, resultData.length - 128);
  const numsUSDT = resultData.substring(
    resultData.length - 64,
    resultData.length
  );

  const parsedUSDT = Number(`0x${numsUSDT}`);
  const parsed = numsWithoutUSDT.substring(
    0,
    numsWithoutUSDT.length - winnersAmount * 64
  );

  const addresses = numsWithoutUSDT.substring(
    numsWithoutUSDT.length - winnersAmount * 64,
    numsWithoutUSDT.length
  );

  for (let i = 0; i < parsed.length / 64; i += 1) {
    nms[i] = Number(`0x${parsed.substring(i * 64, (i + 1) * 64)}`);
  }
  for (let i = 0; i < addresses.length / 64; i += 1) {
    winners[i] = tronWeb.address.fromHex(
      `0x${addresses.substring(i * 64 + 24, (i + 1) * 64)}`
    );
  }

  return {
    jackpotTRX: nms[0] / 1e6,
    jackpotUSDT: parsedUSDT / 1e6,
    winningTickets: nms.splice(1, 5),
    winners
  };
}

function getKnexSettings() {
  const knexConfig = { ...config.postgres };
  knexConfig.connection.host =
    knexConfig.connection.host || process.env.JUSTBET_POSTGRES_CONNECTION_HOST;
  knexConfig.connection.port =
    knexConfig.connection.port || process.env.JUSTBET_POSTGRES_CONNECTION_PORT;
  knexConfig.connection.password =
    process.env.JUSTBET_POSTGRES_CONNECTION_PASSWORD;
  return knexConfig;
}

function startOfWeek() {
  const date = new Date();
  date.setHours(12, 0, 0, 0);
  const diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
  return new Date(date.setDate(diff));
}

function weekAgo(date) {
  return new Date(date.getTime() - 60 * 60 * 24 * 7 * 1000);
}

module.exports = {
  regulateNumbers,
  parseDraw,
  getKnexSettings,
  weekAgo,
  startOfWeek
};
