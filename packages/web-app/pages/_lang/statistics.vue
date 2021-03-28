<template>
  <div class="main-content">
    <TotalBar />

    <div class="container py-5">
      <Header />

      <div class="statistics-tab mt-5">
        <Select
          :options="[
            { value: 10, label: 10 },
            { value: 20, label: 20 },
            { value: 30, label: 30 }
          ]"
          @input="setCount"
        />

        <b-tabs class="mb-5">
          <b-tab :title="$t('high_rollers')" active>
            <Table :data="highRollers" />
          </b-tab>

          <b-tab :title="$t('leaderboard')">
            <Table :data="leaderboard" />
          </b-tab>

          <b-tab :title="$t('last_bets')">
            <Table :data="lastBets" />
          </b-tab>

          <b-tab v-if="address" :title="$t('my_bets')">
            <Table :data="myBets" />
          </b-tab>
        </b-tabs>
      </div>

      <Footer extra-class="mt-5" />
    </div>
  </div>
</template>

<script>
import Axios from 'axios'

import { mapGetters } from 'vuex'

import { Footer, Header, TotalBar, Select, Table } from '~/components/ui/'

export default {
  components: {
    Footer,
    Header,
    Select,
    Table,
    TotalBar
  },
  data() {
    return {
      highRollers: {
        head: {
          game: true,
          player: true,
          timestamp: true,
          wager: true,
          profit: true
        },
        body: []
      },
      leaderboard: {
        head: {
          player: true,
          mined: true
        },
        body: []
      },
      lastBets: {
        head: {
          game: true,
          player: true,
          timestamp: true,
          wager: true,
          profit: true
        },
        body: []
      },
      myBets: {
        head: {
          game: true,
          player: true,
          timestamp: true,
          wager: true,
          mined: true,
          profit: true
        },
        body: []
      },
      count: 10
    }
  },
  computed: {
    ...mapGetters('user', ['address'])
  },
  mounted() {
    this.getStats()
  },
  methods: {
    /**
     * Gets data of general statistics from back-end
     *
     * @param {String} endpoint Link to back-end api
     * @param {Object} data Object of table's data
     * @public This is a public method
     */
    getGeneralStats(endpoint, data) {
      Axios.get(endpoint).then(result => {
        this.$set(data, 'body', result.data)
      })
    },
    /**
     * Gets data of user's statistics from back-end
     *
     * @public This is a public method
     */
    async getUserStats() {
      while (!this.address) await this.delay(200)

      Axios.get(`/api/stats/mybets/${this.address}?count=${this.count}`)
        .then(result => {
          this.$set(this.myBets, 'body', result.data)
        })
    },
    /**
     * Call all methods which get statistics data
     *
     * @public This is a public method
     */
    getStats() {
      this.getGeneralStats(
        `/api/stats/highrollers?count=${this.count}`,
        this.highRollers
      )
      this.getGeneralStats(
        `/api/stats/leaderboard?count=${this.count}`,
        this.leaderboard
      )
      this.getGeneralStats(
        `/api/stats/latestbets?count=${this.count}`,
        this.lastBets
      )
      this.getUserStats()
    },
    /**
     * Change count of statistics data
     *
     * @public This is a public method
     */
    setCount(value) {
      if (this.count === value) return

      this.$set(this, 'count', value)

      this.getStats()
    }
  }
}
</script>

<style lang="scss">
.statistics-tab {
  position: relative;

  .select {
    position: absolute;
    right: 0;
    top: 5px;
  }

  .nav-tabs {
    border-bottom: 0;
    margin-bottom: 3rem !important;

    @media (max-width: 768px) {
      margin-bottom: 1.5rem !important;
      width: 75%;
    }
  }

  .nav-item {
    @media (max-width: 768px) {
      margin-bottom: 10px;
      width: 50%;
    }
  }

  .nav-link {
    font-size: 0.8rem;
    font-weight: 600;
    color: #68758c;
    border: 0;
    padding: 0 1em 0 0;
    position: relative;

    @media (min-width: 768px) {
      font-size: 1.6rem;
    }

    &:hover {
      border: 0;
      text-shadow: unset;
    }

    &.active {
      background: transparent;
      color: #fff;
      &:before {
        content: '';
        display: block;
        width: 30px;
        height: 1px;
        position: absolute;
        left: 0;
        bottom: -6px;
        background: #d9113a;

        @media (min-width: 768px) {
          width: 50px;
          height: 4px;
          bottom: -14px;
        }
      }
    }
  }
}
</style>
