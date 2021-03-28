const Router = artifacts.require("core/Router.sol");
const CoinFlip = artifacts.require("games/CoinFlip.sol");
const TRC20List = artifacts.require("core/TRC20List.sol");

const TRX = 1000000;

module.exports = async function(deployer) {
    let router = await Router.deployed();
    await router.addGame(CoinFlip.address);
    let coinFlip = await CoinFlip.deployed();
    await coinFlip.setMinBet(10 * TRX);
    await coinFlip.setMaxBet(1000 * TRX);
    await coinFlip.setTRC20List(TRC20List.address);
};
