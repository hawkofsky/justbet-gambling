import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

const ax = axios.create()

const mock = new MockAdapter(ax)
mock.onGet(/\/api\/staking\/\w+/).reply(200, {
  error: false,
  result: [
    {
      airdrops: {
        yesterday: 100,
        lastWeek: 200
      },
      user: {
        winr: {
          balance: 300,
          staked: 200,
          availableBalance: 100
        },
        claimable: 200
      }
    }
  ],
  message: 'OK'
})

export const state = () => ({
  airdrops: {
    yesterday: 0,
    lastWeek: 0
  },
  diagram: {
    total: 0,
    user: 0
  },
  claimable: 0
})

export const mutations = {
  setAirdrops: (state, { yesterday, lastWeek }) =>
    (state.airdrops = { yesterday, lastWeek }),
  setClaimable: (state, x) => (state.claimable = x),
  setDiagram: (state, { total, user }) => (state.diagram = { total, user })
}
