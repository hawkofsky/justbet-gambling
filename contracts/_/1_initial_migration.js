const Test = artifacts.require("token/Test.sol");

module.exports = function (deployer) {
  deployer.deploy(Test);

};