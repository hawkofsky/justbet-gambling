const WINR = artifacts.require("token/WINR.sol");
const Router = artifacts.require("core/Router.sol");
const Lottery = artifacts.require("games/Lottery.sol");
const Stats = artifacts.require("lib/Stats");

module.exports = async function(deployer) {
    await deployer.deploy(Stats,
        Router.address,
        WINR.address,
        Lottery.address);
};
