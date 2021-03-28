<template>
  <div :class="`main-content ${chatOpen ? 'chat-open' : 'chat-close'}`">
    <div class="d-flex">
      <div class="main-area">
        <TotalBar />
        <div class="container">
          <div class="py-5">
            <Header />
            <div class="mt-5">
              <div class="row">
                <div class="col-xl-6">
                  <div class="lottery-counter-content p-5">
                    <div class="title d-flex justify-content-between semi-bold">
                      <span v-html="$t('lottery_title')"></span>
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
                    <div class="mt-4">
                      <Counter
                        :date="lotteryTime"
                        :colors="{
                          backgroundColor: '#d90f3a',
                          shadow: '#930020',
                          color: '#FF8AA2'
                        }"
                      />
                    </div>
                    <div class="row mt-5">
                      <div class="col-12 col-md-6">
                        <div
                          class="total-text d-flex flex-column justify-content-center mb-3 pl-5 ml-3"
                        >
                          <div class="icon icon-1">
                            <svg viewBox="0 0 60 48">
                              <use xlink:href="#lottery-1"></use>
                            </svg>
                          </div>
                          <div class="ml-1">
                            <div class="title mb-2">
                              {{ $t('lottery_jackpot') }}
                            </div>
                            <div class="text semi-bold">
                              <div>
                                {{ lotteryJackpotTRX | toFormat0 }}
                                <img
                                  src="~/assets/svg/coin-trx-red.svg"
                                  alt=""
                                  class="icon-coin mr-1"
                                />
                              </div>
                              <div>
                                {{ lotteryJackpotUSDT | toFormat0 }}
                                <img
                                  src="~/assets/svg/coin-usdt-green.svg"
                                  alt="USDT"
                                  class="icon-coin"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-12 col-md-6">
                        <div
                          class="total-text d-flex flex-column justify-content-center mb-3 pl-5 ml-3"
                        >
                          <div class="icon icon-2">
                            <svg viewBox="0 0 48 54">
                              <use xlink:href="#lottery-2"></use>
                            </svg>
                          </div>
                          <div class="ml-1">
                            <div class="title mb-2">
                              {{ $t('weeks_transfered') }}
                            </div>
                            <div class="text semi-bold">
                              {{ transferredWeeks }}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-12 col-md-6">
                        <div
                          class="total-text d-flex flex-column justify-content-center mb-3 pl-5 ml-3"
                        >
                          <div class="icon icon-3">
                            <svg viewBox="0 0 74 71">
                              <use xlink:href="#lottery-3"></use>
                            </svg>
                          </div>
                          <div class="ml-1">
                            <div class="title mb-2">
                              {{ $t('ticket_cost') }}
                            </div>
                            <div class="text semi-bold">
                              {{ ticketCost.toFormat(2) }}
                              <img
                                src="~/assets/images/coin-winr.png"
                                alt=""
                                class="icon-coin ml-2"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-12 col-md-6">
                        <div
                          class="total-text d-flex flex-column justify-content-center mb-3 pl-5 ml-3"
                        >
                          <div class="icon icon-4">
                            <svg viewBox="0 0 59 58">
                              <use xlink:href="#lottery-4"></use>
                            </svg>
                          </div>
                          <div class="ml-1">
                            <div class="title mb-2">
                              {{ $t('total_tickets') }}
                            </div>
                            <div class="text semi-bold">
                              {{ bankroll }}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <b-button
                      variant="yellow"
                      class="btn-xl mt-4 uppercase"
                      size="lg"
                      :disabled="!isSaleAvailable"
                      @click="openModal"
                    >
                      {{ $t('buy_tickets') }}
                    </b-button>
                    <p v-if="!isSaleAvailable" class="mt-2">
                      You can't by the ticket, cause BTC block number was set.
                    </p>
                  </div>
                </div>
                <div class="mt-5 mt-xl-0 col-xl-6">
                  <Profits />
                </div>
              </div>
              <LotteryResults
                v-if="Object.keys(lotteryWinners).length"
                :winner-results="lotteryWinners"
              />
            </div>
            <Footer extra-class="mt-5" />
          </div>
        </div>
      </div>
      <!-- <div class="chat-area d-none d-xl-block">
        <Chat :close-button="true" @chat-toggler="chatToggler" />
      </div> -->
    </div>
    <!--b-button
      class="chat-toggler d-none d-xl-block"
      variant="red"
      @click="chatToggler"
    >
      <svg viewBox="0 0 22 22" class="icon icon-message">
        <use xlink:href="#icon-message"></use>
      </svg>
    </b-button-->
    <LotteryModal
      v-model="modalVisible"
      :ticket-cost="ticketCost"
      @ticketBuy="handleNewTicket"
    />
    <InfoPopup :page="'lottery'" :footer="true" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Axios from 'axios'

