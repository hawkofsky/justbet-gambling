<template>
  <GameContent extra-class="moon-game-profits" :context-padding="false">
    <template slot="header">
      <div class="title d-flex align-items-center">
        <span class="d-block">{{ $t('profits') }}</span>
      </div>
    </template>
    <template slot="context">
      <div class="table-responsive mb-0">
        <table class="table">
          <thead>
            <tr>
              <th class="pl-4">{{ $t('user') }}</th>
              <th>{{ $t('multiplier') }}</th>
              <th class="pr-4">{{ $t('profit') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="userWaitingConfirmation">
              <td class="pl-4">{{ userBet.sender }}</td>
              <td class="grey">{{ userBet.multiplier / 100 }}x</td>
              <td class="pr-4">
                <div
                  class="d-flex align-items-center justify-content-center flex-nowrap"
                >
                  {{ userBet.profit() }}
                </div>
              </td>
            </tr>
            <tr v-for="(bet, key) in bets" :key="key">
              <td class="pl-4">{{ bet.sender }}</td>
              <td class="grey">{{ bet.multiplier / 100 }}x</td>
              <td class="pr-4">
                <div
                  class="d-flex align-items-center justify-content-center flex-nowrap"
                >
                  <img
                    v-if="bet.status && !bet.hidden"
                    src="~assets/images/icon-arrow-up.png"
                    class="d-block mr-2"
                    alt=""
                  />
                  <img
                    v-else-if="!bet.status && !bet.hidden"
                    src="~assets/images/icon-arrow-down.png"
                    class="d-block mr-2"
                    alt=""
                  />
                  {{ bet.profit() }}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
  </GameContent>
</template>

<script>
import { GameContent } from '~/components/ui/'
/* eslint-disable */
class Bet {
  sender
  value
  multiplier
  status
  hidden

  profit() {
    console.log(this.multiplier, this.value)
    return this.multiplier * this.value / 100
  }

  convertVal(val) {
    this.value = val / 6
  }
}

export default {
  components: {
    GameContent
  },
  data() {
    return {
      userWaitingConfirmation: false,
      userBet: {},
      bets: []
    }
  },
  methods: {
    reset() {
      this.$set(this, 'userWaitingConfirmation', false)
      this.$set(this, 'userBet', {})
      this.$set(this, 'bets', [])
    },
    addBet(value, multiplier, addr) {
      this.$set(this, 'userWaitingConfirmation', true)
      const bet = new Bet()
      bet.sender = addr
      bet.value = value
      bet.multiplier = multiplier
      bet.status = true
      this.$set(this, 'userBet', bet)
    }
  },
  sockets: {
    playerIn(data) {
      let bets = this.bets
      const addr = window.tronWeb.address.fromHex(data.address)
      if (this.address === addr) {
        this.$set(this, 'userWaitingConfirmation', false)
      }
      const bet = new Bet()
      bet.sender = this.shortAddr(addr)
      bet.value = data.wager
      bet.multiplier = data.multiplier
      // bet.status = true
      bets.push(bet)
      this.$set(this, 'bets', bets)
    },
    playerOut(data) {
      const bets = []
      const bet = new Bet()
      console.log(data)
      for (let i = 0; i < data.length; i++) {
        const element = data[i];
        const addr = window.tronWeb.address.fromHex(element.address)
        if (this.address === addr) this.$emit('userHasBet', true)
        bet.sender = this.shortAddr(addr)
        bet.value = element.wager
        bet.multiplier = element.outMultiplier
        bet.status = element.result
        bet.hidden = false
        bets.push(bet)
      }
      this.$set(this, 'bets', bets)
    },
    playerDetails(data) {
      let bets = []
      const bet = new Bet()
      for (let i = 0; i < data.length; i++) {
        const element = data[i];
        const addr = window.tronWeb.address.fromHex(element.address)
        if (this.address === addr) this.$emit('userHasBet', true)
        bet.sender = this.shortAddr(addr)
        bet.value = element.wager
        bet.multiplier = element.outMultiplier || element.multiplier
        bet.status = element.result
        bet.hidden = !element.outMultiplier
        bets.push(bet)
      }
      this.$set(this, 'bets', bets)
    }
    // roundDetails(data) {
    //   console.log(data)
    // }
  }
}
</script>

<style lang="scss" scoped>
.table {
  font-size: 0.8em;
  th,
  td {
    border: 0;
  }
  thead {
    tr {
      th {
        background: #1d2738;
        text-align: center;
        color: #68758c;
        padding: 0.5rem 0;
        &:first-child {
          border-radius: 4px 0 0 4px;
          text-align: left;
          padding-left: 0;
        }
        &:last-child {
          border-radius: 0 4px 4px 0;
        }
      }
    }
  }
  tbody {
    tr {
      border-bottom: 0px solid #1d2738;
      &:nth-child(3),
      &:nth-child(2),
      &:nth-child(1) {
        background: #283346;
      }
      td {
        text-align: center;
        color: #fff;
        padding: 0.5rem 0;
        &.grey {
          color: #68758c;
        }
        &:first-child {
          text-align: left;
          padding-left: 0;
        }
        .icon {
          width: 18px;
        }
        .coin {
          display: block;
          width: 20px;
        }
        .number {
          display: block;
          position: relative;
          width: 20px;
          height: 20px;
          text-align: center;
          font-weight: 600;
          svg {
            position: absolute;
            width: 10px;
            height: 6px;
            left: 5px;
            top: -4px;
            z-index: 2;
          }
          &:before,
          &:after {
            content: '';
            display: block;
            position: absolute;
            left: 50%;
            top: 0;
            transform: translateX(-50%);
            mix-blend-mode: normal;
            border-radius: 100%;
          }
          &:before {
            opacity: 0.2;
            width: 20px;
            height: 20px;
          }
          &:after {
            opacity: 0.15;
            width: 28px;
            height: 28px;
          }
        }
      }
      &.bg {
        background: rgba(40, 51, 70, 0.3);
      }
      &:nth-child(1) {
        td {
          .number {
            color: #ffd000;
            svg {
              fill: #ffd000;
            }
            &:before,
            &:after {
              background: linear-gradient(
                360deg,
                rgba(21, 31, 46, 0.0001) 0%,
                #ffd000 100%
              );
            }
          }
        }
      }
      &:nth-child(2) {
        td {
          .number {
            color: #9aa2b2;
            svg {
              fill: #9aa2b2;
            }
            &:before,
            &:after {
              background: linear-gradient(
                360deg,
                rgba(21, 31, 46, 0.0001) 0%,
                #a8b1c4 100%
              );
            }
          }
        }
      }
      &:nth-child(3) {
        td {
          .number {
            color: #c35301;
            svg {
              fill: #c35301;
            }
            &:before,
            &:after {
              background: linear-gradient(
                360deg,
                rgba(21, 31, 46, 0.0001) 0%,
                #e35608 100%
              );
            }
          }
        }
      }
    }
  }
}
.moon-game-profits {
  .context {
    height: 100%;
  }
}
@media (max-width: 768px) {
  .table-header {
    height: auto;
  }
}
</style>
