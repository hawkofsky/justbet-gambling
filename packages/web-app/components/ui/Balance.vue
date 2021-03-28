<template>
  <div class="d-flex align-items-center balance">
    <span class="grey mr-2 uppercase">{{ $t('balance') }}:</span>

    <div class="trx d-flex align-items-center">
      <div class="relative">
        <div :class="`score ${trxType} ${trxAnimate ? 'animate' : ''}`">
          {{ trxScore | toFormat0 }}
        </div>
        <div>{{ showBalance | toFormat0 }}</div>
      </div>
      <img class="icon-coin mx-2" src="~/assets/svg/coin-trx-red.svg" alt="" />
    </div>
    <div class="usdt d-flex align-items-center">
      <div :class="`score ${usdtType} ${usdtAnimate ? 'animate' : ''}`">
        {{ usdtScore | toFormat0 }}
      </div>
      <div>{{ showUSDTBalance | toFormat0 }}</div>
      <div class="icon ml-2">
        <img
          src="~/assets/svg/coin-usdt-green.svg"
          alt="USDT"
          class="icon-coin"
        />
      </div>
    </div>
    <div class="winr d-flex align-items-center ml-2">
      <div class="relative">
        <div :class="`score ${winrType} ${winrAnimate ? 'animate' : ''}`">
          {{ winrScore | toFormat2 }}
        </div>
        <div>{{ showWinrBalance | toFormat2 }}</div>
      </div>
      <img class="icon-coin ml-2" src="~/assets/images/coin-winr.png" alt="" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    isPlayUSDT: {
      type: Boolean,
      default: () => false
    }
  },
  data() {
    return {
      winrAnimate: false,
      winrType: '',
      winrScore: 0,
      trxAnimate: false,
      trxType: '',
      trxScore: 0,
      usdtAnimate: false,
      usdtType: '',
      usdtScore: 0,
      showBalance: 0,
      showWinrBalance: 0,
      showUSDTBalance: 0,
    }
  },
  computed: {
    ...mapState('user', ['balance', 'winrBalance', 'isPlaying', 'usdtBalance'])
  },
  watch: {
    usdtBalance: {
      handler(newB, oldB) {
        if (!oldB) {
          this.showUSDTBalance = newB
          return
        }
        if (newB > oldB) {
          this.usdtGain(newB - oldB, newB)
        }

        if (newB < oldB) {
          this.usdtLost(oldB - newB, newB)
        }
      }
    },
    balance: {
      handler(newB, oldB) {
        // console.log('balance changed', newB, oldB)
        if (!oldB) {
          this.showBalance = newB
          return
        }
        if (newB > oldB) {
          this.trxGain(newB - oldB, newB)
        }

        if (newB < oldB) {
          this.trxLost(oldB - newB, newB)
        }
      }
    },
    winrBalance: {
      handler(newB, oldB) {
        // console.log('winr balance changed', newB, oldB)
        if (!oldB) {
          this.showWinrBalance = newB
          return
        }
        if (newB > oldB) {
          this.winrGain(newB - oldB, newB)
        }

        if (newB < oldB) {
          this.winrLost(oldB - newB, newB)
        }
      }
    }
    // winrType: v => console.log(v)
  },
  async mounted() {
    await this.delay(4000)

    // setInterval(() => {
    //   setTimeout(() => {
    //     this.winrGain('+0.123123')
    //     this.trxGain('+0.123123')
    //     setTimeout(() => {
    //       this.winrLost('-0.123123')
    //       this.trxLost('-0.123123')
    //     }, 7500)
    //   }, 0)
    // }, 15000)

    this.showBalance = this.balance
    this.showWinrBalance = this.winrBalance
    this.showUSDTBalance = this.usdtBalance
  },
  methods: {
    winrRefresh() {
      this.winrType = ''
      this.winrScore = 0
      this.winrAnimate = false
    },
    trxRefresh() {
      this.trxType = ''
      this.trxScore = 0
      this.trxAnimate = false
    },
    usdtRefresh() {
      this.usdtType = ''
      this.usdtScore = 0
      this.usdtAnimate = false
    },
    async winrGain(score, v) {
      while (this.isPlaying || this.winrAnimate) await this.delay(50)
      // this.winrRefresh()
      this.winrAnimate = true
      // await this.delay(500)
      this.winrType = 'gain'
      this.winrScore = parseFloat(score)
      await this.delay(100)
      this.winrAnimate = true
      await this.delay(1300)
      this.winrRefresh()
      this.showWinrBalance = v
    },
    async winrLost(score, v) {
      while (this.isPlaying || this.winrAnimate) await this.delay(50)
      // this.winrRefresh()
      this.winrAnimate = true
      // await this.delay(500)
      this.winrType = 'lost'
      this.winrScore = parseFloat(score)
      await this.delay(100)
      this.winrAnimate = true
      await this.delay(1300)
      this.winrRefresh()
      this.showWinrBalance = v
    },
    async trxGain(score, v) {
      while (this.isPlaying || this.trxAnimate) await this.delay(50)
      this.trxRefresh()
      this.trxAnimate = true
      await this.delay(500)
      this.trxType = 'gain'
      this.trxScore = parseFloat(score)
      await this.delay(100)
      this.trxAnimate = true
      await this.delay(1300)
      this.trxRefresh()
      this.showBalance = v
    },
    async trxLost(score, v) {
      while (this.isPlaying || this.trxAnimate) await this.delay(50)
      this.trxRefresh()
      this.trxAnimate = true
      await this.delay(500)
      this.trxType = 'lost'
      this.trxScore = parseFloat(score)
      await this.delay(100)
      this.trxAnimate = true
      await this.delay(1300)
      this.trxRefresh()
      this.showBalance = v
    },
    async usdtGain(score, v) {
      while (this.isPlaying || this.usdtAnimate) await this.delay(50)
      this.usdtRefresh()
      this.usdtAnimate = true
      await this.delay(500)
      this.usdtType = 'gain'
      this.usdtScore = parseFloat(score)
      await this.delay(100)
      this.usdtAnimate = true
      await this.delay(1300)
      this.usdtRefresh()
      this.showUSDTBalance = v
    },
    async usdtLost(score, v) {
      while (this.isPlaying || this.usdtAnimate) await this.delay(50)
      this.usdtRefresh()
      this.usdtAnimate = true
      await this.delay(500)
      this.usdtType = 'lost'
      this.usdtScore = parseFloat(score)
      await this.delay(100)
      this.usdtAnimate = true
      await this.delay(1300)
      this.usdtRefresh()
      this.showUSDTBalance = v
    },
    async testAnim() {
      this.trxGain(777, 234777)
      await this.delay(500)
      this.trxLost(777, 234000)
      await this.delay(500)
      this.winrLost(7777, 35000)
      await this.delay(500)
      this.winrGain(7777, 35777)
    }
  }
}
</script>

<style lang="scss" scoped>
.balance {
  position: relative;

  .winr,
  .trx,
  .usdt {
    position: relative;
  }

  .winr {
    /* min-width: 80px; */
    justify-content: flex-end;
  }

  .relative {
    position: relative;
  }

  .score {
    position: absolute;
    right: 0;
    top: 0;

    opacity: 0;

    &.animate.gain {
      animation: slideDown 2s forwards;
      opacity: 1;
    }
    &.animate.lost {
      animation: slideUp 2s forwards;
      opacity: 1;
    }
    &.gain {
      color: #37dd4a;
    }
    &.lost {
      color: #db2f52;
    }
  }
}

@keyframes slideDown {
  0% {
    transform: translateY(-60px);
  }
  50% {
    transform: translateY(-14px);
  }
  70% {
    transform: translateY(-14px);
    opacity: 1;
  }
  100% {
    transform: translateY(-14px);
    opacity: 0;
  }
}

@keyframes slideUp {
  0% {
    transform: translateY(-14px);
    opacity: 0;
  }

  20% {
    opacity: 1;
  }

  100% {
    transform: translateY(-60px);
  }
}
</style>
