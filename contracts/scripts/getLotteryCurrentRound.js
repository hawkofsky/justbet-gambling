const {
    LOTTERY_ADDR: lotteryAddress,
    WINR_ADDR: winrAddress
} = require("../../packages/config/contracts.json");
const privateKey = "c973ea2cc6d50ccb41eb06fc03a2d8670e81a00d09438dc9baa35d61939254fd";

const TronWeb = require('tronweb')
const HttpProvider = TronWeb.providers.HttpProvider;
const fullNode = new HttpProvider("https://api.shasta.trongrid.io");
const solidityNode = new HttpProvider("https://api.shasta.trongrid.io");
const eventServer = new HttpProvider("https://api.shasta.trongrid.io");
const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, privateKey);

(async () => {
    let lotteryInstance = await tronWeb.contract().at(lotteryAddress);
    let winrInstance = await tronWeb.contract().at(winrAddress);

    try {
        console.log((await lotteryInstance.currentRoundId().call()).toString());
    } catch (error) {
        console.log(error);

    }
    console.log(`this`)
})().catch(console.log)
