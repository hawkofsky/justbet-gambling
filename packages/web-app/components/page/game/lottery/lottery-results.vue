<template>
  <div class="table-responsive stats">
    <div class="table-header">
      <h1 class="mb-0 semi-bold">
        {{ $t('last_winners') }}
      </h1>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th>{{ $t('winners') }}</th>
          <th>{{ $t('winning_numbers') }}</th>
          <th>{{ $t('jackpot_shared') }}</th>
          <th>{{ $t('block_number') }}</th>
          <th>{{ $t('date') }}</th>
        </tr>
      </thead>
      <tbody v-if="winnerResults.length">
        <tr v-for="(item, index) of winnerResults" :key="index">
          <td>
            <div class="d-flex align-items-center flex-wrap">
              <span v-if="!item.winners.length">None</span>
              <span
                v-for="(winner, index) of item.winners"
                :key="index"
                :class="{ winner: winner === address }"
              >
                {{ winner | shorten
                }}{{
                  item.winners.length > 1 &&
                  index < item.winners.length - 1
                    ? ',&nbsp;'
                    : ''
                }}
              </span>
            </div>
          </td>
          <td>
            <div
              class="d-flex align-items-center justify-content-center flex-nowrap"
            >
              <div
                v-for="(number, index) in item.winningTickets"
                :key="index"
                class="ticket mr-2"
              >
                <span class="number">{{ number }}</span>
                <svg viewBox="0 0 20 24" class="icon">
                  <use xlink:href="#icon-ticket"></use>
                </svg>
              </div>
            </div>
          </td>
          <td>
            <div
              class="d-flex align-items-center justify-content-center flex-nowrap"
            >
              {{ item.jackpotTRX.toFixed(0) }} TRX, {{ item.jackpotUSDT.toFixed(0) }} USDT
            </div>
          </td>
          <td>
            <div
              class="d-flex align-items-center justify-content-center flex-nowrap"
            >
              <a
                :href="
                  `https://www.blockchain.com/btc/block/${item.blockNumber}`
                "
                rel="nofollow"
                target="_blank"
              >
                {{ item.blockNumber }}
              </a>
            </div>
          </td>
          <td>
            <div
              class="d-flex align-items-center justify-content-center flex-nowrap"
            >
              {{ parseDate(item.timestamp) }}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'LottaryResults',
  props: {
    winnerResults: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    ...mapState('user', ['address'])
  },
  methods: {
    parseDate(seconds) {
      return new Date(Number(seconds)).toLocaleDateString()
    }
  },
  async mounted() {
    await this.delay(2000)
  }
}
</script>

<style lang="scss" scoped>
.stats {
  margin-top: 60px;
  .table-header {
    height: auto;

    @media (min-width: 768px) {
      height: 70px;
    }
  }

  .table {
    th,
    td {
      text-align: center;
      padding: 1.25rem 1em 1.1rem 1em;
      border: 0;
      &:first-child {
        padding-left: 2em;
        text-align: left;
      }
    }

    .winner {
      color: #ffcf02;
    }

    .ticket {
      position: relative;
    }
    .number {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -40%);
      font-size: 12px;
    }

    svg {
      width: 22px;
      fill: #41506b;
    }

    thead {
      th {
        background: #1d2738;
        color: #68758c;
        &:first-child {
          border-bottom-left-radius: 4px;
          border-top-left-radius: 4px;
        }

        &:last-child {
          border-bottom-right-radius: 4px;
          border-top-right-radius: 4px;
        }
      }
    }

    tbody {
      tr {
        border-bottom: 1px solid #1d2738;
      }

      td {
        color: #fff;
        &.grey {
          color: #68758c;
        }
      }
    }
  }
}
</style>