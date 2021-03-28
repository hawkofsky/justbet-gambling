const {
    log
} = require("console");

const {
    WINR_ADDR: winrAddress,
    DICE_ADDR:diceAddress
} = require("../../packages/config/contracts.json");

const WINR = artifacts.require('./core/WINR.sol')
const assert = require("assert").strict;

const c = require("./../credentials.json");

contract('Test minting getter', function (accounts) {

    const SENDER = accounts[0];

    let diceInstance;
    let winrInstance;

    const sendSettings = {
        feeLimit: 100000000,
        callValue: 0,
        shouldPollResponse: true
    };

    before(async () => {
        winrInstance = await tronWeb.contract().at(winrAddress);
        diceInstance = await tronWeb.contract().at(diceAddress);
    })

    it(`Minted amounts is right`, async ()=>{
        console.log(await winrInstance.minedToUsers(SENDER).call());
    });

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    };
})
