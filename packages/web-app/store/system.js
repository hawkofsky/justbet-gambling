export const state = () => ({
  loading: false,
  locales: ['en', 'tr', 'kr', 'ch', 'ru', 'es'],
  locale: 'en',
  showHowItWorks: true
})

export const mutations = {
  changeLoadingStatus(state, status) {
    state.loading = status
  },
  setHowItWorksStatus(state, status) {
    state.showHowItWorks = status
    localStorage.showHowItWorks = status
  },
  setLang(state, locale) {
    if (state.locales.includes(locale)) {
      state.locale = locale
    }
  }
}

export const getters = {
  loading(state) {
    return state.loading
  },
  showHowItWorks(state) {
    return state.showHowItWorks
  }
}
