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
                  <GameContent extra-class="coin-game">
                    <template slot="header">
                      <GameTitle active-game="coin">
                        <svg viewBox="0 0 20 20" class="icon mr-3">
                          <use xlink:href="#coin-game-icon"></use>
                        </svg>
                        <span class="d-block">{{ $t('coin_game') }}</span>
                      </GameTitle>
                      <div
                        class="d-flex flex-column flex-md-row align-items-center mt-3 mt-md-0"
                      >
                        <div
                          class="d-flex align-items-center mr-3 mb-2 mb-md-0"
                        >
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
                            Game Edge: <span style="color: white">2%</span>
                          </span>
                        </div>
                        <Balance ref="Balance" :isPlayUSDT="playUSDT" />
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
                        class="row justify-content-center align-items-center mt-2 mb-4"
                      >
                        <div class="col-12 col-md-4"></div>
                        <div class="col-12 col-md-4">
                          <div
                            class="coin-state d-flex justify-content-center align-items-center"
                          >
                            <a
                              href="#"
                              class="arrow"
                              @click="handleChangeCoinSide"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="white"
                                width="18px"
                                height="18px"
                              >
                                <path
                                  d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"
                                />
                                <path d="M0 0h24v24H0z" fill="none" />
                              </svg>
                            </a>
                          </div>
                        </div>
                        <div class="col-12 col-md-4"></div>
                      </div>
                      <div
                        class="game-area d-flex flex-column align-items-center"
                      >
                        <div :class="`coin-content`">
                          <Coin ref="coin" />
                        </div>
                      </div>
                      <div class="row align-items-center align-items-md-end">
                        <div class="col-3 col-lg-2">
                          <div class="button">
                            <button
                              type="button"
                              name="button"
                              class="btn btn-flip btn-flip-tails d-flex flex-column justify-content-center align-items-center"
                              :disabled="playButtonState"
                              @click="flip('0')"
                            >
                              <svg viewBox="0 0 110 100" class="bg">
                                <use xlink:href="#flip-button-bg-left"></use>
                              </svg>
                              <svg viewBox="0 0 220 220" class="icon">
                                <use xlink:href="#coin-flip-front"></use>
                              </svg>
                              <span class="d-none d-md-block uppercase">
                                {{ $t('tails') }}
                              </span>
                            </button>
                          </div>
                        </div>
                        <div class="col-6 col-lg-8">
                          <div
                            class="rate semi-bold d-flex justify-content-center align-items-center"
                          >
                            <svg viewBox="0 0 12 9" class="mr-1">
                              <use xlink:href="#icon-arrow-up"></use>
                            </svg>
                            <span>{{ profit }}</span>
                            <div :class="`icon-wrap ${playUSDT ? 'flip' : ''}`">
                              <img
                                class="icon-coin  ml-2"
                                src="~/assets/svg/coin-trx-red.svg"
                                alt=""
                              />
                              <img
                                class="icon-coin ml-2"
                                src="~/assets/svg/coin-usdt-green.svg"
                                alt=""
                              />
                            </div>
                          </div>
                          <div class="row mt-4">
                            <div class="col-md-4">
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
                            <div class="col-md-8">
                              <div class="input-multiplier">
                                <InputMultiplier
                                  :options="actionButtons"
                                  @inputMultiplied="handleMultiplied"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="col-3 col-lg-2">
                          <div
                            class="d-flex flex-column justify-content-between align-items-end h-100"
                          >
                            <div class="d-flex"></div>
                            <div class="button">
                              <button
                                type="button"
                                name="button"
                                class="btn btn-flip btn-flip-heads d-flex flex-column justify-content-center align-items-center"
                                :disabled="playButtonState"
                                @click="flip('1')"
                              >
                                <svg viewBox="0 0 110 100" class="bg">
                                  <use xlink:href="#flip-button-bg-right"></use>
                                </svg>
                                <svg viewBox="0 0 220 220" class="icon">
                                  <use xlink:href="#coin-flip-back"></use>
                                </svg>
                                <span class="d-none d-md-block uppercase">
                                  {{ $t('heads') }}
                                </span>
                              </button>
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
      id="revert-modal"
      hide-footer
      :visible="showRevertDia"
      @hide="closeRevertDia"
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
  Footer,
  GameContent,
  GameTitle,
  Header,
  // Hint,
  Stats,
  TotalBar,
  InputMultiplier,
  Input,
  GameResult
} from '~/components/ui/'
import Coin from '~/components/page/game/coin-3d'

