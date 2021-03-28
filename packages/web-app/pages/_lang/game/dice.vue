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
                <div class="col-12">
                  <GameContent extra-class="dice">
                    <template slot="header">
                      <GameTitle active-game="dice">
                        <svg viewBox="0 0 20 23" class="icon mr-3">
                          <use xlink:href="#icon-dice"></use>
                        </svg>
                        <span class="d-block">{{ $t('dice_game') }}</span>
                      </GameTitle>
                      <div class="d-flex mt-3 mt-md-0">
                        <div class="d-flex align-items-center mr-3">
                          <div class="coin-switcher mr-3">
                            <img
                              class="icon-coin"
                              :style="{
                                filter: playUSDT
                                  ? 'grayscale(80%)'
                                  : 'grayscale(0%)'
                              }"
                              src="~/assets/svg/coin-trx-red.svg"
                              alt="TRX"
                              title="TRX"
                              @click="playUSDT = false"
                            />
                            <img
                              src="~/assets/svg/coin-usdt-green.svg"
                              :style="{
                                filter: !playUSDT
                                  ? 'grayscale(80%)'
                                  : 'grayscale(0%)'
                              }"
                              alt="USDT"
                              title="USDT"
                              class="icon-coin"
                              @click="playUSDT = true"
                            />
                          </div>
                          <span class="grey mr-2 uppercase">
                            {{ $t('address') }}:
                          </span>
                          {{ shortAddr(address) }}
                          <span class="grey ml-3 uppercase">
                            Game Edge: <span style="color: white">1%</span>
                          </span>
                        </div>
                        <Balance ref="Balance" :isPlayUSDT="playUSDT" />
                        <!--Hint class-name="pl-3" /-->
                      </div>
                    </template>
                    <template slot="context">
                      <div class="row justify-content-between">
                        <div class="col">
                          <h5>
                            {{ $t('set_your_win_chance') }}
                          </h5>
                        </div>
                        <div class="col">
                          <div class="row justify-content-end small-text">
                            <div class="col-auto">
                              <span class="grey"> {{ $t('minimum') }}: </span>
                              {{ house }}%
                            </div>
                            <div class="col-auto">
                              <span class="grey">
                                {{ $t('win_chance') }}:
                              </span>
                              {{ winChance }}%
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="dice-game__wrap">
                        <Chart
                          :value="currentChartValue"
                          :chart-data="chartData"
                          :isPlayed="isPlayed"
                        />
                        <Slider v-model="sliderValue" :house="house" />
                        <DiceLoader v-if="diceLoader" />
                      </div>
                      <div class="my-5 pt-4">
                        <div class="row">
                          <div class="col-12 col-lg-8">
                            <h5 class="mb-3 fixed-height">
                              {{ $t('choose_your_bet') }}
                            </h5>
                            <div class="row">
                              <div class="col-12 col-lg-5">
                                <Input
                                  v-model="inputValue"
                                  :min="playUSDT ? minValueUSDT : minValueTRX"
                                  :max="playUSDT ? maxValueUSDT : maxValueTRX"
                                  :disabled="inputState"
                                  :is-play-u-s-d-t="playUSDT"
                                  :second-icon-image="
                                    require('~/assets/svg/coin-usdt-green.svg')
                                  "
                                />
                              </div>
                              <div class="col-12 mt-4 mt-lg-0 col-lg-7">
                                <InputMultiplier
                                  :options="actionButtons"
                                  @inputMultiplied="handleMultiplied"
                                />
                              </div>
                            </div>
                          </div>
                          <div class="mt-4 mt-lg-0 col-12 col-lg-4">
                            <div
                              class="row mb-3 fixed-height justify-content-end align-items-center small-text"
                            >
                              <div class="col-auto">
                                <span class="grey">
                                  {{ $t('multiplier') }}:
                                </span>
                                {{ multiplier }}x
                              </div>
                              <div class="col-auto">
                                <div class="grey-bg pt-1 pb-1 px-2">
                                  <span class="grey">
                                    {{ $t('your_profit') }}:
                                  </span>
                                  {{ profit }}
                                </div>
                              </div>
                            </div>
                            <b-button
                              :disabled="playButtonState"
                              class="w-100 semi-bold uppercase"
                              size="lg"
                              variant="red"
                              @click="play"
                            >
                              <small>
                                {{ isPlayed ? $t('rolling') : $t('roll') }}
                              </small>
                            </b-button>
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
              <Stats
                :hot-bets="hotList"
                :top-players="topPlayers"
                @getTopPlayers="getTopPlayers"
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
    <b-modal
      id="error-modal"
      hide-footer
      :visible="showErrorModal"
      @hide="closeErrorModal"
    >
      <template slot="modal-title">
        <span class="semi-bold"> Error: {{ revertedTX }} </span>
      </template>
      Sorry, something went wrong. Please try again.
    </b-modal>
    <GameResult :game-result="gameResult" :show-game-result="showGameResult" />
  </div>
