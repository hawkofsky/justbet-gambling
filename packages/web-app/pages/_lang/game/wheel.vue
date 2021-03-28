<template>
  <!-- eslint-disable -->
  <div :class="`main-content ${chatOpen ? 'chat-open' : 'chat-close'}`">
    <div class="d-flex">
      <div class="main-area">
        <TotalBar />
        <div class="container">
          <div class="py-5">
            <Header />
            <div class="mt-5">
              <div class="row">
                <div class="col-12">
                  <GameContent extra-class="wheel-game">
                    <template slot="header">
                      <GameTitle active-game="wheel">
                        <svg viewBox="0 0 20 20" class="icon mr-3">
                          <use xlink:href="#icon-wheel-game"></use>
                        </svg>
                        <span class="d-block">
                          {{ $t('wheel_game') }}
                        </span>
                      </GameTitle>
                      <div class="d-flex mt-3 mt-md-0">
                        <div class="d-flex align-items-center mr-3">
                          <span :style="{ opacity: playUSDT ? 0.5 : 1}" class="mr-2">Use TRX</span>
                          <b-form-checkbox v-model="playUSDT" switch></b-form-checkbox>
                          <span :style="{ opacity: !playUSDT ? 0.5 : 1}" class="mr-3">Use USDT</span>

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
                      <img
                        src="~/assets/images/coin-flip/coins.png"
                        class="coins-bg"
                        alt=""
                      />
                      <div
                        class="game-area d-flex flex-column align-items-center"
                      >
                        <div
                          class="rate-numbers mb-4 mb-md-0 d-flex small-text"
                        >
                          <div
                            :class="`rate-number d-flex align-items-center justify-content-center ml-:2`"
                            :style="`background-color: ${item.color}; margin-left: 10px;`"
                            v-for="(item, key) in lastBets"
                            :key="key"
                          >&nbsp;</div> 
                        </div>
                        <div class="wheel-game-content w-100">
                          <div class="d-flex justify-content-center mb-4">
                            <Wheel @timeOver='timeOver' ref="wheel" />
                          </div>
                          <div class="row">
                            <div class="col-12 ">
                              <h6 class="mb-2 fixed-height">
                                {{ $t('bet_amount') }}
                              </h6>
                            </div>
                            <div class="col-12 col-lg-3">
                              <Input v-model="value" />
                            </div>
                            <div class="col-12 mt-4 mt-lg-0 col-lg-5">
                              <InputMultiplier
                                :options="[
                                  { value: 0, title: 'X2' },
                                  { value: 1, title: '1/2' },
                                  { value: 2, title: 'Min' },
                                  { value: 3, title: 'Max' }
                                ]"
                                @inputMultiplied="handleMultiplied"
                              />
                            </div>
                            <div class="col-12 mt-4 mt-lg-0 col-lg-4">
                              <b-button
                                class="w-100 semi-bold uppercase"
                                size="lg"
                                variant="yellow"
                                :disabled="buttonStatus"
                                style="background: transparent; color: white; font-size: 1rem; padding: 0;"
                              >
                                
                                  {{ $t('choose_a_color_below') }}
                                
                              </b-button>
                            </div>
                          </div>
                          <div class="rates mt-3">
                            <div class="row">
                              <div class="col-12 col-md-6 col-lg-3">
                                <div class="rate-content mt-4">
                                  <div
                                    :class="{'title d-flex justify-content-center align-items-center py-3': true, selected: userTemp[0].length > 0}"
                                    @click="bet(0)"
                                  >
                                    <svg
                                      viewBox="0 0 9 11"
                                      class="icon icon-arrow-up mr-3"
                                    >
                                      <use xlink:href="#icon-arrow-up"></use>
                                    </svg>
                                    2x
                                  </div>
                                  <div class="rate-table">
                                    <div
                                      class="rate-table-header d-flex justify-content-between align-items-center py-3 mb-2"
                                    >
                                      <span
                                        class="grey d-flex align-items-center"
                                      >
                                        <svg
                                          viewBox="0 0 21 15"
                                          class="icon icon-users mr-3"
                                        >
                                          <use xlink:href="#icon-users"></use>
                                        </svg>
                                        {{ betCount(0) }}
                                      </span>
                                      <span
                                        class="grey d-flex justify-content-between align-items-center"
                                      >
                                        <img
                                          class="icon-coin mr-2"
                                          src="~/assets/svg/coin-trx-red.svg"
                                          alt=""
                                        />
                                        {{ bets[0].totalWager }}
                                      </span>
                                    </div>
                                    <div
                                      v-for="(bet, index) in userTemp[0]"
                                      :key="index"
                                      class="rate-table-row d-flex justify-content-between align-items-center py-2"
                                    >
                                      <span>{{ shortAddr(address) }}</span>
                                      <span class="grey">{{ bet.wager }}</span>
                                    </div>
                                    <div
                                      v-for="(user, index) in bets[0].users"
                                      :key="index"
                                      class="rate-table-row d-flex justify-content-between align-items-center py-2"
                                    >
                                      <span>{{
                                        shortAddr(base58Addr(user))
                                      }}</span>
                                      <span class="grey">{{
                                        bets[0].wagers[index]
                                      }}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="col-12 col-md-6 col-lg-3">
                                <div class="rate-content color-green mt-4">
                                  <div
                                    :class="{'title d-flex justify-content-center align-items-center py-3': true, selected: userTemp[1].length > 0}"
                                    @click="bet(1)"
                                  >
                                    <svg
                                      viewBox="0 0 9 11"
                                      class="icon icon-arrow-up mr-3"
                                    >
                                      <use xlink:href="#icon-arrow-up"></use>
                                    </svg>
                                    3x
                                  </div>
                                  <div class="rate-table">
                                    <div
                                      class="rate-table-header d-flex justify-content-between align-items-center py-3 mb-2"
                                    >
                                      <span
                                        class="grey d-flex align-items-center"
                                      >
                                        <svg
                                          viewBox="0 0 21 15"
                                          class="icon icon-users mr-3"
                                        >
                                          <use xlink:href="#icon-users"></use>
                                        </svg>
                                        {{ betCount(1) }}
                                      </span>
                                      <span
                                        class="grey d-flex justify-content-between align-items-center"
                                      >
                                        <img
                                          class="icon-coin mr-2"
                                          src="~/assets/svg/coin-trx-red.svg"
                                          alt=""
                                        />
                                        {{ bets[1].totalWager }}
                                      </span>
                                    </div>
                                    <div
                                      v-for="(bet, index) in userTemp[1]"
                                      :key="index"
                                      class="rate-table-row d-flex justify-content-between align-items-center py-2"
                                    >
                                      <span>{{ shortAddr(address) }}</span>
                                      <span class="grey">{{ bet.wager }}</span>
                                    </div>
                                    <div
                                      v-for="(user, index) in bets[1].users"
                                      :key="index"
                                      class="rate-table-row d-flex justify-content-between align-items-center py-2"
                                    >
                                      <span>{{
                                        shortAddr(base58Addr(user))
                                      }}</span>
                                      <span class="grey">{{
                                        bets[1].wagers[index]
                                      }}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="col-12 col-md-6 col-lg-3">
                                <div class="rate-content color-red mt-4">
                                  <div
                                    :class="{'title d-flex justify-content-center align-items-center py-3': true, selected: userTemp[2].length > 0}"
                                    @click="bet(2)"
                                  >
                                    <svg
                                      viewBox="0 0 9 11"
                                      class="icon icon-arrow-up mr-3"
                                    >
                                      <use xlink:href="#icon-arrow-up"></use>
                                    </svg>
                                    5x
                                  </div>
                                  <div class="rate-table">
                                    <div
                                      class="rate-table-header d-flex justify-content-between align-items-center py-3 mb-2"
                                    >
                                      <span
                                        class="grey d-flex align-items-center"
                                      >
                                        <svg
                                          viewBox="0 0 21 15"
                                          class="icon icon-users mr-3"
                                        >
                                          <use xlink:href="#icon-users"></use>
                                        </svg>
                                        {{ betCount(2) }}
                                      </span>
                                      <span
                                        class="grey d-flex justify-content-between align-items-center"
                                      >
                                        <img
                                          class="icon-coin mr-2"
                                          src="~/assets/svg/coin-trx-red.svg"
                                          alt=""
                                        />
                                        {{ bets[2].totalWager }}
                                      </span>
                                    </div>
                                    <div
                                      v-for="(bet, index) in userTemp[2]"
                                      :key="index"
                                      class="rate-table-row d-flex justify-content-between align-items-center py-2"
                                    >
                                      <span>{{ shortAddr(address) }}</span>
                                      <span class="grey">{{ bet.wager }}</span>
                                    </div>
                                    <div
                                      v-for="(user, index) in bets[2].users"
                                      :key="index"
                                      class="rate-table-row d-flex justify-content-between align-items-center py-2"
                                    >
                                      <span>{{
                                        shortAddr(base58Addr(user))
                                      }}</span>
                                      <span class="grey">{{
                                        bets[2].wagers[index]
                                      }}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="col-12 col-md-6 col-lg-3">
                                <div class="rate-content color-blue mt-4">
                                  <div
                                    :class="{'title d-flex justify-content-center align-items-center py-3': true, selected: userTemp[3].length > 0}"
                                    @click="bet(3)"
                                  >
                                    <svg
                                      viewBox="0 0 9 11"
                                      class="icon icon-arrow-up mr-3"
                                    >
                                      <use xlink:href="#icon-arrow-up"></use>
                                    </svg>
                                    50x
                                  </div>
                                  <div class="rate-table">
                                    <div
                                      class="rate-table-header d-flex justify-content-between align-items-center py-3 mb-2"
                                    >
                                      <span
                                        class="grey d-flex align-items-center"
                                      >
                                        <svg
                                          viewBox="0 0 21 15"
                                          class="icon icon-users mr-3"
                                        >
                                          <use xlink:href="#icon-users"></use>
                                        </svg>
                                        {{ betCount(3) }}
                                      </span>
                                      <span
                                        class="grey d-flex justify-content-between align-items-center"
                                      >
                                        <img
                                          class="icon-coin mr-2"
                                          src="~/assets/svg/coin-trx-red.svg"
                                          alt=""
                                        />
                                        {{ bets[3].totalWager }}
                                      </span>
                                    </div>
                                    <div
                                      v-for="(bet, index) in userTemp[3]"
                                      :key="index"
                                      class="rate-table-row d-flex justify-content-between align-items-center py-2"
                                    >
                                      <span>{{ shortAddr(address) }}</span>
                                      <span class="grey">{{ bet.wager }}</span>
                                    </div>
                                    <div
                                      v-for="(user, index) in bets[3].users"
                                      :key="index"
                                      class="rate-table-row d-flex justify-content-between align-items-center py-2"
                                    >
                                      <span>{{
                                        shortAddr(base58Addr(user))
                                      }}</span>
                                      <span class="grey">{{
                                        bets[3].wagers[index]
                                      }}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </template>
                  </GameContent>
                  <div class="d-block d-xl-none mt-5">
                    <Chat />
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-5">
              <Stats hot-winners="false"/>
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
  // Hint,
  Header,
  Input,
  InputMultiplier,
  Stats,
  TotalBar
} from '~/components/ui/'
import Wheel from '~/components/page/game/wheel'
import { mapState } from 'vuex'

