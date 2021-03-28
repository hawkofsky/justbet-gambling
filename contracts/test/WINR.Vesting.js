const {
    log
} = require("console");

const {
    WINR_ADDR: winrAddress,
} = require("../../packages/config/contracts.json");

const WINR = artifacts.require('./core/WINR.sol')
const assert = require("assert").strict;

const c = require("./../credentials.json");

contract('WINR => Vesting Test', function (accounts) {

    const SENDER = accounts[0];

    let routerInstance;
    let winrInstance;
    let lotteryInstance;

    const sendSettings = {
        feeLimit: 100000000,
        callValue: 0,
        shouldPollResponse: true
    };

    before(async () => {
        winrInstance = await tronWeb.contract().at(winrAddress);
    })

    it(`Minted amounts is right`, async ()=>{
        for (let i = 0; i < c.mintedAddresses.length; i++) {
            const address = c.mintedAddresses[i];
            const amount = c.mintedAmounts[i];
            let balance = await winrInstance.balanceOf(address).call();
            console.log(`${amount} --> ${balance.toString()}`);
            assert(balance.eq(amount),"Bad minted amount");
        }
    });

    it(`You can vest your tokens`, async ()=>{
        await sleep(25*1000);
        let balanceBefore = await winrInstance.balanceOf(SENDER).call();
        await winrInstance.withdrawVested().send(sendSettings);
        let balanceAfter = await winrInstance.balanceOf(SENDER).call();
        console.log(`${balanceBefore.toString()} --> ${balanceAfter.toString()}`);
        assert(balanceAfter.gt(balanceBefore));
    });

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
})
