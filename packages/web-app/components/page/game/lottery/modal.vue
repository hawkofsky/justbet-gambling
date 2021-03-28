<template>
  <b-modal
    id="lottery-modal"
    hide-footer
    :visible="visible"
    @hide="handleClose"
  >
    <template slot="modal-title">
      <span class="semi-bold">
        {{ $t('buy_lottery_tickets') }}
      </span>
    </template>
    <div class="form">
      <div class="row small-text">
        <div class="col-6 mb-3">
          <label class="uppercase"> {{ $t('your_winr_balance') }}: </label>
          <div class="value d-flex align-items-center pl-3">
            <span>{{ winrBalance.toFormat(2) }}</span>
            <img src="~/assets/images/coin-winr.png" alt="" class="icon-coin" />
          </div>
        </div>
        <div class="col-6 mb-3">
          <label class="uppercase"> {{ $t('ticket_cost') }}: </label>
          <div class="value d-flex align-items-center pl-3">
            <span>{{ ticketCost.toFormat(2) }}</span>
            <img src="~/assets/images/coin-winr.png" alt="" class="icon-coin" />
          </div>
        </div>
        <div class="col-12 mb-3">
          <label class="uppercase">
            {{ $t('game_numbers') }}
          </label>
          <div class="radio mt-3">
            <input
              v-model="gameNumberSelectType"
              :value="1"
              type="radio"
              class="form-control"
            />
            <div class="radio-input pl-5">
              <b class="mb-2">
                {{ $t('auto_generated') }}
              </b>
              <p>
                {{ $t('random_numbers_will_be_generated_automatically') }}
              </p>
            </div>
          </div>
          <div class="radio mt-3">
            <input
              v-model="gameNumberSelectType"
              :value="2"
              type="radio"
              class="form-control"
              @click="resetQuantity"
            />
            <div class="radio-input pl-5">
              <b class="mb-2">
                {{ $t('manual_select') }}
              </b>
              <p>
                {{ $t('pick_5_numbers_manually') }}
              </p>
            </div>
          </div>
          <div
            v-if="gameNumberSelectType === 2"
            class="tickets d-flex flex-wrap mt-3 pl-5"
          >
            <div
              v-for="index in 20"
              :key="index"
              :class="
                `ticket ${
                  isTicketSelected(index) ? 'active' : 'passive'
                } mr-3 mb-3`
              "
              @click="handleSelectTicket(index)"
            >
              <span class="number">{{ index }}</span>
              <svg viewBox="0 0 20 24" class="icon">
                <use xlink:href="#icon-ticket"></use>
              </svg>
            </div>
          </div>
        </div>

        <span v-if="!balanceCheck" class="text-danger">
          {{ $t('insufficent_balance') }}
        </span>
      </div>
      <b-button
        variant="yellow"
        class="btn-xl mt-4 uppercase"
        size="lg"
        :disabled="validateBtn"
        @click="handleBuy"
      >
        {{ $t('buy_tickets') }}
      </b-button>
    </div>
  </b-modal>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    ticketCost: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      quantityOfTickets: 0,
      gameNumberSelectType: 2,
      selectedTickets: [],
      visible: this.value,
      isWinrContractError: false
    }
  },
  computed: {
    ...mapState('user', ['address', 'winrBalance']),
    ...mapState('contracts', ['contractAddr']),
    validateBtn() {
      if (this.balanceCheck && this.address) {
        if (this.gameNumberSelectType === 1) {
          return false
        }

        if (this.gameNumberSelectType === 2) {
          return this.balanceCheck && this.selectedTickets.length < 5
        }
      }
      return true
    },
    balanceCheck() {
      return this.winrBalance > this.ticketCost
    }
  },
  watch: {
    value() {
      this.$set(this, 'visible', this.value)
    }
  },
  methods: {
    handleClose() {
      this.$emit('input', false)
      this.selectedTickets = []
    },
    isTicketSelected(index) {
      const { selectedTickets } = this
      const key = selectedTickets.indexOf(index)

      return key > -1
    },
    handleSelectTicket(index) {
      let { selectedTickets } = this
      const key = selectedTickets.indexOf(index)
      if (key > -1) {
        selectedTickets.splice(key, 1)
      } else if (selectedTickets.length >= 5) {
        return
      } else {
        selectedTickets.push(index)
        selectedTickets = selectedTickets.sort((a, b) => a - b)
      }
      this.$set(this, 'selectedTickets', selectedTickets)
      this.$set(this, 'quantityOfTickets', selectedTickets.length)
    },
    resetQuantity() {
      this.$set(this, 'quantityOfTickets', 0)
      this.$set(this, 'selectedTickets', [])
    },
    async handleBuy() {
      if (!this.balanceCheck) return
      const winrContract = await this.getContract(this.contractAddr.WINR_ADDR)

      try {
        /* eslint-disable */
        if (window.tronWeb && this.address) {
          if (this.gameNumberSelectType === 2) {

            let ticketHash = await  winrContract
              .buyLotteryTicket(Object.values(this.selectedTickets))
              .send({
                // shouldPollResponse: true
              })
              .then(tx => {
                this.$emit('ticketBuy', tx)
              })
            // const res = await winrContract.balanceOf(window.tronWeb.defaultAddress.base58).call()
            // console.log(res._hex / 1e6, 34423123);


            // let ticketBuyEvents = [];
            // let counter = 0
            //
            // while (!ticketBuyEvents.length && counter < 100) {
            //   await this.delay(100)
            //   ticketBuyEvents = await window.tronWeb.getEventByTransactionID(ticketHash)
            //   counter++
            //   if(counter === 99 &&  !ticketBuyEvents.length) {
            //     throw new Error('Timeout: getEventByTransactionID failed')
            //   }
            // }

          } else {
            let all = []
            let min = []
            let x
            // while (all.length < this.quantityOfTickets) {
            let nums = []
            for (let i = 0; i < 5; i++) {
              // const element = array[i]
              do {
                x = this.rand()
              } while (nums.includes(x))
              nums.push(x)
            }

            nums = nums.sort((a, b) => a - b)

            let ticketHash = await winrContract
              .buyLotteryTicket(Object.values(nums))
              .send({
                // shouldPollResponse: true
              })
              .then(tx => {
                  this.$emit('ticketBuy', tx)
                })

            // let ticketBuyEvents = [];
            // let counter = 0
            // while (!ticketBuyEvents.length && counter < 100) {
            //   await this.delay(100)
            //   ticketBuyEvents = await window.tronWeb.getEventByTransactionID(ticketHash)
            //   counter++
            //   if(counter === 99 &&  !ticketBuyEvents.length) {
            //     throw new Error('Timeout: getEventByTransactionID failed')
            //   }
            // }
          }
        }
        this.handleClose()
        this.delay(500)
        this.$store.commit('messages/setTicketBoughtStatus', false)
        this.$bvModal.show('message-popup')
      } catch (e) {
        this.$store.commit('messages/setTicketBoughtStatus', true)
        this.handleClose()
        this.$bvModal.show('message-popup')
        console.log(e)
      }
    },
    rand() {
      return (
        (parseInt(
          window.tronWeb.toDecimal(window.tronWeb.BigNumber.random()) * 100
        ) %
          20) +
        1
      )
    }
  }
}
</script>

