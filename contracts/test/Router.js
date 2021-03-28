const Router = artifacts.require('./core/Router.sol')
const WINR = artifacts.require('./core/WINR.sol')
const TestGame = artifacts.require('./games/Test.sol')
const USDT = artifacts.require('./tests/USDT.sol')

const assert = require("assert").strict;

const {
  LOTTERY_ADDR: lotteryAddress,
  WINR_ADDR: winrAddress,
  USDTMOCK_ADDR: usdtAddress,
  ROUTER_ADDR: routerAddress
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
  let winrInstance;
  let usdtInstance;

  const sendSettings = {
    feeLimit: 100000000,
    callValue: 0,
    shouldPollResponse: true
  };

  before(async () => {
    routerInstance = await tronWeb.contract().at(routerAddress);
    winrInstance = await tronWeb.contract().at(winrAddress);
    usdtInstance = await tronWeb.contract().at(usdtAddress);
  });

  it('should set winr address correctly', async function () {
    assert.equal(
      await routerInstance.getWinrContract().call(),
      winrInstance.address,
      'WINR address must be set correctly'
    )
  })

  it(`Must distribute TRC20 profit correctly`, async () => {
    // const distributeUSDTAmount = tronWeb.toBigNumber(100000);

    let distributeUSDTAmount = '100000';
    let routerBalance = await usdtInstance.balanceOf(routerAddress).call();


    if (routerBalance.eq("0")) {
      await usdtInstance.transfer(routerInstance.address, distributeUSDTAmount).send(sendSettings);
      routerBalance = await usdtInstance.balanceOf(routerAddress).call();

      assert.equal(routerBalance.toString(), distributeUSDTAmount, "Bad router's USDT balance");
    }

    distributeUSDTAmount = routerBalance;

    await routerInstance.distributeProfit(0, [distributeUSDTAmount], [usdtAddress]).send(sendSettings);

    let lotteryBalance = await usdtInstance.balanceOf(lotteryAddress).call();
    let winrBalance = await usdtInstance.balanceOf(winrAddress).call();


    assert(lotteryBalance.eq(distributeUSDTAmount.mul(2).div(10)), "Bad lottery balance");
    assert(winrBalance.eq(distributeUSDTAmount.mul(8).div(10)), "Bad winr balance");
  });



  // describe('Game Functions', function() {
  //   it('owner should be able to add game', async function() {
  //     await routerInstance.addGame(game1, 'Dice')
  //     let game
  //     try {
  //       game = await routerInstance.isGame(game1)
  //       console.log(game)
  //       assert.ok(game, 'Game should be exists')
  //     } catch (e) {
  //       assert.ok('Game err')
  //     }
  //   })

  //   it('should reject add game requests from other addressess', async function() {
  //     try {
  //       await routerInstance.addGame(game1, 'Dice', { from: SEED })
  //       assert.fail('Addgame: Should throw error')
  //     } catch (e) {
  //       assert.include(
  //         e.message,
  //         'Ownable:',
  //         'The error message should contain "Ownable"'
  //       )
  //     }
  //   })

  //   it('should get funds from games', async function() {
  //     let gameInstance = await TestGame.new()
  //     await routerInstance.addGame(game1, 'Dice');
  //     await gameInstance.setRouter(routerInstance.address)

  //     // send some funds
  //     let routerBalance
  //     routerBalance = await web3.eth.getBalance(routerInstance.address)
  //     console.log('balance', routerBalance)
  //     assert.equal(routerBalance, 0x0, 'Balance must be zero')
  //     await gameInstance.play(false, { value: 2e18 })
  //     routerBalance = await web3.eth.getBalance(routerInstance.address)
  //     console.log('balance', routerBalance / 1e18)
  //     assert.notEqual(routerBalance, 0x0, 'Balance must be different than zero')
  //   })

  //   it('should be able to run tick function once a day', async function() {
  //     // tick çalıştığı zaman günün kazancını winr contractına atacağız
  //     // tick ile günlük kazancın belirli bir kısmını aktaracağız burada revenue ve profit çıkacak
  //     // winr contractına wager, lose, revenue ve profit atacağız
  //     // wager: total riske edilen
  //     // lose: kullanıcıların kaybettiği
  //     // revenue: wager - kullanıcıların kazandıkları
  //     // profit: dağıtılan
  //     let gameInstance = await TestGame.new()
  //     await gameInstance.setRouter(routerInstance.address)
  //     await routerInstance.addGame(gameInstance.address, 'Dice');
  //     // send some funds
  //     let routerBalance
  //     await gameInstance.play(false, { value: 4e18, from: DEV1 })
  //     await winrInstance.stake(10000, { from: DEV1 })
  //     // console.log(await web3.eth.getBalance(winrInstance.address))
  //     // console.log(await winrInstance.stakeOf(DEV1))
  //     await routerInstance.tick()
  //     let x = await winrInstance.rewardOf(DEV1)
  //     console.log('XXX', x)
  //     await gameInstance.play(false, { value: 2e18, from: DEV1 })
  //     // console.log(await web3.eth.getBalance(winrInstance.address))
  //     // console.log(await winrInstance.stakeOf(DEV1))
  //     await increaseTime(24 * 60 * 60 + 1)
  //     await routerInstance.tick()
  //     x = await winrInstance.rewardOf(DEV1)
  //     // console.log(await web3.eth.getBalance(winrInstance.address))
  //     // console.log(await winrInstance.stakeOf(DEV1))
  //   })
  // })
})
