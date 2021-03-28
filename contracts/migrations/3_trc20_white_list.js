const TRC20List = artifacts.require("tests/TRC20List.sol");

module.exports = async function (deployer, network) {
    await deployer.deploy(TRC20List);
};
