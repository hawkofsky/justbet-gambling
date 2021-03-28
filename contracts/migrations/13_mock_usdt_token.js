const USDT = artifacts.require("tests/USDT.sol");

module.exports = async function (deployer, network) {
    if (network !== "mainnet") {
        await deployer.deploy(USDT);
    }
};
