const WINR = artifacts.require('./token/WINR.sol')

function calculateFactor(profit, revenue, lose, wager, ratio) {
  const x = ((((profit / revenue) * lose) / wager) * profit * ratio) / 1e6
  return x
}

function blockTime() {
  return new Promise((resolve, reject) => {
    web3.eth.getBlock('latest').then((data, err) => {
      resolve(data.timestamp)
    })
  })
}

function factor(f1, f2) {
  return parseFloat(f1 / 1e6 / f2).toFixed(6)
}

function increaseTime(time) {
  return new Promise((resolve, reject) => {
    web3.currentProvider.send(
      {
        jsonrpc: '2.0',
        method: 'evm_increaseTime',
        params: [time],
        id: 123,
      },
      (err, res) => {
        web3.currentProvider.send(
          {
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

contract('WINR => Token Tests', function(accounts) {
  const SENDER = accounts[0]
  const DEV1 = accounts[1]
  const DEV2 = accounts[2]
  const SEED = accounts[3]
  const [, , , , ...USERS] = accounts
  let WINRInstance
  before(async () => {
    try {
      WINRInstance = await WINR.deployed()
    } catch (e) {
      throw new Error('WINR Instance fail')
    }
  })
  it('should have 33b max supply', async function() {
    let maxSupply
    try {
      maxSupply = await WINRInstance.getMaxSupply()
    } catch (e) {
      throw new Error('Max Supply Fail')
    }
    assert.equal(
      maxSupply,
      33 * 1e9 * 1e6,
      'Maxsupply is not equal to desired balance'
    )
  })

  it('should distribute seed and dev balances', async function() {
    let dev1Balance, dev2Balance, seedBalance
    try {
      dev1Balance = await WINRInstance.balanceOf(DEV1)
    } catch (e) {
      throw new Error('Dev1 balance err')
    }

    try {
      dev2Balance = await WINRInstance.balanceOf(DEV2)
    } catch (e) {
      throw new Error('Dev2 balance err')
    }

    try {
      seedBalance = await WINRInstance.balanceOf(SEED)
    } catch (e) {
      throw new Error('Seed balance err')
    }

    try {
      maxSupply = await WINRInstance.getMaxSupply()
    } catch (e) {
      throw new Error('Max Supply err')
    }

    assert.equal(
      dev1Balance,
      (12 / 100) * maxSupply,
      'Dev1 balance not equal to desired balance'
    )
    // assert.equal(dev2Balance, 12 / 100 * maxSupply, 'Dev2 balance not equal to desired balance')
    assert.equal(
      seedBalance,
      (6 / 100) * maxSupply,
      'seed balance not equal to desired balance'
    )
  })

  it('should setup rounds properly on construction', async function() {
    // Checking rounds
    const rounds = [
      {
        allocation: 152,
        amount: 3511200000,
        payout: 1000,
      },
      {
        allocation: 133,
        amount: 3072300000,
        payout: 500,
      },
      {
        allocation: 95,
        amount: 2194500000,
        payout: 200,
      },
      {
        allocation: 96,
        amount: 2217600000,
        payout: 250,
      },
      {
        allocation: 48,
        amount: 1108800000,
        payout: 200,
      },
      {
        allocation: 96,
        amount: 2217600000,
        payout: 100,
      },
      {
        allocation: 95,
        amount: 2194500000,
        payout: 50,
      },
      {
        allocation: 133,
        amount: 3072300000,
        payout: 25,
      },
      {
        allocation: 152,
        amount: 3511200000,
        payout: 50,
      },
    ]

    let rnd = rounds[0]
    let round1 = await WINRInstance.getRound(8)
    // assert.equal(round1.allocation, rnd)
    for (let i = 0; i < rounds.length; i++) {
      const element = rounds[i]
      const x = await WINRInstance.getRound(i)
      assert.equal(
        x.allocation.toString(16),
        element.allocation.toString(16),
        'Allocation not same on round ' + i
      )
      assert.equal(
        x.amount.toString(16),
        (element.amount * 1e6).toString(16),
        'Amount not same on round ' + i
      )
      assert.equal(
        x.payout.toString(16),
        element.payout.toString(16),
        'Payout not same on round ' + i
      )
    }
  })

  it('should send token properly', async function() {
    let firstAccFirstBalance,
      secondAccFirstBalance,
      firstAccLastBalance,
      secondAccLastBalance

    firstAccFirstBalance = await WINRInstance.balanceOf(accounts[4])
    secondAccFirstBalance = await WINRInstance.balanceOf(accounts[5])
    const balanceOneToSend = 213451
    const balanceTwoToSend = 312314
    await WINRInstance.transfer(accounts[4], balanceOneToSend, {
      from: accounts[1],
    })
    await WINRInstance.transfer(accounts[5], balanceTwoToSend, {
      from: accounts[1],
    })
    firstAccLastBalance = await WINRInstance.balanceOf(accounts[4])
    secondAccLastBalance = await WINRInstance.balanceOf(accounts[5])
    assert.equal(firstAccLastBalance, balanceOneToSend, 'First transfer failed')
    assert.equal(
      secondAccLastBalance,
      balanceTwoToSend,
      'Second transfer failed'
    )

    // assert insufficient balance
    try {
      await WINRInstance.transfer(accounts[1], balanceTwoToSend, {
        from: accounts[4],
      })
    } catch (e) {
      assert.include(
        e.message,
        'revert',
        "The error message should contain 'revert'"
      )
    }
  })

  it('games can be added by owner', async function() {
    try {
      await WINRInstance.addGame(SENDER)
    } catch (error) {
      assert.fail(error.message)
    }

    try {
      await WINRInstance.addGame(SENDER, { from: DEV1 })
      assert.fail('Must throw error')
    } catch (error) {
      assert.include(error.message, 'revert', 'Must throw an error')
    }
  })

  /* minting */

  it.skip('mints 0 first day', async function() {
    // assume played trx 10
    // first day pool is 0
    // so first day no one will earn anything
    try {
      await WINRInstance.mint(accounts[0], 10 * 1e6, { from: accounts[8] })
      assert.fail('Minting by wrong addr: Must throw error')
    } catch (error) {
      assert.include(error.message, 'revert', 'Must throw an error')
    }
    let factors
    try {
      factors = await WINRInstance.getFactor()
    } catch (e) {
      assert.fail('Factor get failed')
    }
    assert.equal(
      factors[0].toString(),
      0,
      'Factor must be equal to zero for the first day'
    )

    try {
      await WINRInstance.mint(accounts[0], 10 * 1e6)
    } catch (e) {
      assert.fail('Mint failed')
    }

    try {
      let blnc = await WINRInstance.balanceOf(accounts[0])
      assert.equal(blnc.toString(16), 0, 'Balance must be zero for first day')
    } catch (e) {
      assert.fail('balance get failed')
    }
  })

  it('changes winr factor by router contract calls', async function() {
    let k = 1000
    const lastDay = {
      profit: 100 * k,
      revenue: 120 * k,
      lose: 880 * k,
      wager: 1000 * k,
    }
    try {
      await WINRInstance.tick(
        lastDay.profit,
        lastDay.revenue,
        lastDay.lose,
        lastDay.wager
      )
    } catch (e) {
      assert.fail('Tick: Failed')
    }

    let realFactor = calculateFactor(
      lastDay.profit,
      lastDay.revenue,
      lastDay.lose,
      lastDay.wager,
      10
    ).toFixed(6)
    let factors
    try {
      factors = await WINRInstance.getFactor()
      let factor = parseFloat(factors[0] / 1e6 / factors[1]).toFixed(6)
      assert.equal(
        factor.toString(16),
        realFactor.toString(16),
        'factor must be equal to ' + realFactor
      )
    } catch (e) {
      assert.fail('Factor get failed')
    }
  })

  it('mints by games', async function() {
    let balanceMustBe = 0
    const factors = await WINRInstance.getFactor()
    let factor = parseFloat(factors[0] / 1e6 / factors[1]).toFixed(6)
    const account = accounts[6]
    for (let i = 0; i < 2; i++) {
      // let indx = Math.random() * 100 % 100 > 50 ? 3 : 1
      let val = (Math.random() * 100).toFixed(0) * 1e6
      // let from = accounts[indx]
      // await WINRInstance.transfer(accounts[2],)
      balanceMustBe += val * factor
      try {
        await WINRInstance.mint(account, val)
      } catch (e) {
        assert.fail('Mint err')
      }
    }

    let blnc = await WINRInstance.balanceOf(account)
    assert.equal(
      blnc.toString(16),
      balanceMustBe.toString(16),
      'balance must be equal to ' + balanceMustBe
    )
  })

  /* multiplier */
  it('should sets multipliers by owner call', async function() {
    const account = accounts[7]

    // multipliers must be none
    try {
      multiplierCount = await WINRInstance.getMultiplierCount(account)
      assert.equal(multiplierCount, 0, 'Multiplier count must be zero')
    } catch (e) {
      assert.fail('Get Multipliers: Failed ' + e.message)
    }

    let multiplyWith = 120 // (1.2)
    let endsAt = Math.floor((await blockTime()) + 3 * 60 * 60)
    try {
      await WINRInstance.addMultiplier(account, multiplyWith, endsAt)
    } catch (e) {
      assert.fail('Add Multiplier: Failed ' + e.message)
    }

    try {
      multiplierCount = await WINRInstance.getMultiplierCount(account)
      assert.equal(multiplierCount, 1, 'Multiplier count must be one')
    } catch (e) {
      assert.fail('Get Multipliers: Failed ' + e.message)
    }

    try {
      multiplier = await WINRInstance.getMultiplier(account, 0)
      assert.equal(
        multiplier[0],
        multiplyWith,
        'Multiplier must be ' + multiplyWith
      )
      assert.equal(
        multiplier[1],
        endsAt,
        'Multiplier must be ends at ' + endsAt
      )
    } catch (e) {
      assert.fail('Get Multipliers: Failed ' + e.message)
    }
  })

  it('should multiply minting values with multipliers', async function() {
    const account = accounts[7]
    const factors = await WINRInstance.getFactor()
    const factor = parseFloat(factors[0] / 1e6 / factors[1]).toFixed(6)
    try {
      await WINRInstance.mint(account, 200 * 1e6)
    } catch (e) {
      asert.fail('Mint Failed ' + e.message)
    }
    let balance
    balance = await WINRInstance.balanceOf(account)
    let balanceMustBe = Math.floor((200 * 1e6 * factor).toFixed(0) * 1.2)
    assert.equal(
      balance.toString(16),
      balanceMustBe.toString(16),
      'Balances not equal after minting with multiplier'
    )
    // send all tokens to empty account for testing
    await WINRInstance.transfer(accounts[0], balance, { from: account })
  })

  it('should remove expired multipliers', async function() {
    await increaseTime(Math.floor(3 * 60 * 60 + 10))
    const account = accounts[7]
    const factors = await WINRInstance.getFactor()
    const factor = parseFloat(factors[0] / 1e6 / factors[1]).toFixed(6)
    try {
      await WINRInstance.mint(account, 200 * 1e6)
    } catch (e) {
      asert.fail('Mint Failed ' + e.message)
    }
    let balance
    balance = await WINRInstance.balanceOf(account)

    assert.equal(
      balance.toString(16),
      Math.floor(200 * 1e6 * factor).toString(16),
      'Balances not equal after minting with multiplier'
    )
  })

  it('should handle multiple mixed expired and active multipliers on complicated requests', async function() {
    // send all tokens to empty account for testing
    await WINRInstance.transfer(
      accounts[0],
      await WINRInstance.balanceOf(accounts[7]),
      { from: accounts[7] }
    )
    let now
    now = await blockTime()
    // await increaseTime(Math.floor(3 * 60 * 60 + 10))
    const account = accounts[7]
    const factors = await WINRInstance.getFactor()
    const factor = parseFloat(factors[0] / 1e6 / factors[1]).toFixed(6)
    let balanceMustBe = 0
    try {
      await WINRInstance.mint(account, 200 * 1e6)
    } catch (e) {
      asert.fail('Mint Failed ' + e.message)
    }
    balanceMustBe = Math.floor(factor * 200 * 1e6)
    let balance
    balance = await WINRInstance.balanceOf(account)
    let b = balance
    assert.equal(
      balance.toString(16),
      balanceMustBe.toString(16),
      'Balances must be equal'
    )
    let multipliers = []
    // multiplier 1
    try {
      let multiplyWith = 120 // (1.2)
      let endsAt = Math.floor(now + 3 * 60 * 60)
      await WINRInstance.addMultiplier(account, multiplyWith, endsAt)
      multipliers.push({ multiplyWith, endsAt })
    } catch (e) {
      assert.fail('Add Multiplier: Failed ' + e.message)
    }

    // multiplier 2
    try {
      let multiplyWith = 148 // (1.2)
      let endsAt = Math.floor(now + 6 * 60 * 60)
      await WINRInstance.addMultiplier(account, multiplyWith, endsAt)
      multipliers.push({ multiplyWith, endsAt })
    } catch (e) {
      assert.fail('Add Multiplier: Failed ' + e.message)
    }
    now = await blockTime()
    // for (let i = 0; i < multipliers.length; i++) {
    //   const element = multipliers[i];
    //   if (element.endsAt > now) {
    //     balanceMustBe += Math.floor(factor * element.multiplyWith * 1e6)
    //   }
    //   else {
    //     multipliers[i] = multipliers[multipliers.length - 1]
    //     multipliers.length--
    //     i--
    //   }
    // }
    // balance = await WINRInstance.balanceOf(account)

    // assert.equal(balance.toString(16), balanceMustBe.toString(16), 'Balances must be equal')
    await increaseTime(Math.floor(6 * 60 * 60 + 10))

    // multiplier 3
    try {
      let multiplyWith = 283 // (1.2)
      let endsAt = Math.floor(now + 12 * 60 * 60)
      await WINRInstance.addMultiplier(account, multiplyWith, endsAt)
      multipliers.push({ multiplyWith, endsAt })
    } catch (e) {
      assert.fail('Add Multiplier: Failed ' + e.message)
    }

    try {
      await WINRInstance.mint(account, 200 * 1e6)
    } catch (e) {
      asert.fail('Mint Failed ' + e.message)
    }
    now = await blockTime()
    balanceMustBe =
      200 * 1e6 * factor + Math.floor((200 * 1e6 * factor * 283) / 100)
    balance = await WINRInstance.balanceOf(account)

    assert.equal(
      balance.toString(16),
      balanceMustBe.toString(16),
      'Balances must be equal'
    )
    // assert.equal(balance.toString(16), Math.floor(200 * 1e6 * factor).toString(16), 'Balances not equal after minting with multiplier')
  })
})
