const {
    log
} = require("console");

const {
    WINR_ADDR: winrAddress,
} = require("../../packages/config/contracts.json");

const WINR = artifacts.require('./core/WINR.sol')
const assert = require("assert").strict;

const c = require("./../credentials.json");

contract('WINR => Staking Test', function (accounts) {
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
    it(`Stake can be withdrawn`, async () => {
        let stake = 1000;
        log((await winrInstance.balanceOf(SENDER).call()).toString());

        log(`stake`);
        await winrInstance.stake(stake).send(sendSettings);

        log((await winrInstance.balanceOf(SENDER).call()).toString());

        log(`unstake`);
        await winrInstance.unstake().send(sendSettings);

        log((await winrInstance.balanceOf(SENDER).call()).toString());

        log(`waiting...`);
        await sleep(10 * 1000);

        log((await winrInstance.balanceOf(SENDER).call()).toString());

        log(`withdraw`);
        await winrInstance.withdrawStake().send(sendSettings);

        log((await winrInstance.balanceOf(SENDER).call()).toString());
    });

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
})
