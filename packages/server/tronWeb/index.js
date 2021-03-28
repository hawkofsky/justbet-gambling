const TronWeb = require('tronweb');

const { urls } = require('../../config').default;
const { shastaBackPrivate } = require('../config');

class TronWebInstance {
  constructor(address = shastaBackPrivate) {
    const { HttpProvider } = TronWeb.providers;
    const fullNode = new HttpProvider(urls.shasta.FullNode);
    const solidityNode = new HttpProvider(urls.shasta.FullNode);
    const eventServer = new HttpProvider(urls.shasta.FullNode);
    this.tronWeb = new TronWeb(fullNode, solidityNode, eventServer, address);
    this.stakeHolders = [];
  }
}

module.exports = TronWebInstance;
