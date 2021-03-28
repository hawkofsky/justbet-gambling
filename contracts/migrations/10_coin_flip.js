const Router = artifacts.require("core/Router.sol");
const CoinFlip = artifacts.require("games/CoinFlip.sol");

module.exports = async function(deployer) {
    await deployer.deploy(CoinFlip, Router.address);
};
