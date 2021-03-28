<template>
  <header
    class="row justify-content-between align-items-center flex-wrap  text-center text-md-left"
  >
    <Logo extra-class="col-12 col-md-auto" />
    <div class="actions col-12 col-md-auto mt-4 mt-md-0">
      <b-button
        class="mr-3"
        variant="white-border"
        @click="redirect('/how-it-works')"
      >
        <svg
          viewBox="0 0 15 20"
          class="icon mr-2 ml-1"
          style="width: 15px; margin-top: -5px;"
        >
          <use xlink:href="#icon-wallet"></use>
        </svg>
        <span class="d-none d-xl-inline-block">
          {{ $t('how_it_works') }}
        </span>
      </b-button>
      <b-button
        class="mr-3"
        variant="white-border"
        @click="redirect('/winnings-airdrops')"
      >
        <svg
          viewBox="0 0 12 16"
          class="icon mr-2 ml-1"
          style="width: 12px; margin-top: -5px;"
        >
          <use xlink:href="#icon-exchange"></use>
        </svg>
        <span class="d-none d-xl-inline-block">
          {{ $t('exchange_winr') }}
        </span>
      </b-button>
      <b-button
        class="mr-3"
        variant="yellow"
        @click="redirect('/winnings-airdrops')"
      >
        <svg
          viewBox="0 0 20 20"
          class="icon mr-2 ml-1"
          style="width: 18px; margin-top: -5px;"
        >
          <use xlink:href="#icon-button-winr"></use>
        </svg>
        <span class="d-none d-xl-inline-block">
          {{ $t('share_winnings_airdrops') }}
        </span>
      </b-button>
      <b-button
        :class="
          `${showHowItWorksButton && showHowItWorks === false ? 'mr-2' : ''}`
        "
        variant="red"
        @click="redirect('/game/lottery')"
      >
        <svg viewBox="0 0 24 20" class="icon icon-lottery-tickets mr-2 ml-1">
          <use xlink:href="#lottery-tickets"></use>
        </svg>
        <span class="d-none d-xl-inline-block">
          {{ $t('buy_lottery_tickets') }}
        </span>
      </b-button>
      <b-button
        v-if="showHowItWorksButton && showHowItWorks === false"
        variant="transparent"
        class="py-0"
        @click="$store.commit('system/setHowItWorksStatus', true)"
      >
        <svg viewBox="0 0 612 612" class="icon icon-question">
          <use xlink:href="#icon-question"></use>
        </svg>
      </b-button>
    </div>
  </header>
</template>

<script>
import Logo from './Logo.vue'
export default {
  components: {
    Logo
  },
  props: {
    showHowItWorksButton: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    showHowItWorks() {
      return this.$store.getters['system/showHowItWorks']
    }
  }
}
</script>

<style lang="scss" scope>
header {
  .icon-lottery-tickets {
    width: 24px;
  }
  .btn {
    font-size: 0.8em;
    text-transform: uppercase;
  }
}
</style>