</template>

<script>
import Axios from 'axios'

import { mapState } from 'vuex'

import {
  Balance,
  Chat,
  Chart,
  Footer,
  GameContent,
  GameTitle,
  Header,
  // Hint,
  Input,
  InputMultiplier,
  Stats,
  Slider,
  TotalBar,
  DiceLoader,
  GameResult
} from '~/components/ui/'

export default {
  components: {
    Input,
    Balance,
    Chat,
    Chart,
    Footer,
    GameContent,
    GameTitle,
    Header,
    // Hint,
    InputMultiplier,
    Stats,
    Slider,
    TotalBar,
    DiceLoader,
    GameResult
  },
  data() {
    return {
      hotList: [],
      topPlayers: [],
      autoPlay: false,
      isPlayed: false,
      isAnimated: false,
      chartData: [],
      chatOpen: false,
      low: 30,
      high: 80,
      house: 1, // FIXME: static,
      inputValue: 10,
      sliderValue: [25, 75],
      minValueTRX: 0,
      maxValueTRX: 0,
      minValueUSDT: 0,
      maxValueUSDT: 0,
      showErrorModal: false,
      revertedTX: '',
      playUSDT: false,
      diceLoader: false,
      currentChartValue: 50,
      gameResult: {},
      showGameResult: false,
      actionButtons: [
        { value: 0, title: 'X2', state: '' },
        { value: 1, title: '1/2', state: '' },
        { value: 2, title: 'Min', state: '' },
        { value: 3, title: 'Max', state: '' },
        { value: 4, title: 'Auto', state: 'disabled' }
      ]
    }
  },
  computed: {
    ...mapState('user', ['address', 'balance', 'usdtBalance']),
    ...mapState('contracts', ['contractAddr']),
    range() {
      return (this.high - this.low).toFixed(2)
    },
    profit() {
      return (this.multiplier * this.inputValue - this.inputValue).toFixed(2)
    },
    multiplier() {
      return ((100 - this.house) / this.range).toFixed(4)
    },
    winChance() {
      return this.range
    },

    playButtonState() {
      if (!this.address) {
        return true
      }

      if (this.autoPlay) {
        return true
      }

      if (this.isPlayed) {
        return true
      }

      if (!Number.isInteger(this.inputValue)) {
        return true
      }

      if (!this.playUSDT && this.balance < this.minValueTRX) {
        return true
      }
      if (this.playUSDT && this.usdtBalance < this.minValueUSDT) {
        return true
      }

      if (isNaN(this.inputValue)) {
        return true
      }

      if (!this.playUSDT && this.inputValue < this.minValueTRX) {
        return true
      }
      if (this.playUSDT && this.inputValue < this.minValueUSDT) {
        return true
      }

      if (!this.playUSDT && this.inputValue > this.maxValueTRX) {
        return true
      }
      if (this.playUSDT && this.inputValue > this.maxValueUSDT) {
        return true
      }

      if (!this.playUSDT && this.inputValue > this.balance) {
        return true
      }

      if (this.playUSDT && this.inputValue > this.usdtBalance) {
        return true
      }

      return false
    },
    inputState() {
      if (!this.address) {
        return true
      }

      if (this.isPlayed) {
        return true
      }

      if (this.autoPlay) {
        return true
      }

      return false
    }
  },
  watch: {
    isPlayed(value) {
      this.changeMultipliedStatesAll(value)
    },
    autoPlay(value) {
      this.changeMultipliedStatesAutoPlay(value)
    },
    playUSDT() {
      this.getHotBets()
      this.validateAutoBtn(this.inputValue)
    },
    sliderValue() {
      const [low, high] = this.sliderValue
      this.$set(this, 'low', Number(low).toFixed(2))
      this.$set(this, 'high', Number(high).toFixed(2))
    },
    inputValue(value) {
      this.validateAutoBtn(value)
    }
  },
  mounted() {
    this.getBetRangeUSDT()
    this.getBetRangeTRX()
    this.getChartData()
    this.getHotBets()
    this.getTopPlayers()
    this.validateAutoBtn(this.inputValue)
  },
  methods: {
    /**
     * Show game result popup
     *
     * @public This is a public method
     */
    async showGameResultPopup() {
      this.$set(this, 'showGameResult', true)
      await this.delay(3000)
      this.$set(this, 'showGameResult', false)
    },
    /**
     * Get event result
     *
     * @param  {String}  Event name
     * @return  {Object}  Parsed event data
     * @public This is a public method
     */
    async getGameResult(event) {
      const resultEvent = await window.localWeb.getEventResult(
        this.contractAddr.DICE_ADDR,
        { eventName: event, size: 1 }
      )

      return {
        prize:
          (resultEvent[0].result.prize - resultEvent[0].result.wager) / 1e6,
        won: JSON.parse(resultEvent[0].result.result),
        playUSDT: this.playUSDT
      }
    },
    /**
     * Validate Auto btn
     *
     * @param {Number} value  wager input value
     * @public This is a public method
     */
    async validateAutoBtn(value) {
      while (!this.maxValueTRX) await this.delay(500)
      while (!this.balance) await this.delay(500)
      this.actionButtons[4].state = ''
      if (this.playButtonState) {
        this.actionButtons[4].state = 'disabled'
      }
    },
    /**
     * Gets dice contracts result
     *
     * @param {Number} type Side of the coin
     * @public This is a public method
     */
    async play() {
      if (!this.address) return

      this.isPlayed = true

      const diceContract = await this.getContract(this.contractAddr.DICE_ADDR)

      if (!diceContract) {
        this.isPlayed = false
        this.autoPlay = false

        return
      }

      this.startDiceAnimation()

      this.$store.commit('user/setIsPlaying', true)

      try {
        const low = (Number(this.low) * 100).toFixed(0)
        const high = (Number(this.high) * 100).toFixed(0)
        let tx
        if (!this.playUSDT) {
          tx = await diceContract
            .GoodLuck(
              new Date().getTime(),
              low,
              high,
              window.localStorage.getItem('ref') ||
                'T9yD14Nj9j7xAB4dbGeiX9h8unkKHxuWwb'
            )
            .send({
              callValue: this.inputValue * 1000000,
              shouldPollResponse: true
            })
          this.$set(this, 'gameResult', await this.getGameResult('Result'))
        } else {
          const usdtContract = await this.getContract(
            this.contractAddr.USDTMOCK_ADDR
          )
          await usdtContract
            .approve(this.contractAddr.DICE_ADDR, this.inputValue * 1000000)
            .send({
              feeLimit: 100000000
            })
          tx = await diceContract
            .GoodLuckTRC20(
              new Date().getTime(),
              low,
              high,
              window.localStorage.getItem('ref') ||
                'T9yD14Nj9j7xAB4dbGeiX9h8unkKHxuWwb',
              this.contractAddr.USDTMOCK_ADDR,
              this.inputValue * 1000000
            )
            .send({
              shouldPollResponse: true
            })
          this.$set(this, 'gameResult', await this.getGameResult('ResultTRC20'))
        }
        await this.checkReferral(this.address)
        await this.stopDiceAnimation()
        this.getChartData()
        this.getHotBets()

        this.$store.commit('user/setIsPlaying', false)
        this.isPlayed = false

        this.$set(this, 'currentChartValue', (tx._hex * 1e6) / 100000000)
        await this.showGameResultPopup()
        if (this.autoPlay) {
          setTimeout(() => {
            this.play()
          }, 1500)
        }
      } catch (e) {
        this.revertedTX = e.error.toLowerCase()
        this.showErrorModal = true

        await this.stopDiceAnimation()
        this.$store.commit('user/setIsPlaying', false)
        this.isPlayed = false
        this.autoPlay = false
      }
    },
    /**
     * start dice animation
     *
     * @public This is a public method
     */
    startDiceAnimation() {
      if (this.diceLoader) return
      this.diceLoader = true
    },
    /**
     * stop dice animation
     *
     * @public This is a public method
     */
    stopDiceAnimation() {
      this.diceLoader = false
    },
    /**
     * Chat open/close switcher
     *
     * @public This is a public method
     */
    chatToggler() {
      this.$set(this, 'chatOpen', !this.chatOpen)
    },
    /**
     * Change Multiplied buttons state by autoPlay
     *
     * @param {Boolean} value Game states
     * @public This is a public method
     */
    changeMultipliedStatesAutoPlay(value) {
      if (value) {
        for (let i = 0; i < 4; i++) {
          this.$set(this.actionButtons[i], 'state', 'disabled')
        }
      } else {
        for (let i = 0; i < 4; i++) {
          this.$set(this.actionButtons[i], 'state', '')
        }
      }
    },
    /**
     * Change Multiplied buttons state
     *
     * @param {Boolean} value Game states
     * @public This is a public method
     */
    changeMultipliedStatesAll(value) {
      if (value) {
        for (let i = 0; i < this.actionButtons.length; i++) {
          this.$set(this.actionButtons[i], 'state', 'disabled')
        }
      } else {
        for (let i = 0; i < 4; i++) {
          if (!this.autoPlay) {
            this.$set(this.actionButtons[i], 'state', '')
          }
        }

        if (this.autoPlay) {
          this.$set(this.actionButtons[4], 'state', 'active')
        } else {
          this.$set(this.actionButtons[4], 'state', '')
        }
      }
    },
    /**
     * Change input value
     *
     * @param {Array} option Button's number and value
     * @public This is a public method
     */
    handleMultiplied(option) {
      if (option.state === 'disabled') return

      let inputValue = this.inputValue

      switch (option.value) {
        // X2 button
        case 0:
          if (this.playUSDT && this.maxValueUSDT >= inputValue * 2) {
            inputValue *= 2
          } else if (!this.playUSDT && this.maxValueTRX >= inputValue * 2) {
            inputValue *= 2
          }

          break
        // 1/2 button
        case 1:
          if (this.playUSDT && this.minValueUSDT <= inputValue / 2) {
            inputValue /= 2
          } else if (!this.playUSDT && this.minValueTRX <= inputValue / 2) {
            inputValue /= 2
          }

          break
        // Min button
        case 2:
          if (this.playUSDT) {
            inputValue = this.minValueUSDT
          } else {
            inputValue = this.minValueTRX
          }

          break
        // Max button
        case 3:
          if (this.playUSDT) {
            inputValue = this.maxValueUSDT
          } else {
            inputValue = this.maxValueTRX
          }

          break
        // Auto button
        case 4:
          this.autoPlay = !this.autoPlay

          this.play()

          if (this.autoPlay) {
            this.$set(this.actionButtons[option.value], 'state', 'active')
          } else {
            this.$set(this.actionButtons[option.value], 'state', '')
          }

          break
        default:
          return
      }

      this.$set(this, 'inputValue', parseInt(inputValue))
    },
    /**
     * Get max and min TRX value for bet's input
     *
     * @public This is a public method
     */
    async getBetRangeTRX() {
      while (!this.address) {
        await this.delay(200)
      }

      const diceContract = await this.getContract(this.contractAddr.DICE_ADDR)

      if (!diceContract) return

      try {
        const maxBet = await diceContract.getMaxBet().call()
        const minBet = await diceContract.getMinBet().call()

        this.$set(this, 'maxValueTRX', maxBet._hex / 1e6)
        this.$set(this, 'minValueTRX', minBet._hex / 1e6)
      } catch (error) {
        // eslint-disable-next-line
        console.log(error)
      }
    },
    /**
     * Get max and min USDT value for bet's input
     *
     * @public This is a public method
     */
    async getBetRangeUSDT() {
      while (!this.address) {
        await this.delay(200)
      }

      const diceContract = await this.getContract(this.contractAddr.DICE_ADDR)

      if (!diceContract) return

      try {
        const maxBet = await diceContract
          .getMaxBetTRC20(this.contractAddr.USDTMOCK_ADDR)
          .call()
        const minBet = await diceContract
          .getMinBetTRC20(this.contractAddr.USDTMOCK_ADDR)
          .call()

        this.$set(this, 'maxValueUSDT', maxBet._hex / 1e6)
        this.$set(this, 'minValueUSDT', minBet._hex / 1e6)
      } catch (error) {
        // eslint-disable-next-line
        console.log(error)
      }
    },
    /**
     * Gets chart data
     *
     * @public This is a public method
     */
    getChartData() {
      Axios.get('/api/dice/chartdata').then(res => {
        this.$set(this, 'chartData', res.data)
      })
    },
    /**
     * Gets statistics
     *
     * @public This is a public method
     */
    getHotBets() {
      let latestBetsEndpoint = '/api/dice/latestbets/trx'

      if (this.playUSDT) {
        latestBetsEndpoint = '/api/dice/latestbets/usdt'
      }

      Axios.get(latestBetsEndpoint).then(res => {
        this.$set(this, 'hotList', res.data)
      })
    },
    /**
     * Gets statistics by top players
     *
     * @public This is a public method
     */
    async getTopPlayers() {
      Axios.get('/api/dice/topplayers/trx').then(res => {
        this.$set(this, 'topPlayers', res.data)
      })
    },
    /**
     * Close error popup
     *
     * @public This is a public method
     */
    closeErrorModal() {
      this.showErrorModal = false
    }
  }
}
</script>

<style lang="scss">
.game-content.dice {
  .context {
    background-image: url(~assets/images/dice-bg.png);
    background-repeat: no-repeat;
    background-position: right bottom;
    .fixed-height {
      height: 26px;
    }
  }
  .coin-switcher {
    display: flex;
    justify-content: space-between;
    background-color: #0f1826;
    border-radius: 100px;
    width: 53px;
    padding: 4px;
  }
  .icon-coin {
    cursor: pointer;
    user-select: none;
  }
}
</style>

<style lang="scss" scoped>
.dice-game__wrap {
  position: relative;
}
.main-content {
  .main-area {
    width: 80%;
    height: 100vh;
    overflow: auto;
    scroll-behavior: smooth;
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
      width: 0;
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

<style lang="scss">
#error-modal___BV_modal_backdrop_ {
  background: #000a19;
  &:not(.show):not(.fade) {
    opacity: 0.7;
  }
}
#error-modal {
  .modal-content {
    background: #1d2738;
  }

  .modal-header {
    padding: 20px;
    border: 0;
    .close {
      opacity: 1;
      text-shadow: none;
      color: #41506b;
    }
  }
}
</style>
