const assert = require('assert');
const Dice = artifacts.require('./games/Dice.sol');
const Router = artifacts.require('./core/Router.sol');
const USDT = artifacts.require('./core/USDT.sol');


contract('Dice', function (accounts) {
    const TRX = 1000000;
    let dice;
    let usdt;
    const user = accounts[1];
    const ref = "TB23ZA1by6ZnzQEABN47DbZZjq5DfCyBTu";
    let usdtDecimals;
    const minFringe = 2000;
    const maxFringe = 6000;
    before(async () => {
        try {
            usdt = await USDT.deployed();
            usdtDecimals = Math.pow(10, (await usdt.decimals()));
            dice = await Dice.deployed();
            console.log('dice', tronWeb.address.fromHex(dice.address));
            // make a reward for the user if he wins
            await tronWeb.trx.send(Router.address, 500 * TRX).catch(console.error);
        } catch (e) {
            console.error(e);
        }
    });
    const balanceOfUsdt = async (address) => {
        const balance = await usdt.balanceOf(address);
        return typeof balance === "object" ? balance.toNumber() : balance;
    };

    it('user can win or lose, check all cases', async function () {
        const maxGames = 10;
        let countRetry = maxGames;
        let wine = false;
        let lose = false;
        const seed = 415151515151541;
        const bet = 15 * TRX;
        while (countRetry > 0) {
            console.log("try make new bet");
            let userBalance = await tronWeb.trx.getBalance(accounts[0]);
            let result = await dice.GoodLuck(seed, minFringe, maxFringe, ref, {
                callValue: bet,
                shouldPollResponse: true,
            });
            let currentUserBalance = await tronWeb.trx.getBalance(accounts[0]);
            if (result >= minFringe && result <= maxFringe) {
                console.log('user win');
                wine = true;
                assert(currentUserBalance > userBalance, "User not receive reward");
            } else {
                console.log('user lose');
                lose = true;
            }
            if (wine && lose) {
                break;
            }
            countRetry--;
        }
        assert(countRetry > 0, `User not win or lose for ${maxGames} games`)
    });

    it('user can win or lose, check all cases TRC20', async function () {
        const maxGames = 10;
        let countRetry = maxGames;
        let wine = false;
        let lose = false;
        const seed = 415151515151541;
        const bet = 15 * usdtDecimals;
        while (countRetry > 0) {
            console.log("try make new bet");
            let userUSDTBalance = await balanceOfUsdt(accounts[0]);
            let result = await dice.GoodLuckTRC20(seed, minFringe, maxFringe, ref, USDT.address, bet, {
                callValue: 0,
                shouldPollResponse: true,
            });
            let currentUserUSDTBalance = await balanceOfUsdt(accounts[0]);
            if (result >= minFringe && result <= maxFringe) {
                console.log('user win');
                wine = true;
                assert(currentUserUSDTBalance > userUSDTBalance, "User not receive reward in USDT");
            } else {
                console.log('user lose');
                lose = true;
            }
            if (wine && lose) {
                break;
            }
            countRetry--;
        }
        assert(countRetry > 0, `User not win or lose for ${maxGames} games`)
    });

    it('check user receive reward if win', async function () {
        const maxGames = 10;
        let countRetry = maxGames;
        const seed = 415151515151541;
        const bet = 15 * TRX; // SUN
        // expectedReward = wager * (gameRange - houseEdge) * (gameRange) / (range) / (gameRange);
        const expectedReward = 37125000 - bet; // SUN
        while (countRetry > 0) {
            console.log("try make new bet");
            let userBalance = await tronWeb.trx.getBalance(accounts[0]);
            let transactionID = await dice.GoodLuck(seed, minFringe, maxFringe, ref, {
                callValue: bet,
                shouldPollResponse: false,
            });
            let result;
            let resultTx = {};
            let confirmation = 0;
            while (!resultTx.id || confirmation < 6) {
                resultTx = await tronWeb.trx.getUnconfirmedTransactionInfo(transactionID);
                const currentBlockNumber = (await tronWeb.trx.getCurrentBlock()).block_header.raw_data.number;
                if (resultTx.id) {
                    confirmation = currentBlockNumber - resultTx.blockNumber;
                }
            }
            const fee = resultTx.fee;
            result = tronWeb.toBigNumber('0x' + resultTx.contractResult[0]).toNumber();
            const currentUserBalance = await tronWeb.trx.getBalance(accounts[0]);
            if (result >= minFringe && result <= maxFringe) {
                console.log('user win');
                assert(currentUserBalance === userBalance - fee + expectedReward, "User not receive reward");
                break;
            } else {
                console.log('user lose');
            }
            userBalance = currentUserBalance;
            countRetry--;
        }
        assert(countRetry > 0, `User not win or lose for ${maxGames} games`)
    });

    it('check user receive reward if win TRC20', async function () {
        const maxGames = 10;
        let countRetry = maxGames;
        const seed = 415151515151541;
        const bet = 15 * usdtDecimals;
        // expectedReward = wager * (gameRange - houseEdge) * (gameRange) / (range) / (gameRange);
        const expectedReward = 37125000 - bet;
        while (countRetry > 0) {
            console.log("try make new bet");
            let userUSDTBalance = await balanceOfUsdt(accounts[0]);
            let result = await dice.GoodLuckTRC20(seed, minFringe, maxFringe, ref, USDT.address, bet, {
                callValue: 0,
                shouldPollResponse: true,
            });
            let currentUserUSDTBalance = await balanceOfUsdt(accounts[0]);
            if (result >= minFringe && result <= maxFringe) {
                console.log('user win');
                assert(currentUserUSDTBalance === userUSDTBalance + expectedReward, "User not receive reward in USDT");
                break;
            } else {
                console.log('user lose');
            }
            countRetry--;
        }
        assert(countRetry > 0, `User not win or lose for ${maxGames} games`)
    });

    it('check bet limits', async function () {
        const seed = 415151515151541;

        const minBet = 10 * TRX;
        const maxBet = 100 * TRX;
        const validBet = 15 * TRX;

        assert(!!user, "User not defined, you must check account[1], work in dev chain");

        await assert.rejects(dice.setMinBet(minBet, {
            shouldPollResponse: true,
            from: user,
        }), "Change limits can only owner");

        await assert.rejects(dice.setMaxBet(maxBet, {
            shouldPollResponse: true,
            from: user,
        }), "Change limits can only owner");

        await dice.setMinBet(minBet);
        await dice.setMaxBet(maxBet);

        assert.strictEqual((await dice.getMinBet()).toNumber(), minBet, "Wrong limit");
        assert.strictEqual((await dice.getMaxBet()).toNumber(), maxBet, "Wrong limit");

        await assert.doesNotReject(dice.GoodLuck(seed, minFringe, maxFringe, ref, {
            callValue: minBet,
            shouldPollResponse: true,
        }), "Bet in limit range must pass");


        await assert.doesNotReject(dice.GoodLuck(seed, minFringe, maxFringe, ref, {
            callValue: maxBet,
            shouldPollResponse: true,
        }), "Bet in limit range must pass");

        await assert.doesNotReject(dice.GoodLuck(seed, minFringe, maxFringe, ref, {
            callValue: validBet,
            shouldPollResponse: true,
        }), "Bet in limit range must pass");

        await assert.rejects(dice.GoodLuck(seed, minFringe, maxFringe, ref, {
            callValue: TRX,
            shouldPollResponse: true,
        }), "Bet not in limit must reject");

        await assert.rejects(dice.GoodLuck(seed, minFringe, maxFringe, ref, {
            callValue: 2000 * TRX,
            shouldPollResponse: true,
        }), "Bet not in limit must reject");
    });

    it('check bet limits TRC20', async function () {
        const seed = 415151515151541;

        const minBet = 10 * usdtDecimals;
        const maxBet = 100 * usdtDecimals;
        const validBet = 15 * usdtDecimals;

        assert(!!user, "User not defined, you must check account[1], work in dev chain");

        await assert.rejects(dice.setMinBetTRC20(USDT.address, minBet, {
            shouldPollResponse: true,
            from: user,
        }), "Change limits can only owner");

        await assert.rejects(dice.setMaxBetTRC20(USDT.address, maxBet, {
            shouldPollResponse: true,
            from: user,
        }), "Change limits can only owner");

        await dice.setMinBetTRC20(USDT.address, minBet);
        await dice.setMaxBetTRC20(USDT.address, maxBet);
        //
        assert.strictEqual((await dice.getMinBetTRC20(USDT.address)).toNumber(), minBet, "Wrong limit");
        assert.strictEqual((await dice.getMaxBetTRC20(USDT.address)).toNumber(), maxBet, "Wrong limit");

        await assert.doesNotReject(dice.GoodLuckTRC20(seed, minFringe, maxFringe, ref, USDT.address, minBet, {
            shouldPollResponse: true,
        }), "Bet in limit range must pass");

        await assert.doesNotReject(dice.GoodLuckTRC20(seed, minFringe, maxFringe, ref, USDT.address, minBet, {
            shouldPollResponse: true,
        }), "Bet in limit range must pass");

        await assert.doesNotReject(dice.GoodLuckTRC20(seed, minFringe, maxFringe, ref, USDT.address, validBet, {
            shouldPollResponse: true,
        }), "Bet in limit range must pass");

        await assert.rejects(dice.GoodLuckTRC20(seed, minFringe, maxFringe, ref, USDT.address, 5 * usdtDecimals, {
            shouldPollResponse: true,
        }), "Bet not in limit must reject");

        await assert.rejects(dice.GoodLuckTRC20(seed, minFringe, maxFringe, ref, USDT.address, 2000 * usdtDecimals, {
            shouldPollResponse: true,
        }), "Bet not in limit must reject");
    });
});