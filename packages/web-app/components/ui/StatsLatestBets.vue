<template>
  <div class="col-12 col-lg-6">
    <div class="table-header d-flex justify-content-between align-items-center">
      <h1 class="mb-0 semi-bold">
        {{ $t('latest_bets') }}
      </h1>
    </div>

    <div class="my-4">
      <Table :data="latestBets10" />
    </div>
  </div>
</template>

<script>
import Table from './Table'

export default {
  components: { Table },
  props: {
    hotBets: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      latestBets: {
        head: {
          game: true,
          player: true,
          wager: true,
          profit: true
        },
        body: []
      }
    }
  },
  computed: {
    latestBets10() {
      this.$set(this.latestBets, 'body', this.hotBets.slice(0, 10))

      return this.latestBets
    }
  }
}
</script>

<style lang="scss">
#info-box___BV_modal_backdrop_ {
  background: #000a19;
  &:not(.show):not(.fade) {
    opacity: 0.7;
  }
}

#info-box {
  .modal-content {
    background: #1d2738;

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
}
</style>
