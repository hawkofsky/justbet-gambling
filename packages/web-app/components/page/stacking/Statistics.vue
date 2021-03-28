<template>
  <div class="result-stats pt-5 pb-4 h-100">
    <h3 class="text-center pb-3 px-2">
      {{ $t('staking_statistics') }}
    </h3>

    <StatisticsProgress />
    <StatisticsAirdropsYesterday />
    <StatisticsAirdropsLastWeek />
    <StatisticsProportion v-if="address" />

    <div v-else class="stat-text text-center px-5 mb-4">
      <div class="d-flex align-items-center justify-content-center">
        <b>{{ $t('login_to_see') }}</b>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import StatisticsProgress from './StatisticsProgress'
import StatisticsAirdropsYesterday from './StatisticsAirdropsYesterday'
import StatisticsAirdropsLastWeek from './StatisticsAirdropsLastWeek'
import StatisticsProportion from './StatisticsProportion'

export default {
  components: {
    StatisticsProgress,
    StatisticsAirdropsYesterday,
    StatisticsAirdropsLastWeek,
    StatisticsProportion
  },
  computed: {
    ...mapState('user', ['address']),
  }
}
</script>

<style lang="scss" scoped>
.result-stats {
  background-color: #1d2738;
  border-radius: 10px;
}
</style>
