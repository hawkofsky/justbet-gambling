<template>
  <div class="grey-content p-5">
    <div class="d-flex justify-content-between">
      <h3 class="pb-3">{{ $t('progress') }}</h3>
      <b-button
        variant="transparent"
        class="py-0 btn-question"
        @click="showInfoPopup"
      >
        <svg viewBox="0 0 612 612" class="icon icon-question">
          <use xlink:href="#icon-question"></use>
        </svg>
      </b-button>
    </div>
    <div class="pt-4 pb-5">
      <Progress v-model="totalMined" :percent="progressBarPercent" />
    </div>
    <div class="row mt-5">
      <div class="col-12 col-xl-6">
        <div
          class="total-text d-flex flex-column justify-content-center mb-5 pl-5 ml-3"
        >
          <div class="icon icon-2">
            <img src="~/assets/svg/coin-trx-red.svg" alt="" class="icon-coin" />
          </div>

          <div class="title mb-1 uppercase">
            {{ $t('efficiency_of_yesterday') }}
          </div>
          <div class="text">
            <span class="grey">
              1 TRX:
            </span>
            {{ efficiencyYesterdayTRX.toFixed(0) }} WINR
          </div>
        </div>
        <div
          class="total-text d-flex flex-column justify-content-center mb-5 pl-5 ml-3"
        >
          <div class="icon icon-2">
            <img
              src="~/assets/svg/coin-usdt-green.svg"
              alt=""
              class="icon-coin"
            />
          </div>

          <div class="title mb-1 uppercase">
            {{ $t('efficiency_of_yesterday') }}
          </div>
          <div class="text">
            <span class="grey">
              1 USDT:
            </span>
            {{ efficiencyYesterdayUSDT.toFixed(0) }} WINR
          </div>
        </div>
      </div>
      <div class="col-12 col-xl-6">
        <div
          class="total-text d-flex flex-column justify-content-center pl-5 ml-3 mb-5"
        >
          <div class="icon icon-2">
            <img
              src="~/assets/svg/coin-trx-red.svg"
              alt=""
              class="icon-coin"
            />
          </div>
          <div class="title mb-1 uppercase">
            {{ $t('efficiency_of_all_time') }}
          </div>
          <div class="text">
            <span class="grey">
              1 TRX:
            </span>
            {{ efficiencyAllTRX.toFixed(0) }} WINR
          </div>
        </div>
        <div
          class="total-text d-flex flex-column justify-content-center pl-5 ml-3"
        >
          <div class="icon icon-2">
            <img
              src="~/assets/svg/coin-usdt-green.svg"
              alt=""
              class="icon-coin"
            />
          </div>
          <div class="title mb-1 uppercase">
            {{ $t('efficiency_of_all_time') }}
          </div>
          <div class="text">
            <span class="grey">
              1 USDT:
            </span>
            {{ efficiencyAllUSDT.toFixed(0) }} WINR
          </div>
        </div>
      </div>

      <div class="col-12 col-xl-6 mt-5 mt-xl-0">
        <div
          class="total-text d-flex flex-column justify-content-center mb-5 pl-5 ml-3"
        >
          <div class="icon icon-2">
            <img src="~/assets/images/coin-winr.png" alt="" class="icon-coin" />
          </div>
          <div class="title mb-1 uppercase">
            {{ $t('efficiency_of_winr_staking_yesterday') }}
          </div>
          <div class="text">
            <span class="yellow">
              1000 WINR:
            </span>
            {{ efficiencyYesterdayWINRofTRX.toFixed(0) }} TRX {{ efficiencyYesterdayWINRofUSDT.toFixed(0) }} USDT
          </div>
        </div>
      </div>
      <div class="col-12 col-xl-6 mt-5 mt-xl-0">
        <div
          class="total-text d-flex flex-column justify-content-center pl-5 ml-3"
        >
          <div class="icon icon-2">
            <img src="~/assets/images/coin-winr.png" alt="" class="icon-coin" />
          </div>
          <div class="title mb-1">
            {{ $t('efficiency_of_winr_staking_all_time') }}
          </div>
          <div class="text">
            <span class="yellow">
              1000 WINR:
            </span>
            {{ efficiencyAllWINRofTRX.toFixed(0) }} TRX {{ efficiencyAllWINRofUSDT.toFixed(0) }} USDT
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import { Progress } from '~/components/ui/'

export default {
  components: { Progress },
  props: {
    totalMined: {
      type: Number,
      default: 2
    }
  },
  data() {
    return {
      maxSupply: 6 * 1e9 // 33 * 1e9 * 1e6
    }
  },
  computed: {
    ...mapState('mining', [
      'efficiencyYesterdayWINRofTRX',
      'efficiencyYesterdayWINRofUSDT',
      'efficiencyAllWINRofTRX',
      'efficiencyAllWINRofUSDT',
      'efficiencyYesterdayTRX',
      'efficiencyYesterdayUSDT',
      'efficiencyAllTRX',
      'efficiencyAllUSDT'
    ]),
    progressBarPercent() {
      return (100 * this.totalMined ) / this.maxSupply
    }
  },
  methods: {
    showInfoPopup() {
      this.$bvModal.show('info-popup')
    }
  }
}
</script>

<style lang="scss" scoped>
.grey-content {
  background-image: url(~assets/images/mining-bg.png);
  background-repeat: no-repeat;
  background-color: #1d2738;
  background-position: bottom left;
  background-size: 100% auto;
  border-radius: 10px;
  height: 100%;
  .total-text {
    background: #293449;
    border-radius: 10px;
    height: 80px;
    position: relative;
    text-transform: uppercase;
    .icon {
      position: absolute;
      background: #2e394e;
      width: 50px;
      height: 50px;
      border-radius: 100%;
      left: -25px;
      top: -25px;
      box-shadow: 0px 7px 7px 0px rgba(13, 22, 36, 0.4);
      img {
        width: 30px;
        height: 30px;
        margin: 10px;
      }
    }
    .title {
      font-size: 0.8em;
    }
    .text {
      font-size: 1em;
      .grey {
        color: #9aa2b2;
      }
      .yellow {
        color: #ffcf01;
      }
    }
  }
}
</style>
