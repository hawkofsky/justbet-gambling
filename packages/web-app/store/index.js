export const state = () => ({
  tronLinkStatus: 'none'
})

export const mutations = {
  setTronLinkStatus: (state, status) => (state.tronLinkStatus = status)
}

export const actions = {
  init({ commit, dispatch }) {
    if (localStorage.showHowItWorks) {
      commit(
        'system/setHowItWorksStatus',
        !(localStorage.showHowItWorks === 'false')
      )
    }
    const url = new URLSearchParams(window.location.search)
    if (url.has('ref')) window.localStorage.setItem('ref', url.get('ref'))
  }
}
