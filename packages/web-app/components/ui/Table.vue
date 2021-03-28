<template>
  <div class="table-responsive statistics-table">
    <table class="table">
      <thead>
        <tr v-if="data.head">
          <th v-if="data.head.place">№</th>
          <th v-if="data.head.game">{{ $t('game.title') }}</th>
          <th v-if="data.head.player">{{ $t('user') }}</th>
          <th v-if="data.head.timestamp">{{ $t('time_and_hour') }}</th>
          <th v-if="data.head.wager">{{ $t('wager') }}</th>
          <th v-if="data.head.mined">{{ $t('mined') }}</th>
          <th v-if="data.head.profit">{{ $t('profit') }}</th>
          <th v-if="data.head.reward">{{ $t('reward') }}</th>
          <th v-if="data.head.multiplier">{{ $t('multiplier') }}</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="(item, index) of data.body"
          :key="index"
          :class="data.head.place && index < 3 ? 'bg' : ''"
        >
          <td v-if="data.head.place">
            <span class="number">
              <svg viewBox="0 0 10 6">
                <use xlink:href="#icon-crown" />
              </svg>
              {{ index + 1 }}
            </span>
          </td>

          <td v-if="data.head.game">
            <div class="d-flex align-items-center flex-nowrap">
              <svg viewBox="0 0 20 23" class="icon mr-3">
                <use v-if="item.game === 'Dice'" xlink:href="#icon-dice" />
                <use v-else-if="item.game === 'Moon'" xlink:href="#icon-moon" />
                <use
                  v-else-if="item.game === 'Wheel'"
                  xlink:href="#icon-wheel"
                />
                <use
                  v-else-if="item.game === 'Coinflip'"
                  xlink:href='#coin-game-icon'
                />
              </svg>
              {{ item.game }}
            </div>
          </td>

          <td v-if="data.head.player">{{ shortAddr(item.player) }}</td>

          <td v-if="data.head.timestamp" class="grey">
            {{ item.timestamp ? new Date(parseInt(item.timestamp)).toLocaleString() : '-' }}
          </td>

          <td v-if="data.head.wager" class="grey">{{ item.wager / 1e6 }}</td>

          <td v-if="data.head.mined">
            <div
              class="d-flex align-items-center justify-content-center flex-nowrap"
            >
              {{ item.mined / 1e6 }}
              <img
                src="~/assets/images/coin-winr.png"
                class="ml-2 coin"
                alt=""
              />
            </div>
          </td>

          <td v-if="data.head.profit">
            <div
              class="d-flex align-items-center justify-content-center flex-nowrap"
            >
              <img
                v-if="item.profit > 0"
                src="~/assets/images/icon-arrow-up.png"
                class="d-block mr-2"
                alt=""
              />
              <img
                v-else-if="item.profit < 0"
                src="~/assets/images/icon-arrow-down.png"
                class="d-block mr-2"
                alt=""
              />
              {{ (item.profit / 1e6).toFixed(0) }}
              <img
                v-if="item.token === 'TRX'"
                src="~/assets/svg/coin-trx-red.svg"
                class="ml-2 coin"
                alt=""
              />
              <img
                v-else-if="item.token === 'USDT'"
                src="~/assets/svg/coin-usdt-green.svg"
                class="ml-2 coin"
                alt=""
              />
            </div>
          </td>
          <td v-if="data.head.multiplier" class="grey">
            <div
              class="d-flex align-items-center justify-content-center flex-nowrap"
            >
              <span v-if="index === 0">5x</span>
              <span v-else-if="index === 1">3x</span>
              <span v-else-if="index === 2">2x</span>
              <span v-else>-</span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: {}
    }
  }
}
</script>

<style lang="scss" scoped>
.statistics-table {
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
      height: 20px;
      width: 20px;
    }

    &:after {
      opacity: 0.15;
      height: 28px;
      width: 28px;
    }
  }

  .table {
    th, td {
      text-align: center;
      padding: 1.25rem 1em 1.1rem 1em;
      border: 0;
      &:first-child {
        padding-left: 2em;
        text-align: left;
      }
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
        &.bg {
          background: rgba(40, 51, 70, 0.3);
        }

        &:nth-child(1) {
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

        &:nth-child(2) {
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

        &:nth-child(3) {
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

      td {
        color: #ffffff;
        &.grey {
          color: #68758c;
        }
      }
    }
  }
}
</style>
