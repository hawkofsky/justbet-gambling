const WINR = artifacts.require("token/WINR.sol");
const Router = artifacts.require("core/Router.sol");
const Lottery = artifacts.require("games/Lottery.sol");

module.exports = async function(deployer) {
    let lottery = await Lottery.deployed();
    let winr = await WINR.deployed();
    let router = await Router.deployed();
    await router.setLottery(lottery.address);
    await winr.setLotteryContract(lottery.address);
};
