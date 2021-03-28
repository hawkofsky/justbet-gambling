import Vue from 'vue'

Vue.mixin({
  computed: {
    locale() {
      return this.$store.state.system.locale
    }
  },
  methods: {
    getActiveRoutePath() {
      const { path } = this.$route

      return path
    },
    redirect(route, addLanguage = true) {
      if (!route) {
        return false
      }
      this.$store.commit('system/changeLoadingStatus', true)

      let path = route

      if (addLanguage) {
        path = `/${this.locale}${route}`
      }

      setTimeout(() => {
        this.$router.push({
          path
        })
        setTimeout(() => {
          this.$store.commit('system/changeLoadingStatus', false)
        }, 200)
      }, 1000)
    }
  }
})
