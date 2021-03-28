const WINR = artifacts.require('./lib/WINR.sol')
contract('WINR => Staking Tests', function (accounts) {
  let winrInstance
  let factor
  let k = 1000
  const lastDay = {
    profit: 100 * k,
    revenue: 120 * k,
    lose: 880 * k,
    wager: 1000 * k,
  }

  // before(async () => {
  //   winrInstance = await WINR.deployed()
  //   try {
  //     // await winrInstance.tick(
  //     //   lastDay.profit,
  //     //   lastDay.revenue,
  //     //   lastDay.lose,
  //     //   lastDay.wager
  //     // )
  //   } catch (e) {
  //     assert.fail('Tick: Failed ' + e.message)
  //   }
  //   factor = await getFactor()
  // })
  function blockTime() {
    return new Promise((resolve, reject) => {
      web3.eth.getBlock('latest').then((data, err) => {
        resolve(data.timestamp)
      })
    })
  }

  async function getFactor() {
    let factors = await winrInstance.getFactor()
    return parseFloat(factors[0] / 1e6 / factors[1]).toFixed(6)
  }

  function increaseTime(time) {
    return new Promise((resolve, reject) => {
      web3.currentProvider.send({
          jsonrpc: '2.0',
          method: 'evm_increaseTime',
          params: [time],
          id: 123,
        },
        (err, res) => {
          web3.currentProvider.send({
              jsonrpc: '2.0',
              method: 'evm_mine',
              id: 123,
            },
            (err, resp) => {
              resolve(true)
            }
          )
        }
      )
    })
  }

  let stakingToken
  const manyTokens = 1000e6
  const owner = accounts[0]
  const user = accounts[0]

  // before(async () => {
  //   stakingToken = await WINR.deployed()
  // })

  describe('Staking', () => {
    beforeEach(async () => {
      stakingToken = await WINR.new(user, owner, owner)
      await stakingToken.installRounds()
      await web3.eth.sendTransaction({
        to: stakingToken.address,
        from: user,
        value: "10000000000000000"
      })
    })
    it('createStake creates a stake.', async () => {
      let bl = await stakingToken.balanceOf(user)
      await stakingToken.stake(1, {
        from: user
      })

      // assert.equal(bl, 2)
      // assert.equal(await stakingToken.passiveStakes(user), 1)
      // assert.equal(await stakingToken.totalStakes(), 1)
    })
    it('rewards are distributed.', async () => {
      await stakingToken.stake(100, {
        from: user
      })
      await stakingToken.tick(lastDay.profit, lastDay.revenue, lastDay.lose, lastDay.wager, {
        from: owner
      })

      assert.equal(await stakingToken.rewardOf(user), 0)
      await stakingToken.tick(lastDay.profit, lastDay.revenue, lastDay.lose, lastDay.wager, {
        from: owner
      })
      assert.equal((await stakingToken.rewardOf(user)).toString(16), "2386f26fc10000")
      assert.equal((await stakingToken.totalRewards()).toString(16), "2386f26fc10000")
    })
    it('rewards can be withdrawn.', async () => {
      await stakingToken.stake(100, {
        from: user
      })
      await stakingToken.tick(lastDay.profit, lastDay.revenue, lastDay.lose, lastDay.wager, {
        from: owner
      })

      await stakingToken.withdrawReward({
        from: user
      })

      const existingStakes = 100
      const mintedAndWithdrawn = 1
      console.log('BL', (await stakingToken.balanceOf(user)))
      // assert.equal((await stakingToken.balanceOf(user)).toString(16), 'e1199594f7f9c')
      assert.equal(await stakingToken.stakeOf(user), 100)
      assert.equal(await stakingToken.rewardOf(user), 0)
      assert.equal(await stakingToken.totalStakes(), 100)
      assert.equal(await stakingToken.totalRewards(), 0)
    })
  })
})