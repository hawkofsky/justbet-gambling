<template>
  <div class="row balances small-text mt-3">
    <div class="col-6 col-sm-4">
      <div class="text border-right">
        <div class="grey mb-3 uppercase">
          {{ $t('total_balance') }}
        </div>
        <div class="value">
          {{ Math.floor(totalWinrBalance) }}
        </div>
      </div>
    </div>
    <div class="col-6 col-sm-4">
      <div class="text border-right">
        <div class="grey mb-3 uppercase">
          {{ $t('staked') }}
        </div>
        <div class="value">
          {{ Math.floor(winrStaked) }}
        </div>
      </div>
    </div>
    <div class="col-12 col-sm-4 mt-3 mt-sm-0">
      <div class="text">
        <div class="grey mb-3 uppercase">
          {{ $t('available_for_stake') }}
        </div>
        <div class="value">
          {{ Math.floor(winrAvailable) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('user', ['winrStaked', 'winrAvailable', 'totalWinrBalance'])
  }
}
</script>

<style lang="scss" scoped>
.balances {
  .text {
    position: relative;
    .value {
      font-size: 1.6em;
    }
    .grey {
      color: #68758c;
    }
    &.border-right {
      border-color: #293449 !important;
    }
    &.border {
      &:before {
        content: '';
        display: block;
        position: absolute;
        width: 1px;
        height: 100%;
        background: #979797;
      }
    }

    @media (max-width: 1200px) {
      font-size: 0.7em;
    }
  }
}
</style>
