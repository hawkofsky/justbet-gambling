const USDT = artifacts.require("tests/USDT.sol");
const WINR = artifacts.require("token/WINR.sol");
const Router = artifacts.require("core/Router.sol");
const Lottery = artifacts.require("games/Lottery.sol");
const Dice = artifacts.require("games/Dice.sol");
const CoinFlip = artifacts.require("games/CoinFlip.sol");
const Stats = artifacts.require("lib/Stats");
const TRC20List = artifacts.require("core/TRC20List.sol");

const fs = require("fs");
const path = require("path");
module.exports = async function (deployer) {

    let winr = await WINR.deployed();
    let router = await Router.deployed();
    let lottery = await Lottery.deployed();
    let dice = await Dice.deployed();
    let coinflip = await CoinFlip.deployed();
    let stats = await Stats.deployed();
    let trc20List = await TRC20List.deployed();
    // let usdt = await USDT.deployed();

    const Tronweb = require("tronweb");
    const tronWeb = new Tronweb({
        fullHost: "https://api.shasta.trongrid.io",
        privateKey: "c973ea2cc6d50ccb41eb06fc03a2d8670e81a00d09438dc9baa35d61939254fd"
    });
    console.log(`
ROUTER_ADDR=${tronWeb.address.fromHex(router.address)}
WINR_ADDR=${tronWeb.address.fromHex(winr.address)}
COINFLIP_ADDR=${tronWeb.address.fromHex(coinflip.address)}
DICE_ADDR=${tronWeb.address.fromHex(dice.address)}
STAKE_ADDR=${tronWeb.address.fromHex(winr.address)}
LOTTERY_ADDR=${tronWeb.address.fromHex(lottery.address)}
STATS_ADDR=${tronWeb.address.fromHex(stats.address)}
LOTTERY_ADDR_1=${tronWeb.address.fromHex(lottery.address)}
TRC20List_ADDR=${tronWeb.address.fromHex(trc20List.address)}
        `);
    fs.writeFileSync(path.resolve(__dirname, "../../packages/config/contracts.json"), JSON.stringify({
        ROUTER_ADDR:  tronWeb.address.fromHex(router.address),
        WINR_ADDR:  tronWeb.address.fromHex(winr.address),
        COINFLIP_ADDR:  tronWeb.address.fromHex(coinflip.address),
        DICE_ADDR:  tronWeb.address.fromHex(dice.address),
        STAKE_ADDR:  tronWeb.address.fromHex(winr.address),
        LOTTERY_ADDR:  tronWeb.address.fromHex(lottery.address),
        STATS_ADDR:  tronWeb.address.fromHex(stats.address),
        TRC20List_ADDR:  tronWeb.address.fromHex(trc20List.address),
    }, null, 4));

};
