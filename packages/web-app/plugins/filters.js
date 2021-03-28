import Vue from 'vue'
import TronWeb from 'tronweb'

const toFormat = decimals => v =>
  !v.valueOf()
    ? 0
    : parseFloat(v.valueOf().toFixed(decimals)).toLocaleString('en')
// const tw = new TronWeb('http://api.trongrid.com')
const fromHex = () => v => TronWeb.address.fromHex(v.valueOf())

Vue.filter(
  'shorten',
  v => `${v.substring(0, 8)}...${v.substring(v.length - 8)}`
)
Vue.filter('toFormat0', toFormat(0))
Vue.filter('toFormat2', toFormat(2))
Vue.filter('toFormat3', toFormat(3))
Vue.filter('addrFromHex', fromHex())
