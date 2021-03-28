const {
    ROUTER_ADDR
} = require("../../packages/config/contracts.json");
const privateKey = "c973ea2cc6d50ccb41eb06fc03a2d8670e81a00d09438dc9baa35d61939254fd";

const TronWeb = require('tronweb')
const HttpProvider = TronWeb.providers.HttpProvider;
const fullNode = new HttpProvider("https://api.shasta.trongrid.io");
const solidityNode = new HttpProvider("https://api.shasta.trongrid.io");
const eventServer = new HttpProvider("https://api.shasta.trongrid.io");
const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, privateKey);

(async () => {
    let routerInstance = await tronWeb.contract().at(ROUTER_ADDR);

    routerInstance.Tick().watch((err, event) => {
        if (err) {
            return console.error('Error with "method" event:', err);
        }
        if (event) {
            console.log(event);
        }
    });
    try {
        await routerInstance.distributeProfit(0,[],[]).send({
            feeLimit: 100000000,
            callValue: 0,
            shouldPollResponse: true
        });
    } catch (error) {
        console.log(error);

    }
    console.log(`this`)
})().catch(console.log)
