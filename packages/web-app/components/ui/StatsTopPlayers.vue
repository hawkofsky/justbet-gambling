<template>
  <div class="col-12 col-lg-6">
    <div class="table-header d-flex justify-content-between align-items-center">
      <div class="d-flex align-items-center">
        <h1 class="mb-0 semi-bold">
          {{ $t('top_players') }}
        </h1>
        <b-button
          variant="transparent"
          class="py-0 btn-question"
          @click="showInfoPopup"
        >
          <svg viewBox="0 0 612 612" class="icon icon-question">
            <use xlink:href="#icon-question"></use>
          </svg>
        </b-button>
      </div>

      <div class="counter-content d-flex align-items-center">
        <div class="grey mr-2 d-none d-md-block">
          {{ $t('time_till') }}:
        </div>
        <Counter
          :date="time"
          min-text="m"
          sec-text="s"
          :show-hours="false"
          :timezone="false"
          :colors="{
            backgroundColor: '#d90f3a',
            shadow: '#930020',
            color: 'rgba(255, 255, 255, 0.6)'
          }"
        />
      </div>
    </div>

    <div class="my-4">
      <Table :data="topPlayers10" />
    </div>
    <InfoPopup :page="'top-players'" :footer="false" />
  </div>
</template>

<script>
import Axios from 'axios'

import { mapState } from 'vuex'

import Counter from './Counter'
import Table from './Table'
import InfoPopup from '~/components/ui/InfoPopup'

export default {
  components: { Counter, Table, InfoPopup },
  props: {
    topPlayers: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      time: 0,
      showInfo: false,
      topPlayersTable: {
        head: {
          place: true,
          player: true,
          wager: true,
          multiplier: true
        },
        body: []
      }
    }
  },
  computed: {
    topPlayers10() {
      this.$set(this.topPlayersTable, 'body', this.topPlayers.slice(0, 10))

      return this.topPlayersTable
    }
  },
  mounted() {
    this.getTime()
  },
  methods: {
    showInfoPopup() {
      this.$bvModal.show('info-popup')
    },
    getTime() {
      const nextTime = new Date()

      nextTime.setHours(nextTime.getHours() + 1)
      nextTime.setMinutes(0)
      nextTime.setSeconds(0)

      const difference = nextTime - new Date()

      this.$set(this, 'time', nextTime.getTime() / 1000)

      setTimeout(() => {
        this.$emit('getTopPlayers')
        this.getTime()
      }, difference)
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-question:focus {
  outline: 0;
  box-shadow: none;
}
</style>

<style lang="scss">
.table-header {
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
            font-size: 1em !important;
            line-height: 0.5em !important;
            opacity: 0.6;
          }
          .date {
            font-size: 1.333em;
            & + small {
              font-size: 0.8em;
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
</style>
