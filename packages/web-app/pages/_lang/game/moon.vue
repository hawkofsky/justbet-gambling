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
                <div class="col-xl-8">
                  <GameContent extra-class="moon-game">
                    <template slot="header">
                      <GameTitle active-game="moon">
                        <svg viewBox="0 0 18 20" class="icon mr-3">
                          <use xlink:href="#icon-moon-game"></use>
                        </svg>
                        <span class="d-block">
                          {{ $t('moon_game') }}
                        </span>
                      </GameTitle>
                      <!--<div class="status mt-3 mt-xl-0">
                        <span class="grey mr-1 uppercase">
                          {{ $t('online') }}
                        </span>
                        880
                      </div>-->
                      <div class="d-flex mt-3 mt-md-0">
                        <div class="d-flex align-items-center mr-3">
                          <span
                            :style="{ opacity: playUSDT ? 0.5 : 1 }"
                            class="mr-2"
                          >
                            Use TRX
                          </span>
                          <b-form-checkbox v-model="playUSDT" switch>
                          </b-form-checkbox>
                          <span
                            :style="{ opacity: !playUSDT ? 0.5 : 1 }"
                            class="mr-3"
                          >
                            Use USDT
                          </span>

                          <span class="grey mr-2 uppercase">
                            {{ $t('address') }}:
                          </span>
                          {{ shortAddr(address) }}
                          <span class="grey ml-3 uppercase">
                            Game Edge: <span style="color: white">?</span>
                          </span>
                        </div>
                        <Balance
                          ref="Balance"
                          :key="balance"
                          :balance-trx="balance"
                          :balance-winr="balance"
                        />
                        <!--Hint class-name="pl-3" /-->
                      </div>
                    </template>
                    <template slot="context">
                      <!-- <Moon /> -->
                      <div
                        class="game-area d-flex flex-column align-items-center"
                      >
                        <div
                          class="small-text max-bet-numbers mb-4 mb-md-0 d-flex flex-column flex-md-row"
                        >
                          <div
                            class="max-bet-number d-flex align-items-center justify-content-center mr-2"
                          >
                            <span class="grey mr-2">
                              {{ $t('max_bet') }}:
                            </span>
                            44.3
                            <img
                              src="~/assets/images/coin-winr.png"
                              class="ml-2"
                              alt=""
                            />
                          </div>
                          <div
                            class="max-bet-number green d-flex align-items-center justify-content-center mt-2 mt-md-0"
                          >
                            <span class="grey mr-2">
                              {{ $t('max_profit') }}:
                            </span>
                            44.3
                            <img
                              src="~/assets/images/coin-winr.png"
                              class="ml-2"
                              alt=""
                            />
                          </div>
                        </div>
                        <div
                          class="small-text rate-numbers mb-4 mb-md-0 d-flex flex-column flex-md-row"
                        >
                          <div
                            class="rate-number d-flex align-items-center justify-content-center ml-2"
                          >
                            <svg
                              viewBox="0 0 9 11"
                              class="icon icon-arrow-down mr-2"
                            >
                              <use xlink:href="#icon-arrow-down"></use>
                            </svg>
                            1.12x
                          </div>
                          <div
                            class="rate-number green d-flex align-items-center justify-content-center ml-2 mt-2 mt-md-0"
                          >
                            <svg
                              viewBox="0 0 9 11"
                              class="icon icon-arrow-up mr-2"
                            >
                              <use xlink:href="#icon-arrow-up"></use>
                            </svg>
                            2x
                          </div>
                        </div>
                        <Game ref="game" />
                        <div class="moon-game-content w-100">
                          <div class="row">
                            <div class="col-6 col-lg-6">
                              <label class="small-text">
                                {{ $t('bet') }}:
                              </label>
                              <Input
                                v-model="value"
                                :max="balance"
                                :icon-image="
                                  require('~/assets/svg/coin-trx-red.svg')
                                "
                              />
                            </div>
                            <div class="col-6 col-lg-6">
                              <label class="small-text">
                                {{ $t('multiplier') }}:
                              </label>
                              <Input
                                v-model="value2"
                                :min="1.01"
                                :max="9999"
                                icon-image=""
                              />
                            </div>
                            <div class="col-12">
                              <div
                                class="row justify-content-between align-items-center mt-4 mb-4"
                              >
                                <div class="col-6 col-md-3">
                                  <Switcher
                                    v-model="switcherValue"
                                    :label="`${$t('auto')}:`"
                                  />
                                </div>
                                <div class="col-6 col-md-3">
                                  <b-button
                                    v-if="buttonActive"
                                    :disabled="buttonDisabled"
                                    class="w-100 semi-bold uppercase"
                                    size="lg"
                                    variant="yellow"
                                    @click="handleStop"
                                  >
                                    {{ $t('stop') }}
                                  </b-button>
                                  <b-button
                                    v-else
                                    :disabled="buttonDisabled"
                                    class="w-100 semi-bold uppercase"
                                    size="lg"
                                    variant="grey"
                                    @click="handleBet"
                                  >
                                    {{ $t('bet') }}
                                  </b-button>
                                </div>
                                <div class="col-3"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </template>
                  </GameContent>
                  <div class="d-block d-xl-none mt-5">
                    <Profits ref="profits" @userBetChanged="userHasBet" />
                  </div>
                  <div class="d-block d-xl-none mt-5">
                    <Chat />
                  </div>
                </div>
                <div class="d-none d-xl-block col-4">
                  <Profits ref="profits" @userBetChanged="userHasBet" />
                </div>
              </div>
            </div>
            <div class="mt-5">
              <Stats />
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
  </div>
