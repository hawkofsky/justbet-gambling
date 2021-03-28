const WINR = artifacts.require("token/WINR.sol");
const Router = artifacts.require("core/Router.sol");
const Lottery = artifacts.require("games/Lottery.sol");

module.exports = async function(deployer) {
    await deployer.deploy(Lottery, WINR.address, Router.address);
};
