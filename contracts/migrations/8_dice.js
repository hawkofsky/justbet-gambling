const Router = artifacts.require("core/Router.sol");
const Dice = artifacts.require("games/Dice.sol");

module.exports = async function(deployer) {
    await deployer.deploy(Dice, Router.address);
};
