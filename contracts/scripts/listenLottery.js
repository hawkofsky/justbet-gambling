const {
    LOTTERY_ADDR: lotteryAddress,
    WINR_ADDR: winrAddress
} = require("../../packages/config/contracts.json");
const privateKey = "c973ea2cc6d50ccb41eb06fc03a2d8670e81a00d09438dc9baa35d61939254fd";

const TronWeb = require('tronweb')
const HttpProvider = TronWeb.providers.HttpProvider;
const fullNode = new HttpProvider("https://api.shasta.trongrid.io");
const solidityNode = new HttpProvider("https://api.shasta.trongrid.io");
const eventServer = new HttpProvider("https://api.shasta.trongrid.io");
const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, privateKey);

(async () => {
    let lotteryInstance = await tronWeb.contract().at(lotteryAddress);
    lotteryInstance.Drawn().watch((err, event) => {
        if (err) {
            return console.error('Error with "method" event:', err);
        }
        if (event) {
            console.log(event);
            
            const res = parseDraw(event.result[3], event.result.winnerLength);
            console.log(`Drawn:`);
            console.log(res);
        }
    });
    lotteryInstance.TicketBuy().watch((err, event) => {
        if (err) {
            return console.error('Error with "method" event:', err);
        }
        if (event) {
            console.log(event);

        }
    });
    
    lotteryInstance.BlockNumber().watch((err, event) => {
        if (err) {
            return console.error('Error with "method" event:', err);
        }
        if (event) {
            console.log(event);

        }
    });
})().catch(console.log)

function parseDraw(nums, winNum) {
    const nms = [];
    const winners = [];
    const parsed = nums.substring(0, nums.length - (winNum * 64));
  
    const addresses = nums.substring(nums.length - (winNum * 64), nums.length);
    for (let i = 0; i < parsed.length / 64; i += 1) {
      nms[i] = Number(`0x${parsed.substring(i * 64, (i + 1) * 64)}`);
      }
    for (let i = 0; i < addresses.length / 64; i += 1) {
      console.log(addresses.substring((i * 64) + 24, (i + 1) * 64));
      winners[i] = tronWeb.address.fromHex(`0x${addresses.substring((i * 64) + 24, (i + 1) * 64)}`);
    }
    return {
      jackpot: nms[0],
      tickets: nms.splice(1, 5),
      winners
    };
  }