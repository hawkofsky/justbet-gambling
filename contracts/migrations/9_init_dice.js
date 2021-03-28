const Router = artifacts.require("core/Router.sol");
const Dice = artifacts.require("games/Dice.sol");
const TRC20List = artifacts.require("core/TRC20List.sol");

const TRX = 1000000;

module.exports = async function (deployer, network) {
    let router = await Router.deployed();
    await router.addGame(Dice.address);
    let dice = await Dice.deployed();
    await dice.setMinBet(10 * TRX);
    await dice.setMaxBet(1000 * TRX);
    await dice.setTRC20List(TRC20List.address);

    if (network !== "mainnet") {
        await dice.GoodLuck(511515, 1000, 1001, Dice.address, {value: 700 * TRX}).then(v => console.log("lose in dice for fund ", v)).catch(console.error); // lose for fund
        await dice.GoodLuck(511515, 1000, 1001, Dice.address, {value: 700 * TRX}).then(v => console.log("lose in dice for fund ", v)).catch(console.error); // lose for fund
    }
};
