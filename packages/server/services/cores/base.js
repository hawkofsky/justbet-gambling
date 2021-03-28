const { Container } = require('typedi');

const { tronWeb } = Container.get('tronWeb');

class Base {
  constructor(addr, tronParam) {
    this.addr = addr;
    this.tronWeb = tronParam || tronWeb;
    this.contract = this.tronWeb.contract().at(addr);
    this.knex = Container.get('knex');
  }
}
module.exports = Base;