export default {
  components: {
    Balance,
    Chat,
    Footer,
    GameContent,
    GameTitle,
    Header,
    // Hint,
    Stats,
    TotalBar,
    InputMultiplier,
    Input,
    Wheel
  },
  data() {
    return {
      lastBets: [],
      chatOpen: false,
      value: 10,
      playable: true,
      nextGameAt: 0,
      delay: 20,
      winner: 0,
      userTemp: [[], [], [], []],
      mExecuted: false,
      bets: [
        {
          users: [],
          wagers: [],
          totalWager: 0
        },
        {
          users: [],
          wagers: [],
          totalWager: 0
        },
        {
          users: [],
          wagers: [],
          totalWager: 0
        },
        {
          users: [],
          wagers: [],
          totalWager: 0
        }
      ],
      playUSDT: false
    }
  },
  computed: {
    ...mapState('user', ['address']),
    ...mapState('contracts', ['contractAddr']),
    buttonStatus() {
      // console.log(typeof window)
      // if (typeof window !== 'undefined') return false
      // if (!window.tronWeb || !window.wheelContract) return false
      // if (!this.playable) return false
      return true
    }
  },
  watch: {
    winner() {
      this.cleanUp()
      // eslint-disable-next-line
      console.log('WIN')
    },
    nextGameAt() {
      const now = new Date().getTime()
      if (this.nextGameAt + this.delay < now) {
        this.$set(this, 'playable', false)
      }
    },
    value() {
      const revenue = this.value * 5
      if (this.value > this.balance || revenue > this.routerBalance)
        this.$set(this.buttonDetails, 'disabled', true)
      else this.$set(this.buttonDetails, 'disabled', false)
    }
  },
  mounted() {
    const Lintr = setInterval(async () => {
      if (window.localWeb && !this.mExecuted) {
        this.mExecuted = true
        if (this.lastBets.length === 0) this.getLastBets()
        window.LwheelContract = await window.localWeb
          .contract()
          .at(this.contractAddr.WHEEL_ADDR)
        window.LwheelContract.Bet().watch({}, (err, res) => {
          /* eslint-disable */
          if (err) console.log(err)
          let newTemp = this.userTemp
          console.log(res.result.player, window.tronWeb.defaultAddress.hex)
          if (window.tronWeb && this.userTemp && res.result.player === window.tronWeb.defaultAddress.hex) {
            this.userTemp[res.result.choice].forEach((val, i, arr) => {
              if (val.tx === res.transaction) {
                console.log("BURA")
                console.log(newTemp)
                console.log(res.result.choice)
                let x = newTemp[res.result.choice].splice(i)
                newTemp[res.result.choice] = []
                this.$set(this, 'userTemp', newTemp)
              }
            })
          }
          this.bets[res.result.choice].users.push(res.result.player)
          this.bets[res.result.choice].wagers.push(
            this.regularizeWei(res.result.wager)
          )
          const temp = this.bets[res.result.choice]
          this.$set(this.bets[res.result.choice], 'users', temp.users)
          this.$set(
            this.bets[res.result.choice],
            'totalWager',
            this.bets[res.result.choice].totalWager + res.result.wager / 1000000
          )
          this.$set(this.bets[res.result.choice], 'wagers', temp.wagers)
          this.editBalance(this.regularizeWei(res.result.wager), false, false)
        })
        window.LwheelContract.Spin().watch({}, (err, res) => {
          // eslint-disable-next-line
          if (err !== null || res === null) return
          // eslint-disable-next-line
          this.$set(this, 'nextGameAt', res.result.nextGameAt)
          this.$refs.wheel.stop(res.result.roll)
          this.$set(this, 'userTemp', [[], [], [], []])
          this.setBalance()
          this.lastBets.unshift({color: this.$refs.wheel.segments[res.result.roll - 1].fillStyle})
          this.lastBets.length = 5
          this.$set(this, 'lastBets', this.lastBets)
          setTimeout(() => {
            this.startTimer()
            this.cleanUp()
          }, Math.max(res.result.nextGameAt - new Date().getTime() / 1000 - 22, 0) * 1000)
        })
        this.getWagers()
        clearInterval(Lintr)
      }
    }, 500)
    this.cleanUserBets()
    const intr = setInterval(async () => {
      if (window.tronWeb && this.address) {
        window.wheelContract = await window.tronWeb
          .contract()
          .at(this.contractAddr.WHEEL_ADDR)
        clearInterval(intr)
      }
    }, 500)
  },
  methods: {
    getLastBets() {
      window.localWeb.getEventResult(this.contractAddr.WHEEL_ADDR, {
        size: 5,
        eventName: 'Spin'
      }).then(res => {
        console.log(res)
        res.forEach((item, index, arr) => {
          this.lastBets.unshift({ color: this.$refs.wheel.segments[item.result.roll - 1].fillStyle })
        })
      })
    },
    bet(num) {
      const now = parseInt(new Date().getTime() / 1000)
      const diff = parseInt(this.nextGameAt) - now + this.delay
      if (window.routerContract && diff > 0) {
        window.routerContract
          .multiplayerBet(this.contractAddr.WHEEL_ADDR, num, new Date().getTime())
          .send({
            callValue: this.value * 1000000
          })
          .then(tx => {
            const temp = {
              exists: true,
              color: num,
              wager: this.value,
              tx
            }
            this.userTemp[num].push(temp)
          })
          // eslint-disable-next-line
          .catch(console.log)
      }
    },
    cleanUserBets() {
      this.$set(this, 'userTemp', [[], [], [], []])
    },
    startTimer(addDelay = false) {
      const now = parseInt(new Date().getTime() / 1000)
      let diff = parseInt(this.nextGameAt) - now
      diff = addDelay ? diff + this.delay : diff
      if (diff <= 0) {
        diff = 0
        this.$refs.wheel.setText('Preparing')
      } else this.$refs.wheel.startTimer(diff)
    },
    getWagers() {
      window.LwheelContract
        .getBetOwners()
        .call()
        .then(res => {
          this.$set(this.bets[0], 'users', res.grayOwners)
          this.$set(this.bets[1], 'users', res.greenOwners)
          this.$set(this.bets[2], 'users', res.redOwners)
          this.$set(this.bets[3], 'users', res.blueOwners)
        })
      window.LwheelContract
        .getBetRevenues()
        .call()
        .then(res => {
          let sum = 0
          for (let i = 0; i < this.bets[0].users.length; i++) {
            this.bets[0].wagers.push(this.regularizeWei(res.grayRevenues[i]))
            sum += this.bets[0].wagers[i] / 2
          }
          this.$set(this.bets[0], 'wagers', this.bets[0].wagers)
          this.$set(this.bets[0], 'totalWager', sum * 1000000)
          sum = 0
          for (let i = 0; i < this.bets[1].users.length; i++) {
            this.bets[1].wagers.push(this.regularizeWei(res.greenRevenues[i]))
            sum += this.bets[1].wagers[i] / 3
          }
          this.$set(this.bets[1], 'wagers', this.bets[1].wagers)
          this.$set(this.bets[1], 'totalWager', sum * 1000000)

          for (let i = 0; i < this.bets[2].users.length; i++) {
            this.bets[2].wagers.push(this.regularizeWei(res.redRevenues[i]))
            sum += this.bets[2].wagers[i] / 5
          }
          this.$set(this.bets[2], 'wagers', this.bets[2].wagers)
          this.$set(this.bets[2], 'totalWager', sum * 1000000)

          for (let i = 0; i < this.bets[3].users.length; i++) {
            this.bets[3].wagers.push(this.regularizeWei(res.blueRevenues[i]))
            sum += this.bets[3].wagers[i] / 50
          }
          this.$set(this.bets[3], 'wagers', this.bets[3].wagers)
          this.$set(this.bets[3], 'totalWager', sum * 1000000)
        })
      this.getLastTime()
      // this.$refs.wheel.spin()
    },
    getLastTime() {
      window.LwheelContract
        .lastPlayTime()
        .call()
        .then(time => {
          this.$set(this, 'nextGameAt', window.localWeb.toDecimal(time))
          this.startTimer(true)
        })
    },
    chatToggler() {
      this.$set(this, 'chatOpen', !this.chatOpen)
    },
    timeOver() {
      this.$refs.wheel.spin(2)
      this.$set(this, 'playable', false)
    },
    handleMultiplied(option) {
      // const option = this.options[0].value
      let val = this.value
      if (option.value === 0) val *= 2
      else if (option.value === 1) val /= 2
      else if (option.value === 2) val = 10
      else if (option.value === 3) val = this.balance
      else return

      val = val > this.balance ? this.balance : val
      val = val < this.min ? this.min : val
      this.$set(this, 'value', parseInt(val))
    },
    cleanUp() {
      this.$set(this.bets[0], 'users', [])
      this.$set(this.bets[0], 'wagers', [])
      this.$set(this.bets[0], 'totalWager', 0)
      this.$set(this.bets[1], 'users', [])
      this.$set(this.bets[1], 'wagers', [])
      this.$set(this.bets[1], 'totalWager', 0)
      this.$set(this.bets[2], 'users', [])
      this.$set(this.bets[2], 'wagers', [])
      this.$set(this.bets[2], 'totalWager', 0)
      this.$set(this.bets[3], 'users', [])
      this.$set(this.bets[3], 'wagers', [])
      this.$set(this.bets[3], 'totalWager', 0)
    },
    betCount(type) {
      return this.bets[type].users.length
    },
    regularizeWei(val) {
      return val / 10 ** 6
    },
    base58Addr(val) {
      return window.localWeb.address.fromHex(val)
    },
    checkStatus() {
      const now = new Date().getTime()
      if (this.nextGameAt + this.delay < now) {
        this.$set(this, 'playable', false)
      }
    }
  }
}
</script>