import { Counter, Footer, Header, TotalBar, InfoPopup } from '~/components/ui/'

import Profits from '~/components/page/game/lottery/profits'
import LotteryModal from '~/components/page/game/lottery/modal'
import LotteryResults from '~/components/page/game/lottery/lottery-results'
// eslint-disable-next-line no-unused-vars

export default {
  components: {
    // Chat,
    Counter,
    Footer,
    Header,
    LotteryModal,
    Profits,
    TotalBar,
    LotteryResults,
    InfoPopup
  },
  data() {
    return {
      chatOpen: false,
      modalVisible: false,
      transferredWeeks: 0,
      lastDrawAt: 0,
      drawingId: 0,
      bankroll: 0,
      ticketCost: 0,
      lotteryWinrBalance: 0,
      winrContract: {},
      lotteryContract: {},
      lotteryWinners: {},
      showInfo: false,
      isSaleAvailable: true
    }
  },
  computed: {
    ...mapState('tickets', ['tickets', 'myTickets']),
    ...mapState('contracts', ['contractAddr']),
    ...mapState('stats', ['lotteryTime', 'lotteryJackpotTRX', 'lotteryJackpotUSDT'])
  },
  async mounted() {
    this.initLottery()
    while (!window.localWeb) {
      await this.delay(100)
      this.initLottery()
    }
    this.isTicketSaleAvailable()

    // setInterval(() => {
    //   this.getHistory()
    // }, 3000)
  },
  methods: {
    showInfoPopup() {
      this.$bvModal.show('info-popup')
    },
    async initLottery() {
      this.delay(2000)
      if (window.localWeb) {
        const winrContract = await window.localWeb
          .contract()
          .at(this.contractAddr.WINR_ADDR)
        const lotteryContract = await window.localWeb
          .contract()
          .at(this.contractAddr.LOTTERY_ADDR)
        this.$set(this, 'lotteryContract', lotteryContract)
        this.$set(this, 'winrContract', winrContract)

        this.getLotteryResults()

        this.setVars()
      }
    },
    getLotteryResults() {
      Axios.get('/api/lottery/drawn').then(result => {
        this.$set(this, 'lotteryWinners', result.data)
      })
    },
    isTicketSaleAvailable() {
      Axios.get('/api/stats/lottery/').then(result => {
        this.$set(this, 'isSaleAvailable', result.data.isSaleAvailable)
      })
    },
    openModal() {
      this.$set(this, 'modalVisible', true)
    },
    chatToggler() {
      this.$set(this, 'chatOpen', !this.chatOpen)
    },
    async handleNewTicket() {
      this.$set(this, 'modalVisible', false)
      await this.delay(2000)
      this.setVars()
    },
    async setVars() {
      const currentRoundId = Number(
        await this.lotteryContract.currentRoundId().call()
      )
      const details = await this.lotteryContract
        .getRoundById(currentRoundId)
        .call()

      this.$set(this, 'drawingId', Number(currentRoundId))

      // this.getHistory()
      const totalSupply =
        window.localWeb.toDecimal(
          await this.winrContract.totalSupply().call()
        ) / 1e6

      this.$set(this, 'ticketCost', totalSupply / 1000000000)
      this.$set(this, 'bankroll', parseInt(details[1]).toFormat(0))
      const transferredWeeks = await this.lotteryContract
        .transferredWeeks()
        .call()
      this.$set(this, 'transferredWeeks', transferredWeeks)

      const lotteryWinrBalance =
        (await this.winrContract
          .balanceOf(this.contractAddr.LOTTERY_ADDR)
          .call()) / 1e6

      this.$set(this, 'lotteryWinrBalance', lotteryWinrBalance || 0)
    }
    // getHistory() {
    //   const addrHex = window.tronWeb.address.toHex(this.address).substring(2)
    //   const generalEncoded = encodeURIComponent(
    //     '{"drawingId":"' + this.drawingId + '"}'
    //   )
    //   const general =
    //     this.contractAddr.NETWORK +
    //     '/event/contract/' +
    //     this.contractAddr.LOTTERY_ADDR +
    //     '/TicketBuy?size=10&filters=' +
    //     generalEncoded
    //   const userEncoded = encodeURIComponent(
    //     '{"player":"0x' + addrHex + '","drawingId":"' + this.drawingId + '"}'
    //   )
    //   const personal =
    //     this.contractAddr.NETWORK +
    //     '/event/contract/' +
    //     this.contractAddr.LOTTERY_ADDR +
    //     '/TicketBuy?size=10&' +
    //     'filters=' +
    //     userEncoded
    //   Axios.get(general).then(res =>
    //     this.$set(this.history, 'general', res.data)
    //   )
    //   Axios.get(personal).then(res =>
    //     this.$set(this.history, 'personal', res.data)
    //   )
    // }
  }
}
</script>

