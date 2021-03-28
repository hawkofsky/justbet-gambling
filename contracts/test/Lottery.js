const { log } = require("console");

const {
  LOTTERY_ADDR: lotteryAddress,
  WINR_ADDR: winrAddress,
  USDTMOCK_ADDR:usdtAddress
} = require("../../packages/config/contracts.json");

const Router = artifacts.require('./core/Router.sol')
const WINR = artifacts.require('./core/WINR.sol')
const Lottery = artifacts.require('./games/Lottery.sol')

const assert = require("assert").strict;

contract('Lottery', function (accounts) {

  const SENDER = accounts[0]
  const DEV1 = accounts[1]
  const DEV2 = accounts[2]
  const SEED = accounts[3]
  const game1 = accounts[4]
  const game2 = accounts[4]

  let winrInstance;
  let lotteryInstance;
  let usdtInstance;

  const sendSettings = {
    feeLimit: 100000000,
    callValue: 0,
    shouldPollResponse: true
  };

  before(async () => {
    lotteryInstance = await tronWeb.contract().at(lotteryAddress);
    winrInstance = await tronWeb.contract().at(winrAddress);
    usdtInstance = await tronWeb.contract().at(usdtAddress);
  })

  it(`Should pay in tokens to the right ticket buyer`, async () => {
    // lotteryInstance = await tronWeb.contract().at(lotteryInstance.address);
    // winrInstance = await tronWeb.contract().at(winrInstance.address);

    let tokenValue = 100000000;

    console.log(1);

    let balanceAtStart = await usdtInstance.balanceOf("TSD51m4thXpvrsjqCpsAnyX8kzEc6vhR5U").call();

    console.log(2);
    await winrInstance.buyLotteryTicket([1, 6, 7, 11, 15]).send(sendSettings);
    console.log(3);

    await lotteryInstance.setBTCBlockNumber(640000).send(sendSettings);
    console.log(4);
    await usdtInstance.transfer(lotteryAddress, tokenValue ).send(sendSettings);
    console.log(5);

    let balanceAfterTransfer = await usdtInstance.balanceOf("TSD51m4thXpvrsjqCpsAnyX8kzEc6vhR5U").call();
    console.log(6);

    assert.equal(balanceAtStart.sub(tokenValue).toString(),balanceAfterTransfer.toString(),"Bad token balance after transfer");

    await lotteryInstance.draw("0000000000000000000e74b081802b4795084dce47277b48340e188c723ef5f8", "30000").send(sendSettings);
    console.log(7);

    let balanceAfterDraw = await usdtInstance.balanceOf("TSD51m4thXpvrsjqCpsAnyX8kzEc6vhR5U").call();
    console.log(8);

    assert.equal(balanceAtStart.toString(),balanceAfterDraw.toString(),"Bad token balance after draw");



  });

  // it(`Should pay to the right ticket buyer`, async () => {
  //   //   console.log(await tronWeb.trx.getBalance(lotteryInstance.address));
  //   //   console.log(await tronWeb.trx.getBalance(SENDER));
  //   //   await winrInstance.buyLotteryTicket(...[1, 6, 7, 11, 15]);
  //   //   // await tronWeb.trx.sendTransaction(lotteryInstance.address, 1000);
  //   //   console.log(await tronWeb.trx.getBalance(lotteryInstance.address));
  //   //   console.log(await tronWeb.trx.getBalance(SENDER));
  //   //   await lotteryInstance.draw("0000000000000000000e74b081802b4795084dce47277b48340e188c723ef5f8", 640000,{
  //   //     feeLimit: 1000000000,
  //   //     callValue: 0,
  //   //     originEnergyLimit: 10000000,
  //   //     shouldPollResponse: true,
  //   // });
  //   //   console.log(await tronWeb.trx.getBalance(SENDER));
  // })

  // it(`Should pay in TRX to the right ticket buyer`, async () => {
  //   lotteryInstance = await tronWeb.contract().at(lotteryInstance.address);
  //   winrInstance = await tronWeb.contract().at(winrInstance.address);

  //   try {
  //     console.log(SENDER);
  //     console.log(await tronWeb.trx.getBalance(lotteryInstance.address));
  //     console.log(await tronWeb.trx.getBalance(SENDER));
  //     await sleep(20000)
  //     await winrInstance.buyLotteryTicket([1, 6, 7, 11, 15]).send(sendSettings);
  //     console.log();
  //     console.log(await tronWeb.trx.getBalance(lotteryInstance.address));
  //     console.log(await tronWeb.trx.getBalance(SENDER));
  //     await tronWeb.trx.sendTransaction(lotteryInstance.address, "12210892879", "c973ea2cc6d50ccb41eb06fc03a2d8670e81a00d09438dc9baa35d61939254fd");
  //     await sleep(10000)
  //     console.log();
  //     console.log(await tronWeb.trx.getBalance(lotteryInstance.address));
  //     console.log(await tronWeb.trx.getBalance(SENDER));
  //     try {
  //       await lotteryInstance.draw("0000000000000000000e74b081802b4795084dce47277b48340e188c723ef5f8", 640000).send(sendSettings);

  //     } catch (error) {
  //       console.log(error);
  //     }
  //     console.log();
  //     console.log(await tronWeb.trx.getBalance(lotteryInstance.address));
  //     console.log(await tronWeb.trx.getBalance(SENDER));

  //   } catch (error) {
  //     console.log(error);

  //   }


  // });

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
})
