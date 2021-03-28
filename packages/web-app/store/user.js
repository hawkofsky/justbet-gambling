import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

const ax = axios.create()

const mock = new MockAdapter(ax)
mock.onGet(/\/api\/user\/balance\/\w+/).reply(200, {
  error: false,
  result: [
    {
      trx: {
        balance: 100
      },
      winr: {
        balance: 300,
        staked: 200,
        availableBalance: 100
      }
    }
  ],
  message: 'OK'
})

export const state = () => ({
  address: '',
  balance: 0,
  winrBalance: 0,
  totalWinrBalance: 0,
  winrAvailable: 0,
  winrStaked: 0,
  winrStakedTime: 0,
  winrPassiveStaked: 0,
  isPlaying: false,
  refCount: 0,
  refMultiplier: 1,
  usdtBalance: 0,
  userTotalEarnedTRX: 0,
  userTotalEarnedUSDT: 0
})

export const mutations = {
  setAddress(state, address) {
    state.address = address
  },
  setBalance(state, balance) {
    state.balance = balance
  },
  setRefCount(state, count) {
    state.refCount = count
  },
  setRefMultiplier(state, Multiplier) {
    state.refMultiplier = Multiplier
  },
  setWinrBalance(state, winrBalance) {
    state.winrBalance = winrBalance
  },
  setTotalWinrBalance(state, totalWinrBalance) {
    state.totalWinrBalance = totalWinrBalance
  },
  setUSDTBalance(state, usdtBalance) {
    state.usdtBalance = usdtBalance
  },
  setWinrAvailable: (state, x) => (state.winrAvailable = x),
  setWinrStaked: (state, x) => (state.winrStaked = x),
  setWinrStakedTime: (state, x) => (state.winrStakedTime = x),
  setWinrPassiveStaked: (state, x) => (state.winrPassiveStaked = x),
  setIsPlaying: (state, v) => (state.isPlaying = v),
  setUserTotalEarnedTRX: (state, v) => (state.userTotalEarnedTRX = v / 1e6),
  setUserTotalEarnedUSDT: (state, v) => (state.userTotalEarnedUSDT = v / 1e6)
}

export const getters = {
  /* meaningless, 'cause we may access state directly */
  address(state) {
    return state.address
  },
  balance(state) {
    return state.balance
  },
  winrBalance(state) {
    return state.winrBalance
  },
  refCount(state) {
    return state.refCount
  },
  refMultiplier(state) {
    return state.refMultiplier
  },
  usdtBalance(state) {
    return state.usdtBalance
  }
  /* --- */
}
export const actions = {
  getUserStaking({ commit, state }) {
    axios.get(`/api/staking/${state.address}`).then(res => {
      commit('setUserTotalEarnedTRX', res.data.totalEarned.trx)
      commit('setUserTotalEarnedUSDT', res.data.totalEarned.usdt)
    })
  }
}