export default {
  components: {
    Balance,
    Coin,
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
    GameResult
  },
  data() {
    return {
      hotList: [],
      topPlayers: [],
      chatOpen: false,
      coinSide: 'tails',
      minValueTRX: 0,
      maxValueTRX: 0,
      minValueUSDT: 0,
      maxValueUSDT: 0,
      autoPlay: false,
      isPlayed: false,
      inputValue: 10,
      showRevertDia: false,
      revertedTX: '',
      playUSDT: false,
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
    profit() {
      if (isNaN(this.inputValue)) {
        return 0
      } else {
        return this.inputValue * 2
      }
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
    inputValue(value) {
      this.validateAutoBtn(value)
    }
  },
  mounted() {
    this.getBetRangeUSDT()
    this.getBetRangeTRX()
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
        this.contractAddr.COINFLIP_ADDR,
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
     * Chat open/close switcher
     *
     * @public This is a public method
     */
    chatToggler() {
      this.$set(this, 'chatOpen', !this.chatOpen)
    },
    /**
     * Gets flipcoin contracts result
     *
     * @param {Number} type Side of the coin
     * @public This is a public method
     */
    async flip(type) {
      if (this.$refs.coin.doAnim) return

      if (!this.address) return

      this.isPlayed = true

      const coinflip = await this.getContract(this.contractAddr.COINFLIP_ADDR)

      if (!coinflip) {
        this.isPlayed = false
        this.autoPlay = false

        return
      }

      this.$refs.coin.start()

      try {
        const startCoinSide = this.$refs.coin.stopAt === 'tails' ? 0 : 1

        let tx
        if (!this.playUSDT) {
          tx = await coinflip
            .Flip(
              new Date().getTime() + startCoinSide,
              type,
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
            .approve(this.contractAddr.COINFLIP_ADDR, this.inputValue * 1000000)
            .send({
              feeLimit: 100000000
            })
          tx = await coinflip
            .FlipTRC20(
              new Date().getTime() + startCoinSide,
              type,
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

        // console.log("TX", tx)

        const result = tx._hex === '0x00' ? 0 : 1
        const side =
          result === parseInt(type)
            ? parseInt(type) === 0
              ? 'heads'
              : 'tails'
            : parseInt(type) === 1
            ? 'heads'
            : 'tails'

        // console.log("result, side", result, side)
        await this.$refs.coin.stop(side)

        await this.checkReferral(this.address)
        this.getHotBets()
        await this.showGameResultPopup()
        if (this.autoPlay) {
          this.isPlayed = false

          setTimeout(() => {
            this.flip(type)
          }, 1500)
        } else {
          this.isPlayed = false
        }
      } catch (e) {
        this.$refs.coin.stop()
        this.revertedTX = e.error.toLowerCase()
        // this.revertedTX = e.transaction.txID
        this.showRevertDia = true
        this.$store.commit('user/setIsPlaying', false)
        this.isPlayed = false
        this.autoPlay = false
      }
    },
    /**
     * Change coin side
     *
     * @public This is a public method
     */
    async handleChangeCoinSide() {
      if (this.$refs.coin.doAnim) return

      await this.$refs.coin.turn()
    },
    /**
     * Gets statistics
     *
     * @public This is a public method
     */
    async getHotBets() {
      let latestBetsEndpoint = '/api/coinflip/latestbets/trx'

      if (this.playUSDT) {
        latestBetsEndpoint = '/api/coinflip/latestbets/usdt'
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
      Axios.get('/api/coinflip/topplayers/trx').then(res => {
        this.$set(this, 'topPlayers', res.data)
      })
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

          const randomCoinSide = Math.round(Math.random())

          this.flip(randomCoinSide)

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

      const coinflip = await this.getContract(this.contractAddr.COINFLIP_ADDR)

      if (!coinflip) return

      try {
        const maxBet = await coinflip.getMaxBet().call()
        const minBet = await coinflip.getMinBet().call()

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

      const coinflip = await this.getContract(this.contractAddr.COINFLIP_ADDR)

      if (!coinflip) return

      try {
        const maxBet = await coinflip
          .getMaxBetTRC20(this.contractAddr.USDTMOCK_ADDR)
          .call()
        const minBet = await coinflip
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
     * Close error popup
     *
     * @public This is a public method
     */
    closeRevertDia() {
      this.showRevertDia = false
    }
  }
}
</script>

<style lang="scss" scope>
@keyframes spring {
  0% {
    margin-top: 0;
  }
  50% {
    margin-top: 30px;
  }
  100% {
    margin-top: 0;
  }
}

.coins-bg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-75%);
  pointer-events: none;

  @media (min-width: 768px) {
    animation: spring 5s ease-in-out infinite;
  }
}

.game-content.coin-game {
  .game-area {
    position: relative;
    z-index: 9;
  }

  .context {
    position: relative;
    background-image: url(~assets/images/coin-game-bg.png);
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 85% auto;
    overflow: hidden;
    &:before {
      content: '';
      display: block;
      width: 250px;
      height: 250px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translateX(-50%) translateY(-50%);
      background: #ff9500;
      mix-blend-mode: normal;
      filter: blur(60px);
      opacity: 0.2;
    }
    .game-area {
      .coin-content {
        &:after {
          content: '';
          display: block;
          width: 50%;
          height: 10px;
          background: #0a0f18;
          margin: 10px 0 0 25%;
          border-radius: 100%;
        }
      }
    }
    .rate {
      svg {
        width: 22px;
        fill: #fff;
      }
      span {
        font-size: 2.5em;
      }
      img {
        width: 35px;
      }
    }
    .btn-flip {
      position: relative;
      width: 50px;
      height: 45px;
      border-radius: 4px;
      border: 0;
      color: #fff;
      padding: 0;
      cursor: pointer;
      svg {
        pointer-events: none;
        &.icon {
          width: 25px;
          height: 25px;
          margin-top: 0;

          @media (min-width: 768px) {
            width: 35px;
            height: 35px;
            margin-top: 8px;
          }
        }
        &.bg {
          width: 100%;
          height: 100%;
          position: absolute;
        }
      }
      span {
        display: block;
        line-height: 20px;
        margin-top: 10px;
        font-size: 0.75em;
      }

      @media (min-width: 768px) {
        height: 100px;
        width: 110px;
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

    @media (max-width: 1140px) {
      width: 100%;
    }
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
.coin-switcher {
  display: flex;
  justify-content: space-between;
  background-color: #0f1826;
  border-radius: 100px;
  width: 53px;
  padding: 4px;
}
.icon-wrap {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;

  &.flip .icon-coin:nth-child(1n) {
    transform: rotateY(180deg);
  }
  &.flip .icon-coin:nth-child(2n) {
    transform: rotateY(0deg);
  }
  .icon-coin {
    position: absolute;
    width: 34px;
    user-select: none;
    transform: translate3d(0, 0, 0);
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    transition: transform 0.3s;
    &:nth-child(1n) {
      transform: rotateY(0deg);
    }
    &:nth-child(2n) {
      transform: rotateY(180deg);
    }
  }
}

.input-multiplier {
  height: 100%;
  min-height: 100%;

  .radio-buttons {
    .radio-button {
      @media (max-width: 992px) {
        margin-top: 7px;
      }
    }
  }
}

#revert-modal___BV_modal_backdrop_ {
  background: #000a19;
  &:not(.show):not(.fade) {
    opacity: 0.7;
  }
}
#revert-modal {
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
