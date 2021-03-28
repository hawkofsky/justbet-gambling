<template>
  <div class="row">
    <div class="col-12 col-lg-6">
      <div class="counter-content pl-5 pr-5 pb-5 pt-3 pt-xl-5">
        <div class="title">
          <span v-html="$t('lottery_title')"></span>
          <img src="~/assets/images/lottery_tickets2.svg" alt="" />
        </div>
        <div class="mt-4">
          <Counter
            :date="lotteryTime"
            :days="true"
            :colors="{
              backgroundColor: '#d90f3a',
              shadow: '#930020',
              color: '#FF8AA2'
            }"
          />
        </div>
        <div class="row mt-5">
          <div class="col-6">
            <div class="total-text semi-bold">
              <div class="title semi-bold mb-1">
                {{ $t('lottery_jackpot') }}
              </div>
              <div class="text">
                <div>{{ lotteryJackpotTRX | toFormat0 }} <small>TRX</small></div>
                <div>{{ lotteryJackpotUSDT | toFormat0 }} <small>USDT</small></div>
              </div>
            </div>
          </div>
        </div>
        <div class="row mt-5">
          <div class="col-6">
            <div class="total-text semi-bold">
              <div class="title semi-bold mb-1">
                {{ $t('ticket_price') }}
              </div>
              <div class="text">
                {{ ticketPrice.toFormat() }} <small>WINR</small>
              </div>
            </div>
          </div>
        </div>
        <b-button
          variant="white-border"
          class="btn-xl mt-4"
          size="lg"
          @click="redirect('/game/lottery')"
        >
          {{ $t('buy_tickets') }}
        </b-button>
      </div>
    </div>
    <div class="col-12 col-lg-6 mt-5 mt-lg-0">
      <div class="counter-content pl-5 pr-5 pb-5 pt-3 pt-xl-5">
        <div class="title">
          <span v-html="$t('daily_title')"></span>
          <img src="~/assets/images/coins.svg" alt="" />
        </div>
        <div class="mt-4">
          <Counter
            :date="counterDate"
            :colors="{
              backgroundColor: '#ffbb01',
              shadow: '#c86908',
              color: '#CD8103'
            }"
          />
        </div>
        <div class="row mt-5">
          <div class="col-6">
            <div class="total-text semi-bold">
              <div class="title semi-bold mb-1">
                {{ $t('airdropped_all_time') }}
              </div>
              <div class="text">
                {{ airdroppedTotalTRX.toFormat() }} <small>TRX</small>
              </div>
            </div>
          </div>
          <div class="col-6">
            <div class="total-text semi-bold">
              <div class="title semi-bold mb-1">
                {{ $t('current_daily_pool') }}
              </div>
              <div class="text">
                {{ currentDailyPoolTRX.toFormat() }} <small>TRX</small>
              </div>
            </div>
          </div>
        </div>
        <div class="row mt-5">
          <div class="col-6">
            <div class="total-text semi-bold">
              <div class="title semi-bold mb-1">
                {{ $t('airdropped_all_time') }}
              </div>
              <div class="text">
                {{ airdroppedTotalUSDT.toFormat() }} <small>USDT</small>
              </div>
            </div>
          </div>
          <div class="col-6">
            <div class="total-text semi-bold">
              <div class="title semi-bold mb-1">
                {{ $t('current_daily_pool') }}
              </div>
              <div class="text">
                {{ currentDailyPoolUSDT.toFormat() }} <small>USDT</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Counter } from '~/components/ui/'
import { mapState } from 'vuex'

export default {
  components: {
    Counter
  },
  data() {
    return {
      counterDate: 0,
      usdtJackpot: 0
    }
  },
  computed: {
    ...mapState('stats', [
      'airdroppedTotalTRX',
      'airdroppedTotalUSDT',
      'currentDailyPoolTRX',
      'currentDailyPoolUSDT',
      'lotteryJackpotTRX',
      'lotteryJackpotUSDT',
      'lotteryTime',
      'totalSupply'
    ]),
    ticketPrice() {
      return this.totalSupply / 1000000000
    }
  },
  mounted() {
    const today = new Date()
    const timeEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12, 0, 0)
    const timeNow = new Date().getTime()
    const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 12, 0, 0)

    if (timeNow > timeEnd.getTime()) {
      this.counterDate = tomorrow.getTime() / 1000
    } else {
      this.counterDate = timeEnd.getTime() / 1000
    }
  }
}
</script>

<style lang="scss" scoped>
.counter-content {
  height: 100%;
  background-image: url(~assets/images/bg.png);
  background-color: #1d2738;
  border-radius: 10px;
  > .title {
    font-size: 2em;
    position: relative;
    img {
      position: absolute;
      right: -0.8em;
      top: -70px;
    }
  }
  .total-text {
    .title {
      color: #68758c;
      letter-spacing: 1;
      font-size: 0.8em;
    }
    .text {
      font-size: 1.333em;
    }
  }
}
@media (max-width: 992px) {
  .counter-content {
    > .title {
      img {
        top: -40px;
      }
    }
  }
}
</style>
