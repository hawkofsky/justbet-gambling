const Router = artifacts.require('./core/Router.sol')
const WINR = artifacts.require('./core/WINR.sol')
const TestGame = artifacts.require('./games/Test.sol')
const USDT = artifacts.require('./tests/USDT.sol')

const assert = require("assert").strict;

const {
    ROUTER_ADDR:routerAddress
} = require("../../packages/config/contracts.json");
const {
    equal
} = require("assert");

contract('Router', function (accounts) {

    const SENDER = accounts[0]
    const DEV1 = accounts[1]
    const DEV2 = accounts[2]
    const SEED = accounts[3]
    const game1 = accounts[4]
    const game2 = accounts[4]

    let routerInstance;

    const sendSettings = {
        feeLimit: 100000000,
        callValue: 0,
        shouldPollResponse: true
    };

    before(async () => {
        routerInstance = await tronWeb.contract().at(routerAddress);
    });

    it(`Should be able to delete and add reference`, async () => {

        let distributeUSDTAmount = '100000';
        await routerInstance.addGame(SENDER).send(sendSettings);

        await routerInstance.addReference(SENDER,SENDER).send(sendSettings);

        let refCount = await routerInstance.playerRefCount(SENDER).call();
        let refParent = await routerInstance.refParent(SENDER).call();

        console.log(`Count - ${refCount.toString()}\nParent - ${refParent}\nSender - ${SENDER}`);


        await routerInstance.deleteReferences([SENDER]).send(sendSettings);

        refCount = await routerInstance.playerRefCount(SENDER).call();
        refParent = await routerInstance.refParent(SENDER).call();

        console.log(`Count - ${refCount.toString()}\nParent - ${refParent}`);


    });
})
