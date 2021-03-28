<template>
  <div class="lottery-tabs pl-5 pr-5 pt-5 pb-4">
    <div class="progress-bar-box">
      <vue-progress-bar />
    </div>
    <b-tabs>
      <b-tab :title="$t('purchased_tickets')" active>
        <div class="table-responsive mb-0 mt-4 pt-2">
          <table class="table text-center">
            <thead class="small-text">
              <tr>
                <th>
                  {{ $t('user') }}
                </th>
                <th>
                  {{ $t('ticket_numbers') }}
                </th>
                <th width="90px">
                  {{ $t('ticket_id') }}
                </th>
              </tr>
            </thead>
            <tbody @scroll="onScroll">
              <tr v-for="(ticket, index) of totalPurchasedTickets" :key="index">
                <td class="text-left">
                  {{ ticket.player | addrFromHex | shorten }}
                </td>
                <td class="small-text">
                  <div class="p-2 d-flex justify-content-center">
                    <div
                      v-for="(number, index) in ticket.numbers"
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
                <td class="small-text" width="40px">
                  {{ ticket.index }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </b-tab>
      <b-tab :title="$t('my_tickets')">
        <div class="table-responsive mb-0 mt-4 pt-2">
          <table class="table text-center">
            <thead class="small-text">
              <tr>
                <th width="100px">
                  {{ $t('user') }}
                </th>
                <th>
                  {{ $t('ticket_numbers') }}
                </th>
                <th class="th-small"></th>
              </tr>
            </thead>
            <tbody @scroll="onScroll">
              <tr v-for="(ticket, key) of purchasedMyTickets" :key="key">
                <td class="text-left">
                  {{ ticket.player | addrFromHex | shorten }}
                </td>
                <td class="small-text">
                  <div class="p-2 d-flex justify-content-center">
                    <div
                      v-for="(number, index) in ticket.numbers"
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
              </tr>
            </tbody>
          </table>
        </div>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {},
  data() {
    return {
      getTicketsInterval: null,
      totalPurchasedTickets: 0,
      purchasedMyTickets: 0
    }
  },
  computed: {
    ...mapState('tickets', ['tickets', 'total', 'myTickets']),
    ...mapState('user', ['address'])
  },
  async mounted() {
    try {
      await this.delay(2000)
      this.$Progress.start()
      await this.$store.dispatch('tickets/load', this.address)
      this.$Progress.finish()
      this.$set(this, 'totalPurchasedTickets', this.tickets)
      this.$set(this, 'purchasedMyTickets', this.myTickets)

      this.getTicketsInterval = setInterval(async () => {
        await this.$store.dispatch('tickets/load', this.address)
        await this.$store.dispatch('tickets/loadUser', this.address)

        if (this.totalPurchasedTickets !== this.tickets) {
          this.$set(this, 'totalPurchasedTickets', this.tickets)
        }
        if (this.purchasedMyTickets !== this.myTickets) {
          this.$set(this, 'purchasedMyTickets', this.myTickets)
        }
      }, 10000)
    } catch (e) {
      throw new Error(e)
    }
  },
  methods: {
    // regulateNumbers(numbers) {
    //   const nms = []
    //   for (let i = 0; i < numbers.length / 64; i++) {
    //     nms[i] = Number('0x' + numbers.substring(i * 64, (i + 1) * 64))
    //   }
    //   return nms
    // },
    // shortenAddress(addr) {
    //   return addr.substring(0, 6) + '.....' + addr.substring(35)
    // },
    async onScroll({ target: { scrollTop, clientHeight, scrollHeight } }) {
      if (Math.ceil(scrollTop) + clientHeight >= scrollHeight) {
        if (this.tickets.length < this.total) {
          this.$Progress.start()
          await this.$store.dispatch(
            'tickets/more',
            this.$store.state.user.address
          )
          this.$Progress.finish()
        }
      }
    }
  },
  destroyed() {
    clearInterval(this.getTicketsInterval)
  }
}
</script>

<style lang="scss">
.lottery-tabs {
  .nav-tabs {
    border: 0;
    padding-bottom: 15px;
    .nav-link {
      position: relative;
      border: 0;
      color: #68758c;
      padding: 0 20px 0 0;
      font-size: 1.33em;
      &:hover,
      &:active,
      &.active {
        background: transparent;
        color: #fff;
        text-shadow: unset;
      }
      &.active {
        &:before {
          content: '';
          display: block;
          position: absolute;
          pointer-events: none;
          top: 120%;
          left: 0;
          width: 100px;
          height: 2px;
          transition: 150ms;
          background: #d9113a;
          box-shadow: 0px 3px 12px 2px rgba(217, 17, 58, 0.5);
          -webkit-filter: blur(0.5px);
          filter: blur(0.5px);
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .lottery-tabs {
    .nav-tabs {
      .nav-link {
        font-size: 1.2em;
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.progress-bar-box {
  position: absolute;
  top: 90px;
  margin: 0 14px;
  left: 3rem;
  right: 3rem;

  /deep/ .__cov-progress {
    background: #3011d9 !important;
    box-shadow: 0px 3px 12px 2px rgba(17, 31, 217, 0.5);
    z-index: 1000;
  }
}

.lottery-tabs {
  background: #1d2738;
  border-radius: 10px;
  .table {
    th,
    td {
      border: 0;
    }
    th.th-small {
      width: 16px;
    }
    thead {
      background: #283449;
      display: table;
      width: 100%;
      table-layout: fixed;

      tr {
        th {
          background: transparent;
          color: #68758c;
          padding: 0.5rem 0;
          &:first-child {
            border-radius: 4px 0 0 4px;
            padding-left: 0;
          }
          &:last-child {
            border-radius: 0 4px 4px 0;
          }
        }
      }
    }
    tbody {
      height: 410px;
      max-height: 410px;
      overflow: hidden;
      overflow-y: scroll;
      display: block;
      width: 100%;

      tr {
        display: table;
        width: 100%;
        table-layout: fixed;

        td {
          vertical-align: middle;
          color: #fff;
          padding: 0;

          &.grey {
            color: #68758c;
          }
          &:first-child {
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
            font-weight: 500;
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
          .ticket {
            position: relative;
            cursor: pointer;
            span {
              position: absolute;
              left: 50%;
              top: 50%;
              transform: translate(-50%, -40%);
            }
            svg {
              width: 22px;
              fill: #41506b;
            }
          }
        }
        &.bg {
          background: rgba(40, 51, 70, 0.3);
        }
        &:first-child {
          td {
            padding-top: 1em;
          }
        }
      }

      &::-webkit-scrollbar {
        background-color: #1d2738;
      }
      &::-webkit-scrollbar-thumb {
        background-color: #ffcf02;
        height: 30px;
      }
    }
  }
}
@media (max-width: 768px) {
  .table-header {
    height: auto;
  }
}
</style>
