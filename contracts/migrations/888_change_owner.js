const WINR = artifacts.require("token/WINR.sol");
const Router = artifacts.require("core/Router.sol");
const Dice = artifacts.require("games/Dice.sol");
const CoinFlip = artifacts.require("games/CoinFlip.sol");
const TRC20List = artifacts.require("core/TRC20List.sol");
const Lottery = artifacts.require("games/Lottery.sol");

const credentials = require("../credentials.json");
module.exports = async function (deployer, network, account) {

    let winr = await WINR.deployed();
    let router = await Router.deployed();
    let dice = await Dice.deployed();
    let coinflip = await CoinFlip.deployed();
    let trc20List = await TRC20List.deployed();
    let lottery = await Lottery.deployed();


    console.log('account', account);
    await winr.addOwnership(credentials.owner);
    await winr.removeOwnership(account);

    await router.addOwnership(credentials.owner);
    await router.removeOwnership(account);

    await dice.addOwnership(credentials.owner);
    await dice.removeOwnership(account);

    await coinflip.addOwnership(credentials.owner);
    await coinflip.removeOwnership(account);

    await trc20List.addOwnership(credentials.owner);
    await trc20List.removeOwnership(account);

    await lottery.addOwnership(credentials.owner);
    await lottery.removeOwnership(account);
};

