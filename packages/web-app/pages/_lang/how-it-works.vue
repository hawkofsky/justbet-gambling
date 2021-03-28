<template>
  <div class="main-content">
    <TotalBar />
    <div class="container">
      <div class="py-5">
        <Header />
        <div class="mt-5">
          <h2 class="mb-3 semi-bold">{{ $t('home_how_it_works_title') }}?</h2>
          <div class="mb-5">
            <div class="pt-5 mb-5">
              <div class="d-flex justify-content-between align-items-center">
                <h4>
                  {{ $t('what_is_justbet.title') }}
                </h4>
                <span
                  class="half-text grey"
                  v-html="$t('what_is_justbet.info')"
                />
              </div>
            </div>
            <List :items="$t('what_is_justbet.list')" col="6" />
            <!--div class="pt-4 pl-5">
              <a target="_blank" href="/whitepaper.pdf" class="whitepaper-link">
                {{ $t('read_the_whitepaper') }}
              </a>
            </div-->
          </div>
          <div class="mb-5">
            <div class="pt-5 mb-5">
              <h4>
                {{ $t('how_does_justbet_work.title') }}
              </h4>
            </div>
            <List :items="$t('how_does_justbet_work.list')" col="6" />
          </div>
          <div class="mb-5">
            <div class="pt-5 mb-5">
              <h4>
                {{ $t('games_on_the_justbet_platform.title') }}
              </h4>
            </div>
            <List :items="$t('games_on_the_justbet_platform.list')" col="4" />
          </div>
          <div class="mb-5">
            <div class="pt-5 mb-5">
              <div class="d-flex justify-content-between align-items-center">
                <h4>
                  {{ $t('token_supply.title') }}
                </h4>
                <span class="half-text grey" v-html="$t('token_supply.info')" />
              </div>
            </div>
            <List :items="$t('token_supply.list')" col="6" />
          </div>
          <div class="pt-5 mb-5 grey" v-html="$t('round_distribution_pre')" />
          <div class="hiw-content mb-5">
            <div class="pt-5 mb-5">
              <div class="question semi-bold" data-number="05">
                <span>
                  {{ $t('round_distribution') }}
                </span>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <div class="table-responsive token-distribution-table">
                  <table class="table">
                    <thead>
                      <tr>
                        <th>
                          {{ $t('rounds') }}
                        </th>
                        <th>
                          {{ $t('allocation') }}
                        </th>
                        <th>
                          {{ $t('token_amount') }}
                        </th>
                        <th>
                          {{ $t('payout_ratio') }}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(r, key) in rounds" :key="key">
                        <td>
                          <div class="grey">
                            {{ r.n }}
                          </div>
                        </td>
                        <td>
                          {{ (r.alloc * 100).toFixed(1).replace(',', '.') }}%
                        </td>
                        <td>
                          <div
                            class="d-flex align-items-center justify-content-center flex-nowrap"
                          >
                            {{ r.tokens | splitThousands }}
                            <img
                              src="~/assets/images/coin-winr.png"
                              class="ml-3 coin"
                              alt=""
                            />
                          </div>
                        </td>
                        <td class="grey">{{ r.payout }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="col-12">
                <div class="row align-items-center">
                  <div class="col-3 text-center bordered">
                    {{ $t('post_minting') }}
                  </div>
                  <div class="col-5 text-center bordered">
                    {{
                      $t(
                        'every_1m_winr_tokens_received_from_lottery_ticket_purchases'
                      )
                    }}
                  </div>
                  <div class="col-4 text-center">
                    <span class="text-left">
                      {{
                        $t(
                          'random_from_any_of_the_9_payout_ratios_everyones_a_winr'
                        )
                      }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="hiw-content mb-5">
            <div class="pt-5 mb-5">
              <div class="question semi-bold" data-number="06">
                <span>
                  {{ $t('roadmap') }}
                </span>
              </div>
            </div>
            <div class="row" style="overflow: hidden; overflow-x: auto;">
              <div class="col-12">
                <Timeline />
              </div>
            </div>
          </div>
        </div>
        <Footer extra-class="mt-5" />
      </div>
    </div>
  </div>
</template>

<script>
import { Footer, Header, List, Timeline, TotalBar } from '~/components/ui/'

export default {
  components: {
    Footer,
    Header,
    List,
    Timeline,
    TotalBar
  },
  filters: {
    splitThousands: value =>
      value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  },
  data() {
    return {
      rounds: [
        { n: 1, alloc: 0.152, tokens: 912000000, payout: 10 },
        { n: 2, alloc: 0.133, tokens: 798000000, payout: 5 },
        { n: 3, alloc: 0.095, tokens: 570000000, payout: 2 },
        { n: 4, alloc: 0.096, tokens: 576000000, payout: 2.5 },
        { n: 5, alloc: 0.048, tokens: 288000000, payout: 2 },
        { n: 6, alloc: 0.096, tokens: 576000000, payout: 1 },
        { n: 7, alloc: 0.095, tokens: 570000000, payout: 0.5 },
        { n: 8, alloc: 0.133, tokens: 798000000, payout: 0.25 },
        { n: 9, alloc: 0.152, tokens: 912000000, payout: 0.5 }
      ]
    }
  },
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scope>
.hiw-content {
  .question {
    position: relative;
    font-size: 1.65em;
    letter-spacing: 1px;
    &:before {
      content: attr(data-number);
      display: none;
      position: absolute;
      left: -60px;
      top: 50%;
      font-size: 4em;
      line-height: 1em;
      color: #121b29;
      mix-blend-mode: normal;
      opacity: 0.7;
      text-shadow: 0px 0px 60px #5e6d88;
      transform: translateY(-50%);
      height: 100px;
    }
    span {
      position: relative;
      z-index: 1;
    }
    .grey {
      font-size: 0.5em;
    }
  }
  .answer {
    position: relative;
    svg {
      width: 14px;
      height: 16px;
      fill: #d9113a;
      position: absolute;
      left: 0;
      top: 2px;
      g {
        stroke: #d9113a;
        fill: #d9113a;
      }
    }
    p {
      color: #9aa2b2;
      margin-bottom: 0;
      line-height: 1.65em;
      span {
        color: #fff;
      }
    }
  }
  .bordered {
    position: relative;
    &:before {
      content: '';
      display: block;
      position: absolute;
      right: 0;
      top: 50%;
      width: 1px;
      height: 40px;
      margin-top: -20px;
      background: #1d2738;
    }
  }
  .whitepaper-link {
    color: #d9113a;
  }
}

.token-distribution-table {
  .table-header {
    height: 54px;
    .counter-content {
      .counter-shadow {
        padding-bottom: 6px;
        .counter {
          border-radius: 10px;
          padding: 16px 20px !important;
          .sec,
          .minutes {
            display: flex;
            .dots {
              font-size: 2em;
              line-height: 0.5em;
              opacity: 0.6;
            }
            .date {
              & + small {
                font-size: 0.9em;
                line-height: 1em;
                margin-left: 2px;
                padding: 5px 0 0 0 !important;
              }
            }
          }
        }
      }
    }
  }
  .table {
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
          padding: 1.25rem 1em 1.1rem 1em;
          &:first-child {
            border-radius: 4px 0 0 4px;
            text-align: left;
            padding-left: 2em;
          }
          &:last-child {
            border-radius: 0 4px 4px 0;
          }
        }
      }
    }
    tbody {
      tr {
        border-bottom: 1px solid #1d2738;
        td {
          text-align: center;
          color: #fff;
          padding: 1.25rem 1em 1.1rem 1em;
          &.grey {
            color: #68758c;
          }
          &:first-child {
            text-align: left;
            padding-left: 2em;
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
}
</style>
