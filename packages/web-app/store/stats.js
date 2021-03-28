import axios from 'axios'

export const state = () => ({
  bankRollTRX: 0,
  bankRollUSDT: 0,
  totalWonTRX: 0,
  totalWonUSDT: 0,
  airdroppedTotalTRX: 0,
  airdroppedTotalUSDT: 0,
  airdroppedLastWeekTRX: 0,
  airdroppedLastWeekUSDT: 0,
  airdroppedYesterdayTRX: 0,
  airdroppedYesterdayUSDT: 0,
  currentDailyPoolTRX: 0,
  currentDailyPoolUSDT: 0,
  activeStakesAmount: 0,
  winrBalance: 0,
  totalStaked: 0,
  lotteryJackpotTRX: 0,
  lotteryJackpotUSDT: 0,
  lotteryTime: 0,
  totalSupply: 0,
  lotteryTickets: 0
})

export const mutations = {
  changeBankRollTRX(state, val) {
    state.bankRollTRX = val / 1e6
  },
  changeBankRollUSDT(state, val) {
    state.bankRollUSDT = val / 1e6
  },
  changeTotalWonTRX(state, val) {
    state.totalWonTRX = val / 1e6
  },
  changeTotalWonUSDT(state, val) {
    state.totalWonUSDT = val / 1e6
  },
  changeAirdroppedTotalTRX(state, val) {
    state.airdroppedTotalTRX = val / 1e6
  },
  changeAirdroppedTotalUSDT(state, val) {
    state.airdroppedTotalUSDT = val / 1e6
  },
  changeAirdroppedLastWeekTRX(state, val) {
    state.airdroppedLastWeekTRX = val
  },
  changeAirdroppedLastWeekUSDT(state, val) {
    state.airdroppedLastWeekUSDT = val
  },
  changeAirdroppedYesterdayTRX(state, val) {
    state.airdroppedYesterdayTRX = val / 1e6
  },
  changeAirdroppedYesterdayUSDT(state, val) {
    state.airdroppedYesterdayUSDT = val / 1e6
  },
  changeCurrentDailyPoolTRX(state, val) {
    state.currentDailyPoolTRX = val / 1e6
  },
  changeCurrentDailyPoolUSDT(state, val) {
    state.currentDailyPoolUSDT = val / 1e6
  },
  changeActiveStakesAmount(state, val) {
    state.activeStakesAmount = val
  },
  changeStaked(state, val) {
    state.totalStaked = val / 1e6
  },
  changeWinrBalance(state, val) {
    state.winrBalance = val
  },
  changeTotalSupply(state, val) {
    state.totalSupply = val / 1e6
  },
  changeLotteryJackpotTRX(state, val) {
    state.lotteryJackpotTRX = val / 1e6
  },
  changeLotteryJackpotUSDT(state, val) {
    state.lotteryJackpotUSDT = val / 1e6
  },
  changeLotteryTime(state, val) {
    state.lotteryTime = val
  }
}

export const actions = {
  getStats({ commit }) {
    axios.get('/api/stats/info').then(res => {
      commit('changeBankRollTRX', res.data.bankroll)
      commit('changeBankRollUSDT', res.data.bankrollUSDT)
      commit('changeTotalWonTRX', res.data.totalWon)
      commit('changeTotalWonUSDT', res.data.totalWonUSDT)
      commit('changeLotteryJackpotTRX', res.data.lotteryJackpot)
      commit('changeLotteryJackpotUSDT', res.data.lotteryJackpotUSDT)
      commit('changeStaked', res.data.totalStaked)
      commit('changeTotalSupply', res.data.totalSupply)
      commit('changeWinrBalance', res.data.winrBalance)
      commit('changeAirdroppedTotalTRX', res.data.airdropped.trx)
      commit('changeAirdroppedTotalUSDT', res.data.airdropped.usdt)
      commit('changeAirdroppedLastWeekTRX', res.data.airdroppedLastWeek)
      commit('changeAirdroppedYesterdayTRX', res.data.airdroppedYesterday.trx)
      commit('changeAirdroppedYesterdayUSDT', res.data.airdroppedYesterday.usdt)
      commit('changeCurrentDailyPoolTRX', res.data.currentDailyPoolTRX)
      commit('changeCurrentDailyPoolUSDT', res.data.currentDailyPoolUSDT)
    })
  }
}
