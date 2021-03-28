import axios from 'axios'
// import MockAdapter from 'axios-mock-adapter'
// import TronWeb from 'tronweb'

export const state = () => ({
  tickets: [],
  myTickets: []
  // total: 0,
  // lastFingerprint: '',
  // myTicketsLastFingerprint: '',
  // roundId: 0
})

export const mutations = {
  clearTickets: state => (state.tickets = []),
  clearMyTickets: state => (state.myTickets = []),
  addTickets: (state, data) => (state.tickets = [...data]),
  addMyTickets: (state, data) => (state.myTickets = [...data])
  // setTotal: (state, x) => (state.total = x),
  // setFingerprint: (state, data) =>
  //   data.general
  //     ? (state.lastFingerprint = data.newFingerprint)
  //     : (state.myTicketsLastFingerprint = data.newFingerprint),
  // setCurrentRound: (state, roundId) => (state.roundId = roundId)
}

export const actions = {
  async load({ state, commit }, address = false) {
    // await new Promise((resolve, reject) => (window.onload = resolve()))
    commit('clearTickets')

    const { data } = await axios.get(`/api/lottery/tickets/`)
    commit('addTickets', data)

    // const currentRound = await axios.post(
    //   process.env.NETWORK + '/wallet/triggersmartcontract',
    //   {
    //     contract_address: process.env.LOTTERY_ADDR,
    //     owner_address: '0x0',
    //     function_selector: 'currentRound()',
    //     parameter: '',
    //     call_value: 0,
    //     fee_limit: 1000000000
    //   }
    // )
    // const roundId = Number(
    //   parseInt(currentRound.data.constant_result[0].slice(0, 64)),
    //   16
    // )
    // console.log(roundId, 1);
    // commit('setCurrentRound', roundId)
    //
    // const general =
    //   process.env.NETWORK +
    //   '/event/contract/' +
    //   TronWeb.address.fromHex(process.env.LOTTERY_ADDR) +
    //   '/TicketBuy?size=50'
    //
    // const { data } = await axios.get(general)
    // if (!data.length) return null
    // commit('setTotal', data[0].totalTickets)
    // if (
    //   Object.getOwnPropertyNames(data[data.length - 1]).includes('_fingerprint')
    // ) {
    //   commit('setFingerprint', {
    //     newFingerprint: data[data.length - 1]._fingerprint
    //   })
    // }

    // commit('addMyTickets', data)
  },
  async loadUser({ state, commit }, address) {
    commit('clearMyTickets')

    const { data } = await axios.get(`/api/lottery/tickets/${address}`)
    commit('addMyTickets', data)
    //
    // commit('addMyTickets', data)
    // console.log(state.myTickets, 78)
    // const currentRound = await axios.post(
    //   process.env.NETWORK + '/wallet/triggersmartcontract',
    //   {
    //     contract_address: process.env.LOTTERY_ADDR,
    //     owner_address: '0x0',
    //     function_selector: 'currentRound()',
    //     parameter: '',
    //     call_value: 0,
    //     fee_limit: 1000000000
    //   }
    // )
    // const roundId = Number(
    //   parseInt(currentRound.data.constant_result[0].slice(0, 64), 16)
    // )
    // commit('setCurrentRound', roundId)

    // const personal =
    //   process.env.NETWORK +
    //   '/event/contract/' +
    //   TronWeb.address.fromHex(process.env.LOTTERY_ADDR) +
    //   '/TicketBuy?size=50&'

    // if (!data.length) return null
    // commit('setTotal', data[0].totalTickets)
    // if (
    //   Object.getOwnPropertyNames(data[data.length - 1]).includes('_fingerprint')
    // ) {
    //   commit('setFingerprint', {
    //     newFingerprint: data[data.length - 1]._fingerprint
    //   })
    // }
  }
  // async more({ state, commit }, address = false) {
  //   if (state.tickets.length === state.total) return
  //
  //   const generalEncoded = encodeURIComponent(
  //     '{"roundId":"' + state.roundId + '"}'
  //   )
  //   const general =
  //     process.env.NETWORK +
  //     '/event/contract/' +
  //     TronWeb.address.fromHex(process.env.LOTTERY_ADDR) +
  //     '/TicketBuy?size=50&' +
  //     'fingerprint=' +
  //     state.lastFingerprint +
  //     '&filters=' +
  //     generalEncoded
  //
  //   const { data } = await axios.get(general)
  //   if (!data.length) return null
  //   commit('setTotal', data[0].totalTickets)
  //   if (
  //     Object.getOwnPropertyNames(data[data.length - 1]).includes('_fingerprint')
  //   )
  //     commit('setFingerprint', {
  //       newFingerprint: data[data.length - 1]._fingerprint
  //     })
  //   commit('addTickets', { a: data, general: true })
  // },
  // async userMore({ commit }, address) {
  //   const addrHex = TronWeb.address.toHex(address).substring(2)
  //   const userEncoded = encodeURIComponent(
  //     `{"player":"0x${addrHex}","roundId":"${state.roundId}"}`
  //   )
  //   const personal =
  //     process.env.NETWORK +
  //     '/event/contract/' +
  //     TronWeb.address.fromHex(process.env.LOTTERY_ADDR) +
  //     '/TicketBuy?size=50&fingerprint' +
  //     state.myTicketsLastFingerprint +
  //     '&filters=' +
  //     userEncoded
  //
  //   const { data } = await axios.get(personal)
  //   if (!data.length) return null
  //   commit('setTotal', data[0].totalTickets)
  //   if (
  //     Object.getOwnPropertyNames(data[data.length - 1]).includes('_fingerprint')
  //   )
  //     commit('setFingerprint', {
  //       newFingerprint: data[data.length - 1]._fingerprint
  //     })
  //   commit('addTickets', { a: data, general: false })
  // }
}