</template>

<script>
import {
  Balance,
  Chat,
  Footer,
  GameContent,
  GameTitle,
  Header,
  Hint,
  Input,
  Stats,
  Switcher,
  TotalBar
} from '~/components/ui/'
import Profits from '~/components/page/game/moon/profits'
// import Moon from '~/components/page/game/moon/moon'
import Game from '~/components/page/game/moon/game'

/* eslint-disable */

export default {
  components: {
    Balance,
    Chat,
    Footer,
    GameContent,
    GameTitle,
    Header,
    Hint,
    Profits,
    Stats,
    Switcher,
    TotalBar,
    Input,
    // Moon,
    Game
  },
  data() {
    return {
      chatOpen: false,
      value: 10,
      value2: 2,
      switcherValue: false,
      buttonActive: false,
      running: false,
      started: false,
      btnText: 'bet',
      buttonDisabled: true,
      lastRun: 0,
      userHasBet: false,
      userStopAt: 0,
      activeRound: {},
      asking: false,
      val: 100,
      bets: [],
      multiplier: {
        val: 100,
        i: 0,
        inter: -1,
        intervalID: -1
      },
      currentServer: 0,
      playUSDT: false
    }
  },
  computed: {
    ...mapState('user', ['address']),
    ...mapState('contracts', ['contractAddr'])
  },
  mounted() {
    // eslint-disable-next-line
    console.log(this.$socket)
    //this.$socket.emit('activeRound', { a: true })
    let i = 0
    const intr = setInterval(async () => {
      if (window.tronWeb !== null) {
        window.moonContract = await window.tronWeb
          .contract()
          .at(this.contractAddr.MOON_ADDR)
        clearInterval(intr)
      } else if (i > 6) {
        window.moonContract = await window.localWeb
          .contract()
          .at(this.contractAddr.MOON_ADDR)
        clearInterval(intr)
      }
      i++
    }, 500)
  },
  watch: {
    userHasBet() {
      this.$set(this, 'buttonDisabled', this.userHasBet)
    },
    "multiplier.inter": function() {
      clearInterval(this.multiplier.intervalID)
      const intr = setInterval(() => {
        this.$refs.game.setScore(
          this.calcMultiplierFromTime(this.multiplier.val),
          'up'
        )
      }, this.multiplier.inter)
      this.$set(this.multiplier, 'intervalID', intr)
    }
  },
  sockets: {
    connection: () => {
      //this.$socket.emit('activeRound', true)
    },
    engineStart: function(data) {
      this.activeRound = data
      this.reset()
      this.$refs.profits.reset()
      this.$refs.game.refresh()
      this.start(data)
    },
    running(val) {
      let inter
      if (val <= 200) inter = 100
      else if (val <= 250) inter = 75
      else if (val <= 300) inter = 50
      else if (val <= 400) inter = 40
      else if (val <= 500) inter = 35
      else if (val <= 600) inter = 30
      else if (val <= 800) inter = 25
      else if (val <= 1000) inter = 20
      else if (val <= 1500) inter = 15
      else if (val <= 2000) inter = 10
      else if (val <= 3000) inter = 9
      else if (val <= 4000) inter = 8
      else if (val <= 5500) inter = 7
      else if (val <= 7000) inter = 6
      else if (val <= 9500) inter = 5
      else if (val <= 11500) inter = 4
      else if (val <= 14000) inter = 3
      else if (val <= 20000) inter = 2
      else inter = 1
      // const lr = this.lastRun
      if (inter !== this.inter) this.$set(this.multiplier, 'inter', inter)
      this.$set(this.multiplier, 'val', val)
      this.$set(this, 'buttonActive', true)
      this.$set(this, 'btnText', 'stop')
      if (!this.running) {
        if (this.userHasBet) this.$set(this, 'buttonDisabled', false)
        // this.val = data - this.activeRound.beginAt * 1000
        this.$refs.game.refresh()
        this.$set(this, 'running', true)
        this.$refs.game.fly()
      }
      // if (this.userHasBet && this.userStopAt > 0) {
      //   // eslint-disable-next-line
      //   console.log(this.userStopAt, data)
      //   if (this.userStopAt <= data) {
      //     this.handleStop()
      //     this.$set(this, 'userHasBet', false)
      //   }
      // }
    },
    endRound(data) {
      // eslint-disable-next-line
      this.$refs.game.setScore((data.result / 100).toFixed(2), 'up')
      this.$refs.game.crash()
      this.reset()
      this.$set(this.multiplier, 'inter', -1)
      this.$refs.game.setScore((data.result / 100).toFixed(2), 'up')
    },
    playerIn(data) {
      // eslint-disable-next-line
      // console.log("hi", data)
      this.$set(this, 'userStopAt', data.autoOutAt)
    }
  },
  methods: {
    start(data) {
      this.$set(this, 'running', false)
      this.$set(this, 'userHasBet', false)
      this.$refs.game.refresh()
      const willStart = data.wagerStartAt + 20
      const intr = setInterval(() => {
        // eslint-disable-next-line
        let now = new Date().getTime()
        if (data.wagerStartAt * 1000 > now) {
          this.$set(this, 'btnText', 'bet')
          this.$set(this, 'buttonDisabled', true)
          this.$refs.profits.reset()
          this.$refs.game.waitFor()
        } else if (data.wagerStartAt * 1000 <= now && now < willStart * 1000) {
          this.$refs.game.startTimer(Math.floor(willStart - now / 1000))
          this.$set(this, 'buttonDisabled', false)
        } else if (willStart * 1000 <= now && now <= data.beginAt * 1000) {
          if (!this.userHasBet && this.switcherValue && !this.asking) {
            this.handleBet()
          }
          this.$refs.game.waitFor()
          this.$refs.profits.reset()
          this.$set(this, 'buttonActive', true)
          this.$set(this, 'buttonDisabled', true)
        } else if (data.beginAt * 1000 <= now) {
          this.$set(this, 'buttonActive', true)
          this.$set(this, 'lastRun', now)
          // this.calc2()
          // this.$refs.game.refresh()
          clearInterval(intr)
        }
      }, 100)
    },
    calcMultiplierFromTime(duration) {
      let inter;
      let val = 100
      let i = 0
      let passedTime = 0
      while (true) {
        if (val <= 200) inter = 100
        else if (val <= 250) inter = 75
        else if (val <= 300) inter = 50
        else if (val <= 400) inter = 40
        else if (val <= 500) inter = 35
        else if (val <= 600) inter = 30
        else if (val <= 800) inter = 25
        else if (val <= 1000) inter = 20
        else if (val <= 1500) inter = 15
        else if (val <= 2000) inter = 10
        else if (val <= 3000) inter = 9
        else if (val <= 4000) inter = 8
        else if (val <= 5500) inter = 7
        else if (val <= 7000) inter = 6
        else if (val <= 9500) inter = 5
        else if (val <= 11500) inter = 4
        else if (val <= 14000) inter = 3
        else if (val <= 20000) inter = 2
        else inter = 1
        passedTime += inter
        if (val >= 999999) {
            break
        }
        if (duration <= passedTime) {
            break
        }
        i++
        val++
      }
      // console.log(duration, passedTime, val, inter)
      return (val / 100).toFixed(2)
    },
    calc2() {
      if (this.running)
        this.$refs.game.setScore(
          this.calcMultiplierFromTime(
            this.lastRun - this.activeRound.beginAt * 1000
          ),
          'up'
        )
    },
    calcMultiplier(val = 100) {
      let inter
      if (val <= 160) inter = 50
      if (val <= 227) inter = 45
      if (val <= 302) inter = 40
      if (val <= 388) inter = 35
      if (val <= 488) inter = 30
      if (val <= 608) inter = 25
      if (val <= 758) inter = 20
      if (val <= 958) inter = 15
      if (val <= 1958) inter = 10
      if (val <= 3070) inter = 9
      if (val <= 4320) inter = 8
      if (val <= 5749) inter = 7
      if (val <= 7416) inter = 6
      if (val <= 9416) inter = 5
      if (val <= 11916) inter = 4
      if (val <= 15250) inter = 3
      if (val <= 20250) inter = 2
      if (val <= 30250) inter = 1
      setTimeout(() => {
        val++
        if (this.running) {
          this.$refs.game.setScore((val / 100).toFixed(2), 'up')
          this.calcMultiplier(val)
        }
      }, inter)
    },
    getActiveRound() {
      this.$socket.emit('activeRound', { a: true })
    },
    chatToggler() {
      this.$set(this, 'chatOpen', !this.chatOpen)
    },
    handleBet() {
      if (this.loggedIn && !this.userHasBet && window.routerContract) {
        this.$set(this, 'asking', true)
        const val = this.value
        const mul = this.value2 * 100
        this.$set(this, 'userHasBet', true)
        window.routerContract
          .multiplayerBet(this.contractAddr.MOON_ADDR, mul, new Date().getTime())
          .send({
            callValue: parseInt(val * 1000000)
          })
          .then(tx => {
            this.$refs.profits.addBet(val, mul, this.shortAddr(this.address))
          })
          // eslint-disable-next-line
          .catch(() => {
            this.$set(this, 'userHasBet', false)
          })
          .finally(() => {
            this.$set(this, 'asking', false)
          })
      }
    },
    handleStop() {
      this.$set(this, 'buttonActive', false)
      this.$set(this, 'buttonDisabled', true)
      if (!this.userHasBet || this.userStopAt === 0) {
        return
      }
      // eslint-disable-next-line
      console.log('playerOut', this.address)
      //this.$socket.emit('playerOut', this.address)
    },
    reset() {
      this.$set(this, 'userHasBet', false)
      this.$set(this, 'userStopAt', 0)
      this.$set(this, 'running', false)
      this.$set(this, 'asking', false)
      this.$set(this, 'buttonActive', false)
      this.$set(this, 'buttonDisabled', true)
      this.$set(this, 'lastRun', 0)
      this.$set(this, 'val', 0)
      this.$set(this, 'started', false)
      this.$set(this, 'val', 100)
    },
    userBetChanged(data) {
      this.$set(this, 'userHasBet', false)
    }
  }
}
</script>

<style lang="scss" scope>
.game-content.moon-game {
  z-index: 2;
  .context {
    position: relative;
    background-image: url(~assets/images/moon-game/forest.png);
    background-repeat: no-repeat;
    background-position: center bottom;
    background-size: 100% auto;
    overflow: hidden;
    .game-area {
      position: relative;
      .rate-numbers {
        position: absolute;
        right: 0;
        top: 0;
        .rate-number {
          width: 64px;
          border-radius: 3px;
          background: #283346;
          line-height: 1.2em;
          padding: 4px 10px;
          svg {
            width: 8px;
            fill: #68758c;
          }
          &.green {
            background: #37dd4a;
            svg {
              fill: #fff;
            }
          }
        }
      }
      .max-bet-numbers {
        position: absolute;
        left: 0;
        top: 0;
        img {
          width: 25px;
        }
      }
      .coin-content {
        &:after {
          content: '';
          display: block;
          width: 50%;
          height: 10px;
          background: #0a0f18;
          margin: 30px 0 0 25%;
          border-radius: 100%;
        }
      }
      .moon-game-content {
        color: #68758c;
        z-index: 3;
      }
    }
  }
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
