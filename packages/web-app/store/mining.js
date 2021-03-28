import axios from 'axios'

export const state = () => ({
  efficiencyYesterdayWINRofTRX: 0,
  efficiencyYesterdayWINRofUSDT: 0,
  efficiencyAllWINRofTRX: 0,
  efficiencyAllWINRofUSDT: 0,
  efficiencyYesterdayTRX: 0,
  efficiencyYesterdayUSDT: 0,
  efficiencyAllTRX: 0,
  efficiencyAllUSDT: 0,
  totalWageredTRX: 0,
  totalWageredUSDT: 0
})

export const mutations = {
  changeEfficiencyYesterdayWINRofTRX(state, val) {
    state.efficiencyYesterdayWINRofTRX = val / 1e6
  },
  changeEfficiencyYesterdayWINRofUSDT(state, val) {
    state.efficiencyYesterdayWINRofUSDT = val
  },
  changeEfficiencyAllWINRofTRX(state, val) {
    state.efficiencyAllWINRofTRX = val / 1e6
  },
  changeEfficiencyAllWINRofUSDT(state, val) {
    state.efficiencyAllWINRofUSDT = val / 1e6
  },
  changeEfficiencyYesterdayTRX(state, val) {
    state.efficiencyYesterdayTRX = val
  },
  changeEfficiencyYesterdayUSDT(state, val) {
    state.efficiencyYesterdayUSDT = val / 1e6
  },
  changeEfficiencyAllTRX(state, val) {
    state.efficiencyAllTRX = val
  },
  changeEfficiencyAllUSDT(state, val) {
    state.efficiencyAllUSDT = val / 1e6
  },
  changeTotalWageredTRX(state, val) {
    state.totalWageredTRX = val / 1e6
  },
  changeTotalWageredUSDT(state, val) {
    state.totalWageredUSDT = val / 1e6
  }
}

export const actions = {
  getStats({ commit }, address) {
    axios.get(`/api/mining/${address}`).then(res => {
      commit('changeEfficiencyYesterdayTRX', res.data.efficiency.yesterday.trx)
      commit('changeEfficiencyYesterdayUSDT', res.data.efficiency.yesterday.usdt)
      commit('changeEfficiencyAllTRX', res.data.efficiency.all.trx)
      commit('changeEfficiencyAllUSDT', res.data.efficiency.all.usdt)

      commit('changeEfficiencyYesterdayWINRofTRX', res.data.efficiency_staking.yesterday.trx)
      commit('changeEfficiencyYesterdayWINRofUSDT', res.data.efficiency_staking.yesterday.usdt)
      commit('changeEfficiencyAllWINRofTRX', res.data.efficiency_staking.all.trx)
      commit('changeEfficiencyAllWINRofUSDT', res.data.efficiency_staking.all.usdt)

      commit('changeTotalWageredTRX', res.data.totalWagered.trx)
      commit('changeTotalWageredUSDT', res.data.totalWagered.usdt)
    })
  }
}