<style lang="scss" scope>
.lottery-counter-content {
  height: 100%;
  background-image: url(~assets/images/bg.png);
  background-color: #1d2738;
  border-radius: 10px;
  > .title {
    font-size: 2em;
    position: relative;
    .icon {
      width: 26px;
    }
  }
  .total-text {
    background: #293449;
    border-radius: 10px;
    height: 80px;
    position: relative;
    .icon {
      position: absolute;
      background: #2e394e;
      width: 65px;
      height: 65px;
      border-radius: 100%;
      left: -30px;
      top: 50%;
      transform: translateY(-50%);
      box-shadow: 0px 7px 7px 0px rgba(13, 22, 36, 0.4);
      svg {
        position: absolute;
      }
      &.icon-1 {
        svg {
          right: -4px;
          top: 6px;
        }
      }
      &.icon-2 {
        svg {
          right: 6px;
          top: -5px;
          width: 51px;
        }
      }
      &.icon-3 {
        svg {
          width: 80px;
          right: -20px;
          top: -12px;
        }
      }
      &.icon-4 {
        svg {
          width: 70px;
          right: -13px;
          top: -12px;
        }
      }
    }
    .title {
      font-size: 0.8em;
    }
    .text {
      img {
        width: 20px;
      }
    }
  }
}

.btn-question {
  outline: none;
  box-shadow: none !important;
}

.main-content {
  .main-area {
    width: 80%;
    height: 100vh;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
  .chat-area {
    overflow: hidden;
    width: 20%;
  }
  .chat-toggler {
    position: fixed;
    z-index: 109;
    right: 20px;
    bottom: 20px;
    width: 60px;
    height: 60px;
    border-radius: 60px;
    border: 0;
    cursor: pointer;
    svg {
      width: 22px;
      transition: 300ms;
    }
  }
  &.chat-open {
    .chat-toggler {
      display: none !important;
    }
  }
  &.chat-close {
    .main-area {
      width: 100%;
    }
    .chat-area {
      width: 0%;
    }
  }
}

@media (max-width: 1140px) {
  .main-content {
    .main-area {
      width: 100%;
    }
  }
}
</style>
