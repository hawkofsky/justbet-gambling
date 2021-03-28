const Router = artifacts.require('./core/Router.sol');
const WINR = artifacts.require('./core/WINR.sol');
const assert = require("assert").strict;

const {
  LOTTERY_ADDR: lotteryAddress,
  WINR_ADDR: winrAddress,
  USDTMOCK_ADDR: usdtAddress,
  ROUTER_ADDR: routerAddress
} = require("../../packages/config/contracts.json");

// const Staking = artifacts.require('./core/Staking.sol')

const sendSettings = {
  feeLimit: 100000000,
  callValue: 0,
  shouldPollResponse: true
};

contract('Staking', function (accounts) {

  const SENDER = accounts[0]
  const DEV1 = accounts[1]
  const DEV2 = accounts[2]
  const SEED = accounts[3]
  const game1 = accounts[4]
  const game2 = accounts[4]
  let winrInstance;
  let winrTronwebInstance;
  let usdtInstance;
  before(async () => {
    winrInstance = await WINR.deployed();
    winrTronwebInstance = await tronWeb.contract().at(winrAddress);
    usdtInstance = await tronWeb.contract().at(usdtAddress);

    winrTronwebInstance.Staked().watch(async (err, event) => {
      if (err) {
        return console.error('Error with "method" event:', err);
      }
      if (event) {
        console.log(event);
        console.log(await winrInstance.stakeOf(SENDER));
      }
    });
    winrTronwebInstance.Unstaked().watch(async (err, event) => {
      if (err) {
        return console.error('Error with "method" event:', err);
      }
      if (event) {
        console.log(event);
        console.log(await winrInstance.stakeOf(SENDER));
      }
    });
    winrTronwebInstance.Distribute().watch(async (err, event) => {
      if (err) {
        return console.error('Error with "method" event:', err);
      }
      if (event) {
        console.log(event);
        console.log(await winrInstance.stakeOf(SENDER));
      }
    });

    // stakingInstance = await Staking.deployed();
  })

  it(`Distribute token reward`, async () => {
    let distributeUSDTAmount = '100000';
    let winrBalance = await usdtInstance.balanceOf(winrAddress).call();

    console.log(1);

    if (winrBalance.eq("0")) {
      await usdtInstance.transfer(winrAddress, distributeUSDTAmount).send(sendSettings);
      winrBalance = await usdtInstance.balanceOf(winrAddress).call();

      assert.equal(winrBalance.toString(), distributeUSDTAmount, "Bad winr's USDT balance");
    }

    console.log(2);
    let userBalance = await usdtInstance.balanceOf(SENDER).call();

    console.log(3);
    console.log(userBalance.toString());

    let reward = "177";
    await winrInstance.withdrawRewardsTRC20(
      [SENDER],
      [reward],
      usdtAddress
    ).send(sendSettings);
    console.log(4);
    userBalance = await usdtInstance.balanceOf(SENDER).call();

    console.log(userBalance.toString());
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


  // it(`Should pay to the right ticket buyer`, async () => {

  //   await winrInstance.stake(777);
  //   sleep(3000)
  // });

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // it(`Should be able to stake`, async () => {
  //   const STAKE_AMOUNT = 1234;
  //   await winrInstance.stake(STAKE_AMOUNT);
  //   let time = Math.floor(Date.now() / 1000);
  //   assert.equal((await winrInstance.stakeOf(SENDER)).toNumber(), STAKE_AMOUNT, "Bad staked amount");
  //   assert.equal((await winrInstance.stakeTimeOf(SENDER)).toNumber(), time, "Bad stake time");
  // });

  // it(`Should wait before unstake and should be able to unstake`, async () => {
  //   let time = (await winrInstance.MIN_STAKE_TIME()).toNumber();
  //   let staked = (await winrInstance.stakeOf(SENDER)).toNumber();
  //   assert(staked > 0, "Staked must be greater than 0; There mus be some staked tokens");
  //   await assert.rejects(winrInstance.unstake(), `Should wait ${time} before unstake`);
  //   assert.equal((await winrInstance.stakeOf(SENDER)).toNumber(), staked, "Shouldn't change staked amount");


  //   console.log(`Waiting ${time} seconds before unstake...`);
  //   await sleep(time * 1000);
  //   await assert.doesNotReject(winrInstance.unstake(), `Should be able to unstake after ${time} seconds of waiting`);
  //   assert.equal((await winrInstance.stakeOf(SENDER)).toNumber(), 0, "Should reduce stake to 0 after unstake");
  // });

  // it(`Should be able to distribute reward`, async () => {
  //   const STAKE_AMOUNT = 1234;
  //   await winrInstance.stake(STAKE_AMOUNT);
  //   await winrInstance.(STAKE_AMOUNT);


  // });

  // it(`Should be able to withdraw reward`, async () => {

  // });


  // try{
  //   await winrInstance.buyLotteryTicket([1, 6, 7, 11, 15]);}catch(err){console.log(`1${err}`);}
  // try{
  //   console.log(await tronWeb.trx.getBalance(lotteryInstance.address));}catch(err){console.log(`2${err}`);}
  // try{
  //   console.log(await tronWeb.trx.getBalance(SENDER));}catch(err){console.log(`3${err}`);}
  // try{
  //   await tronWeb.trx.sendTransaction(lotteryInstance.address, 1000);}catch(err){console.log(`4${err}`);}
  // try{
  //   console.log(await tronWeb.trx.getBalance(lotteryInstance.address));}catch(err){console.log(`5${err}`);}
  // try{
  //   console.log(await tronWeb.trx.getBalance(SENDER));}catch(err){console.log(`6${err}`);}
  // try{
  //   await lotteryInstance.draw("0000000000000000000e74b081802b4795084dce47277b48340e188c723ef5f8", 640000);}catch(err){console.log(`7${err}`);}
  // try{
  //   console.log(await tronWeb.trx.getBalance(SENDER));}catch(err){console.log(`8${err}`);}


  // it('', async function () {})

  // it('', async function () {})

  // it('', async function () {})

})
