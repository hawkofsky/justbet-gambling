<template>
  <CircularProgress :percent="totalSupplyPercent">
    <div class="circular-progress-data text-center">
      <img
        src="~/assets/images/coin-winr.png"
        alt=""
        class="mt-1 mb-3"
      />
      <div class="">
        <b>
          {{ totalStaked ? totalStaked.toShort(2) : 0 }}
        </b>
        <div class="grey mt-1">/ {{ totalSupplyShown }}</div>
      </div>
    </div>
  </CircularProgress>
</template>

<script>
import { mapState } from 'vuex'

import { CircularProgress } from '~/components/ui/'

export default {
  components: {
    CircularProgress
  },
  computed: {
    ...mapState('user', ['winrBalance']),
    ...mapState('stats', ['totalSupply', 'totalStaked']),

    totalSupplyShown() {
      if (!this.totalSupply) return 0

      return this.totalSupply.toShort(2)
    },

    totalSupplyPercent() {
      if (!this.totalSupply) return 0

      return parseInt((this.totalStaked / this.totalSupply) * 100)
    }
  }
}
</script>

<style lang="scss" scoped>
.circular-progress-data {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 90px;
  height: 80px;
  transform: translate(-50%, -50%);
  font-size: 1.2em;
  line-height: 1em;
  img {
    width: 18px;
  }
  .grey {
    font-size: 0.7em;
  }
}
</style>
