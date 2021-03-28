<template>
  <div class="grey-content p-5">
    <h4 class="text-center pb-3">
      {{ $t('countdown_to_winning_airdrop') }}
      <b-button
        variant="transparent"
        class="py-0 btn-question align-self-end"
        @click="showInfoPopup"
      >
        <svg viewBox="0 0 612 612" class="icon icon-question">
          <use xlink:href="#icon-question"></use>
        </svg>
      </b-button>
    </h4>
    <AirdropsCounter />
    <AirdropsBalances />
    <AirdropsStacking />
  </div>
</template>

<script>
import AirdropsCounter from './AirdropsCounter'
import AirdropsBalances from './AirdropsBalances'
import AirdropsStacking from './AirdropsStacking'

export default {
  components: {
    AirdropsCounter,
    AirdropsBalances,
    AirdropsStacking
  },
  methods: {
    showInfoPopup() {
      this.$bvModal.show('info-popup')
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-question {
  margin-top: -10px;
}
.grey-content {
  background-image: url(~assets/images/profit-sharing-bg.png);
  background-repeat: no-repeat;
  background-color: #1d2738;
  background-position: right top;
  border-radius: 10px;
  height: 100%;
}
</style>
