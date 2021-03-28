const WINR = artifacts.require("token/WINR.sol");

const c = require("../credentials.json");

module.exports = function (deployer) {
    let vestingStartTime = "1590969600";
    deployer.deploy(WINR, c.vestingAddresses,c.vestingAmounts, c.mintedAddresses, c.mintedAmounts,vestingStartTime).then(function () {
    });
};
