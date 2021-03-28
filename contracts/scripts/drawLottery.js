const {
    LOTTERY_ADDR,
    WINR_ADDR,
    USDTMOCK_ADDR
} = require("../../packages/config/contracts.json");
const privateKey = "c973ea2cc6d50ccb41eb06fc03a2d8670e81a00d09438dc9baa35d61939254fd";

const TronWeb = require('tronweb')
const HttpProvider = TronWeb.providers.HttpProvider;
const fullNode = new HttpProvider("https://api.shasta.trongrid.io");
const solidityNode = new HttpProvider("https://api.shasta.trongrid.io");
const eventServer = new HttpProvider("https://api.shasta.trongrid.io");
const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, privateKey);

const sendSettings = {
    feeLimit: 100000000,
    callValue: 0,
    shouldPollResponse: true
};

(async () => {
    let lotteryInstance = await tronWeb.contract().at(LOTTERY_ADDR);
    let winrInstance = await tronWeb.contract().at(WINR_ADDR);
    let usdtInstance = await tronWeb.contract().at(USDTMOCK_ADDR);

    try {
        console.log((await usdtInstance.balanceOf("TSD51m4thXpvrsjqCpsAnyX8kzEc6vhR5U").call()).toString());

        await lotteryInstance.setBTCBlockNumber(640000).send(sendSettings);
        await usdtInstance.transfer(LOTTERY_ADDR, 100000000).send(sendSettings);

        console.log((await usdtInstance.balanceOf("TSD51m4thXpvrsjqCpsAnyX8kzEc6vhR5U").call()).toString());


        console.log(`Set block number.\nDraw is in process...`);
        
        await lotteryInstance.draw("0000000000000000000e74b081802b4795084dce47277b48340e188c723ef5f8").send(sendSettings);

        console.log((await usdtInstance.balanceOf("TSD51m4thXpvrsjqCpsAnyX8kzEc6vhR5U").call()).toString());

    } catch (error) {
        console.log(error);

    }
    console.log(`Drawn`);
})().catch(console.log)
