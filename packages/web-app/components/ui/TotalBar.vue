<template>
  <div class="total-bar semi-bold d-none d-md-block">
    <div class="container d-flex justify-content-between flex-wrap">
      <div
        class="col-6 col-md-4 col-lg-auto px-0 d-flex align-items-center py-2"
      >
        <div class="total-text d-flex align-items-end">
          <span class="title mr-2">{{ $t('total_won') }}:</span>
          <span>{{ totalWonTRX | toFormat0 }}</span>
          <img
            src="~/assets/svg/coin-trx-red.svg"
            alt="TRX"
            class="icon-coin ml-2"
          />
        </div>
        <div
          class="total-text d-flex align-items-end ml-2"
          style="white-space: nowrap;"
        >
          <span>{{ totalWonUSDT | toFormat0 }}</span>
          <img
            src="~/assets/svg/coin-usdt-green.svg"
            alt="USDT"
            class="icon-coin ml-2"
          />
        </div>
      </div>

      <div
        class="col-6 col-md-4 col-lg-auto px-0 d-flex align-items-center justify-content-center justify-content-lg-start py-2"
      >
        <div class="total-text d-flex align-items-end">
          <span class="title mr-2">{{ $t('winnings_airdropped') }}:</span>
          <span>{{ airdroppedTotalTRX | toFormat0 }}</span>
          <img
            src="~/assets/svg/coin-trx-red.svg"
            alt="TRX"
            class="icon-coin ml-2"
          />
        </div>
        <div
          class="total-text d-flex align-items-end ml-2"
          style="white-space: nowrap;"
        >
          <span>{{ airdroppedTotalUSDT | toFormat0 }}</span>
          <img
            src="~/assets/svg/coin-usdt-green.svg"
            alt="USDT"
            class="icon-coin ml-2"
          />
        </div>
      </div>

      <div
        class="col-6 col-md-4 col-lg-auto px-0 d-flex align-items-center justify-content-end justify-content-lg-start py-2"
      >
        <div class="total-text d-flex align-items-end">
          <span class="title mr-2">{{ $t('staked') }}:</span>
          <span>{{ totalStaked | toFormat0 }}</span>
          <img
            src="~/assets/images/coin-winr.png"
            alt="WINR"
            class="icon-coin ml-2"
          />
        </div>
      </div>
      <div
        class="col-6 col-md-4 col-lg-auto px-0 d-flex align-items-center py-2"
      >
        <div class="total-text d-flex align-items-end">
          <span class="title mr-2">{{ $t('lottery') }}:</span>
          <span>{{ lotteryJackpotTRX | toFormat0 }}</span>
          <img
            src="~/assets/svg/coin-trx-red.svg"
            alt="TRX"
            class="icon-coin ml-2"
          />
          <span class="ml-2">{{ lotteryJackpotUSDT | toFormat0 }}</span>
          <img
            src="~/assets/svg/coin-usdt-green.svg"
            alt="USDT"
            class="icon-coin ml-2"
          />
        </div>
      </div>

      <div class="col-6 col-md-4 col-lg-auto px-0">
        <div
          class="social d-flex align-items-center justify-content-center h-100"
        >
          <a
            href="https://twitter.com/JustBetOfficial"
            target="_blank"
            class="ml-3"
          >
            <svg viewBox="0 0 18 14" class="icon">
              <use xlink:href="#icon-twitter"></use>
            </svg>
          </a>
          <a href="https://medium.com/@justbet" target="_blank" class="ml-3">
            <svg viewBox="0 0 483.86 483.86" class="icon">
              <use xlink:href="#icon-medium"></use>
            </svg>
          </a>
          <a href="https://t.me/JustBetSupport" target="_blank" class="ml-3">
            <svg viewBox="0 0 17 14" class="icon">
              <use xlink:href="#icon-telegram"></use>
            </svg>
          </a>
        </div>
      </div>

      <div class="col-6 col-md-4 col-lg-auto px-0">
        <div class="row align-items-center justify-content-end h-100">
          <div class="col-auto">
            <a
              href="#"
              class="yellow d-flex align-items-center"
              @click="redirect('/winnings-airdrops')"
            >
              <svg viewBox="0 0 14 17" class="icon-clock mr-2 mb-1">
                <use xlink:href="#icon-clock"></use>
              </svg>
              {{ hours | twoDigit }} :
              {{ minutes | twoDigit }} :
              {{ seconds | twoDigit }}
            </a>
          </div>

          <div class="col-auto">
            <a v-if="address" href="#" class="uppercase">
              {{ address | shorten }}
            </a>
            <a
              v-if="tronLinkStatus === 'active'"
              v-b-modal.login-popup
              href="#"
              class="uppercase"
            >
              {{ $t('login') }}
            </a>
            <a
              v-if="tronLinkStatus === 'offline'"
              href="https://chrome.google.com/webstore/detail/tronlink%EF%BC%88%E6%B3%A2%E5%AE%9D%E9%92%B1%E5%8C%85%EF%BC%89/ibnejdfjmmkpcnlpebklmnkoeoihofec"
              target="_blank"
              class="uppercase"
            >
              {{ $t('install_tronlink') }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  filters: {
    twoDigit: v => (('' + v).length - 1 ? v : `0${v}`)
  },
  data() {
    return {
      hours: '00',
      minutes: '00',
      seconds: '00'
    }
  },
  computed: {
    ...mapState(['tronLinkStatus']),
    ...mapState('stats', [
      'totalWonTRX',
      'totalWonUSDT',
      'airdroppedTotalTRX',
      'airdroppedTotalUSDT',
      'totalStaked',
      'lotteryJackpotTRX',
      'lotteryJackpotUSDT'
    ]),
    ...mapState('user', ['address'])
  },
  created() {
    this.counter()
    this.interval = setInterval(() => this.counter(), 1000)
  },
  methods: {
    /**
     * Create counter
     *
     * @public This is a public method
     */
    counter() {
      // Get today's time and end time
      const today = new Date()
      const timeEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12, 0, 0)
      const timeNow = new Date().getTime()
      const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 12, 0, 0)

      // Find the distance between now and the count down date
      let distance = 0

      if (timeNow > timeEnd.getTime()) {
        distance = Math.floor((tomorrow.getTime() - timeNow) / 1000)
      } else {
        distance = Math.floor((timeEnd.getTime() - timeNow) / 1000)
      }

      // Time calculations for days, hours, minutes and seconds
      const timeSplit = {
        hours: 3600,
        minutes: 60,
        seconds: 1
      }

      Object.keys(timeSplit).map(key => {
        this.$set(this, key, Math.floor(distance / timeSplit[key]))

        distance -= this[key] * timeSplit[key]
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.total-bar {
  font-size: 0.8em;
  background-image: linear-gradient(90deg, #192333 0%, #1f293b 100%);
  .yellow {
    color: #ffcf02;
    &:hover {
      text-shadow: unset;
    }
  }
  .social {
    svg {
      width: 17px;
    }
  }
  .icon-coin {
    width: 20px;
  }
  .icon-clock {
    width: 14px;
  }
}
</style>
