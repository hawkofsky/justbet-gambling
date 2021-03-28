<template>
  <div class="main-container">
    <svg-default></svg-default>
    <Sidebar @handle-loader="handleLoader" />
    <MobileHeader />
    <Loader :loading="loading">
      <nuxt />
    </Loader>
    <Navigation type="mobile" @handle-loader="handleLoader" />
    <Terms id="term-warning">
      <p class="mb-0">
        If you reside in a location where lotteries, gambling, or betting over
        the internet is illegal, please do not click on anything related to the
        activities on this site.
      </p>
      <br />
      <p class="mb-0">
        We are using cookies to improve your experience. Check out our
        <a href="/privacy-policy">Privacy&nbsp;Policy</a>
      </p>
      <br />
    </Terms>
    <LoginPopup />
    <MessagePopup />
  </div>
</template>

<script>
import SvgDefault from '@/assets/svg/default-01.svg?inline'

import {
  Sidebar,
  MobileHeader,
  Loader,
  Navigation,
  Terms,
  LoginPopup,
  MessagePopup
} from '~/components/ui/'

/* eslint-disable */
Number.prototype.toFormat = function(decimals = 2) {
  if (!this.valueOf()) return 0
  return parseFloat(this.valueOf().toFixed(decimals)).toLocaleString('en')
}
Number.prototype.toShort = function(fixed = 0) {
  let num = this.valueOf()
  if (num === null) {
    return null
  }
  if (num === 0) {
    return '0'
  }
  fixed = !fixed || fixed < 0 ? 0 : fixed
  let b = num.toPrecision(2).split('e'),
    k = b.length === 1 ? 0 : Math.floor(Math.min(b[1].slice(1), 14) / 3),
    c =
      k < 1
        ? num.toFixed(0 + fixed)
        : (num / Math.pow(10, k * 3)).toFixed(1 + fixed),
    d = c < 0 ? c : Math.abs(c),
    e = d + ['', 'k', 'm', 'b', 't'][k]
  return e
}

Number.prototype.toRegular = function() {
  return this.valueOf() / 10 ** 6
}

String.prototype.toRegular = function() {
  return parseInt(this.valueOf()) / 10 ** 6
}

String.prototype.toFormat = function(decimals = 2) {
  return parseFloat(this.valueOf()).toFormat(decimals)
}

String.prototype.toShort = function(decimals = 2) {
  return parseFloat(this.valueOf()).toShort(decimals)
}
/* eslint-enable */
export default {
  components: {
    Sidebar,
    MobileHeader,
    Loader,
    Navigation,
    Terms,
    SvgDefault,
    LoginPopup,
    MessagePopup
  },
  data() {
    return {
      loading: false
    }
  },
  mounted() {
    this.tronInit()

    this.$store.dispatch('init', { socket: this.$socket })
    this.$store.dispatch('stats/getStats')
  },
  methods: {
    handleLoader(loadStatus) {
      this.$set(this, 'loading', loadStatus)
    }
  }
}
</script>
