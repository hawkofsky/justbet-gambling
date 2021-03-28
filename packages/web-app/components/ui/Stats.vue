<template>
  <div class="stats">
    <div class="row">
      <StatsLatestBets :hotBets="hotBets" />
      <StatsTopPlayers
        :topPlayers="topPlayers"
        @getTopPlayers="getTopPlayers"
      />
    </div>

    <div class="text-center">
      <a href="/statistics">
        <button type="button" class="btn btn-red">
          {{ $t('see_more_buttons') }}
        </button>
      </a>
    </div>
  </div>
</template>

<script>
import StatsLatestBets from './StatsLatestBets'
import StatsTopPlayers from './StatsTopPlayers'

export default {
  components: {
    StatsLatestBets,
    StatsTopPlayers
  },
  props: {
    hotBets: {
      type: Array,
      default: () => []
    },
    topPlayers: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    getTopPlayers() {
      this.$emit('getTopPlayers')
    }
  }
}
</script>

<style lang="scss">
.stats {
  .table-header {
    height: auto;

    @media (min-width: 768px) {
      height: 70px;
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
