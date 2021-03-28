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
        await winrInstance.buyLotteryTicket([1, 6, 7, 11, 15]).send({
            feeLimit:100000000,
            callValue:0,
            shouldPollResponse:true
        });

        await lotteryInstance.draw("0000000000000000000e74b081802b4795084dce47277b48340e188c723ef5f8", 640000).send({
            feeLimit:100000000,
            callValue:0,
            shouldPollResponse:true
        });

    } catch (error) {
        console.log(error);

    }
    console.log(`this`)
})().catch(console.log)