<style lang="scss" scope>
@keyframes spring {
  0% {
    margin-top: -30px;
  }
  50% {
    margin-top: 0px;
  }
  100% {
    margin-top: -30px;
  }
}

body {
  perspective: 800px;
}

.coins-bg {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  pointer-events: none;
}

@media (min-width: 768px) {
  .coins-bg {
    animation: spring 5s ease-in-out infinite;
  }
}

.game-content.wheel-game {
  .context {
    position: relative;
    background-image: url(~assets/images/coin-game-bg.png);
    background-repeat: no-repeat;
    background-position: center -290px;
    background-size: 85% auto;
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
          font-size: 1em;
          line-height: 1.2em;
          padding: 4px 10px;
          svg {
            width: 8px;
            fill: #68758c;
          }
          &.green {
            background: #37dd4a;
          }
          &.blue {
            background: #117bd9;
          }
          &.red {
            background: #d9113a
          }
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
    }
    .rate-content {
      .title {
        position: relative;
        background: rgba(40, 51, 70, 0.4);
        &:hover {
          background: #283346;
          cursor: pointer;
        }
        svg {
          width: 11px;
          fill: #fff !important;
        }
        &:after {
          content: '';
          display: block;
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 3px;
          border-radius: 100%;
          background: #283346;
        }
      }
      .selected {
        background: #283346;
      }
      &.color-blue {
        .title {
          background: rgba(17, 123, 217, 0.4);
          &:after {
            background: #117bd9;
          }
          &:hover {
            background: #117bd9;
          }
        }
        .selected {
          background: #117bd9;
        }
      }
      &.color-green {
        .title {
          background: rgba(55, 221, 74, 0.4);
          &:after {
            background: #37dd4a;
          }
          &:hover {
            background: #37dd4a;
          }
        }
        .selected {
          background: #37dd4a;
        }
      }
      &.color-red {
        .title {
          background: rgba(217, 17, 58, 0.4);
          &:after {
            background: #d9113a;
          }
          &:hover {
            background: #d9113a;
          }
        }
        .selected {
          background: #d9113a;
        }
      }
      .rate-table {
        .rate-table-header {
          border-bottom: 1px solid #283346;
          svg {
            width: 21px;
          }
        }
      }
    }
  }
}

.rates {
  font-size: 0.8em;
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
  .game-content.wheel-game {
    .context {
      .game-area {
        .coin-content {
          &.heads {
            .coin {
              animation: flipHeads 3s ease-out;
            }
          }
          &.tails {
            .coin {
              animation: flipTails 3s ease-out;
            }
          }
        }
      }
    }
  }
}
@media (max-width: 768px) {
  .game-content.wheel-game {
    .context {
      .btn-flip {
        position: relative;
        width: 50px;
        height: 45px;
        svg.icon {
          width: 25px;
          height: 25px;
          margin-top: 0;
        }
      }
      .game-area {
        .rate-numbers {
          position: relative;
        }
      }
    }
  }
}
</style>
