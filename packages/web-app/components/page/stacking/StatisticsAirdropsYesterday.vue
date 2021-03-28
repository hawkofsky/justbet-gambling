<template>
  <div class="stat-text text-center px-5 my-4">
    <div class="grey mb-2 semi-bold uppercase">
      {{ $t('yesterdays_airdrop') }}
    </div>
    <div class="d-flex align-items-center justify-content-center">
      <b>{{ airdroppedYesterdayTRX.toShort(1) }} </b>
      <img
        src="~/assets/svg/coin-trx-red.svg"
        alt=""
        class="ml-2"
      />
      <b class="ml-2">{{ airdroppedYesterdayUSDT.toShort(1) }} </b>
      <img
        src="~/assets/svg/coin-usdt-green.svg"
        alt="USDT"
        class="ml-2"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('stats', [
      'airdroppedYesterdayTRX',
      'airdroppedYesterdayUSDT'
    ])
  }
}
</script>

<style lang="scss" scoped>
.stat-text {
  font-size: 0.8em;
  line-height: 1.4em;
  text-transform: uppercase;
  img {
    width: 18px;
  }
  b {
    font-size: 1.333em;
  }
}
</style>
