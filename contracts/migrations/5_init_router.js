const WINR = artifacts.require("token/WINR.sol");
const Router = artifacts.require("core/Router.sol");
const TRC20List = artifacts.require("core/TRC20List.sol");

module.exports = async function (deployer) {
    const winr = await WINR.deployed();
    const router = await Router.deployed();
    await router.setWinrContract(winr.address);
    await winr.setRouter(router.address);
    await router.setTRC20List(TRC20List.address);
};