<style lang="scss">
#lottery-modal___BV_modal_backdrop_ {
  background: #000a19;
  &:not(.show):not(.fade) {
    opacity: 0.7;
  }
}
#lottery-modal {
  .modal-content {
    background: #1d2738;
    border: 0;
    border-radius: 10px;
    .modal-header {
      padding: 3em 3em 1.5em 3em;
      border: 0;
      .close {
        margin: -1em;
        opacity: 1;
        text-shadow: none;
        color: #41506b;
      }
      .modal-title {
        font-size: 2em;
        line-height: 1;
      }
    }
    .modal-body {
      padding: 1em 3em 3em 3em;
    }
    .form {
      label {
        color: #68758c;
      }
      .input input,
      .value {
        height: 50px;
        font-size: 1.2em;
      }
      .value {
        position: relative;
        border-radius: 6px;
        background: #283449;
        img {
          position: absolute;
          width: 20px;
          right: 20px;
          top: 50%;
          margin-top: -10px;
        }
      }
      .input {
        input {
          border: 1px solid #283449;
          background: transparent;
          color: #fff;
        }
      }
      .radio {
        position: relative;
        .radio-input {
          color: #68758c;
          position: relative;
          &:before {
            content: '';
            display: block;
            position: absolute;
            width: 20px;
            height: 20px;
            border: 1px solid #283449;
            border-radius: 100%;
            left: 0;
            top: 8px;
            transition: 300ms;
          }
          b {
            font-size: 1.2em;
            transition: 300ms;
          }
        }
        input {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          z-index: 2;
          &:checked {
            + .radio-input {
              &:before {
                border: 6px solid #ffd000;
              }
              b {
                color: #fff;
              }
            }
          }
        }
      }
      .tickets {
        .ticket {
          position: relative;
          cursor: pointer;
          span {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -45%);
            color: #fff;
            -webkit-user-select: none;
            -ms-user-select: none;
            user-select: none;
          }
          svg {
            fill: #41506b;
            width: 22px;
          }
          &.active {
            svg {
              fill: #ffcf02;
            }
            span {
              color: #c37001;
            }
          }
        }
      }
    }
  }
  .text-danger {
    padding: 0 15px
  }

}
</style>
