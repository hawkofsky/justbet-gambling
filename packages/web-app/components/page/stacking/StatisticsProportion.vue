<template>
  <div class="stat-text text-center px-1 mb-4">
    <div class="grey mb-2 semi-bold uppercase">
      {{ $t('your_proportion') }}
    </div>
    <div class="d-flex align-items-center justify-content-center">
      <b>{{ winrStaked.toShort(1) }}</b>
      <img
        src="~/assets/images/coin-winr.png"
        alt="WINR"
        class="ml-2 mr-2"
      />
      <b>/ {{ activeStakesAmount.toShort(1) }}</b>
      <img
        src="~/assets/images/coin-winr.png"
        alt="WINR"
        class="ml-2"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('user', ['winrStaked']),
    ...mapState('stats', ['activeStakesAmount']),
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
