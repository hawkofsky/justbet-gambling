const TRC20List = artifacts.require("core/TRC20List.sol");
const USDT = artifacts.require("tests/USDT.sol");
const Router = artifacts.require("core/Router.sol");
const CoinFlip = artifacts.require("games/CoinFlip.sol");
const Dice = artifacts.require("games/Dice.sol");


module.exports = async function (deployer, network) {
    if (network !== "mainnet") {
        let usdt = await USDT.deployed();
        let trc20 = await TRC20List.deployed();
        const usdtPriceInUSD =  1.0;
        const trxPriceInUSD = 0.02;
        const trxDecimals = 1000000;
        const usdtDecimals = Math.pow(10, await usdt.decimals());
        const trc20RationDecimals = (await trc20.getRationDecimals()).toNumber();
        const rationUSDT2TRX = (usdtDecimals / usdtPriceInUSD) / (trxDecimals / trxPriceInUSD) * trc20RationDecimals;
        await trc20.enableToken(USDT.address, rationUSDT2TRX);
        console.log(rationUSDT2TRX);
        await usdt.getTokenTo(Router.address, 1000000 * usdtDecimals);

        let dice = await Dice.deployed();
        await dice.setMinBetTRC20(USDT.address, 10 * usdtDecimals);
        await dice.setMaxBetTRC20(USDT.address, 1000 * usdtDecimals);

        let conFlip = await CoinFlip.deployed();
        await conFlip.setMinBetTRC20(USDT.address, 10 * usdtDecimals);
        await conFlip.setMaxBetTRC20(USDT.address, 1000 * usdtDecimals);

        await usdt.approve(CoinFlip.address, 10000 * usdtDecimals);
        await usdt.approve(Dice.address, 10000 * usdtDecimals);
    }
};
