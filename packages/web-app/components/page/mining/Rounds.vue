<template>
  <div class="result-stats pt-5 h-100">
    <h3 class="text-center pb-3">
      {{ $t('round') }}
      {{ activeRound }}
    </h3>
    <CircularProgress :percent="totalMinedPercent">
      <div class="circular-progress-data text-center">
        <img src="~/assets/images/coin-winr.png" alt="" class="mt-1 mb-3" />
        <div class="">
          <b>{{ mintedRound.toShort() }}</b>
          <div class="grey">/ {{ totalRound.toShort() }}</div>
        </div>
      </div>
    </CircularProgress>
    <div class="stat-text text-center px-5 my-4">
      <div class="grey mb-3 uppercase">
        {{ $t('winr_circulating_supply') }}:
      </div>
      <div class="d-flex align-items-center justify-content-center">
        <b>{{ totalSupply.toFormat() }} </b>
        <img src="~/assets/images/coin-winr.png" alt="" class="ml-2" />
      </div>
    </div>
    <div class="stat-text text-center px-5 mb-4">
      <div class="grey mb-3 uppercase">
        {{ $t('your_winr_earned') }}:
      </div>
      <div class="d-flex align-items-center justify-content-center">
        <b>{{ userMined.toFormat() }} </b>
        <img src="~/assets/images/coin-winr.png" alt="" class="ml-2" />
      </div>
    </div>
    <div class="stat-text text-center px-5 mb-4">
      <div class="grey mb-3 uppercase">
        {{ $t('your_total_wagered') }}:
      </div>
      <div class="d-flex align-items-center justify-content-center">
        <b>{{ totalWageredTRX.toFormat() }} </b>
        <img src="~/assets/svg/coin-trx-red.svg" alt="" class="ml-2" />
        <b class="ml-2">{{ totalWageredUSDT.toFormat() }} </b>
        <img src="~/assets/svg/coin-usdt-green.svg" alt="USDT" class="ml-2" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import { CircularProgress } from '~/components/ui/'

export default {
  components: {
    CircularProgress
  },
  props: {
    totalSupply: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      activeRound: 1,
      mintedRound: 0,
      totalRound: 0,
      userMined: 0
    }
  },
  computed: {
    ...mapState('contracts', ['contractAddr']),
    ...mapState('user', ['winrBalance', 'address']),
    ...mapState('mining', ['totalWageredTRX', 'totalWageredUSDT']),
    totalMinedPercent() {
      if (!this.totalRound) return 0

      return parseInt((this.mintedRound / this.totalRound) * 100)
    }
  },
  async mounted() {
    while (!this.address) {
      await this.delay(200)
    }
    this.getMiningStats()
  },
  methods: {
    async getMiningStats() {
      if (!this.address) return
      const winrContract = await this.getContract(this.contractAddr.WINR_ADDR)

      try {
        const activeRoundData = await winrContract.getActiveRound().call()
        this.mintedRound = activeRoundData.minted._hex / 1e6
        this.totalRound = activeRoundData.amount._hex / 1e6

        const activeRound = Number(await winrContract.activeRound().call()) + 1
        this.$set(this, 'activeRound', activeRound)

        this.userMined = Number(
          (await winrContract.minedToUser(this.address).call()) / 1e6
        )
      } catch (error) {
        // eslint-disable-next-line
        console.log(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.result-stats {
  background-color: #1d2738;
  border-radius: 10px;
  .circular-progress-data {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 90px;
    height: 80px;
    transform: translate(-50%, -50%);
    font-size: 1.25em;
    line-height: 1em;
    img {
      width: 18px;
    }
    .grey {
      font-size: 0.6em;
    }
  }
  .stat-text {
    font-size: 0.8em;
    line-height: 1.4em;
    text-transform: uppercase;
    img {
      width: 18px;
    }
    b {
      font-size: 1.25em;
    }
  }
}
</style>
