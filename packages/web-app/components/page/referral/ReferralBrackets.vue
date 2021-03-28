<template>
  <div
    class="charts d-flex flex-wrap flex-lg-nowrap justify-content-center my-5 pb-5"
  >
    <div class="chart mb-5 mb-lg-0">
      <Chart
        :percent="(normalCompleted / 5) * 100"
        :name="$t('normal')"
        :rate="1"
        :completed="normalCompleted"
        color="#7BDE2C"
        img-color="normal"
        total="5"
      />
    </div>
    <div class="chart mb-5 mb-lg-0">
      <Chart
        :percent="(bronzeCompleted / 5) * 100"
        :name="$t('bronze')"
        :rate="1.2"
        :completed="bronzeCompleted"
        color="#E59121"
        img-color="bronze"
        total="5"
      />
    </div>
    <div class="chart mb-5 mb-lg-0">
      <Chart
        :percent="(silverCompleted / 5) * 100"
        :name="$t('silver')"
        :rate="1.4"
        :completed="silverCompleted"
        color="#7BDE2C"
        img-color="silver"
        total="5"
      />
    </div>
    <div class="chart mb-5 mb-lg-0">
      <Chart
        :percent="(goldCompleted / 5) * 100"
        :name="$t('gold')"
        :rate="1.6"
        :completed="goldCompleted"
        color="#7BDE2C"
        img-color="gold"
        total="5"
      />
    </div>
    <div class="chart mb-5 mb-lg-0">
      <Chart
        :percent="(platCompleted / 5) * 100"
        :name="$t('platinum')"
        :rate="1.8"
        :completed="platCompleted"
        color="#7BDE2C"
        img-color="platinum"
        total="5"
      />
    </div>
    <div class="chart mb-5 mb-lg-0">
      <Chart
        :percent="(diamondCompleted / 5) * 100"
        :name="$t('diamond')"
        :rate="2"
        :completed="diamondCompleted"
        color="#7BDE2C"
        img-color="diamond"
        total="5"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import Chart from './Chart'

export default {
  components: {
    Chart
  },
  computed: {
    ...mapState('user', ['refCount']),
    normalCompleted() {
      const val = this.refCount >= 5 ? 5 : this.refCount
      return val > 0 ? val : 0
    },
    bronzeCompleted() {
      const val = this.refCount >= 10 ? 5 : this.refCount - 5
      return val > 0 ? val : 0
    },
    silverCompleted() {
      const val = this.refCount >= 15 ? 5 : this.refCount - 10
      return val > 0 ? val : 0
    },
    goldCompleted() {
      const val = this.refCount >= 20 ? 5 : this.refCount - 15
      return val > 0 ? val : 0
    },
    platCompleted() {
      const val = this.refCount >= 25 ? 5 : this.refCount - 20
      return val > 0 ? val : 0
    },
    diamondCompleted() {
      const val = this.refCount >= 30 ? 5 : this.refCount - 25
      return val > 0 ? val : 0
    }
  }
}
</script>

<style lang="scss" scoped>
.charts {
  .chart {
    width: 50%;

    @media (min-width: 500px) {
      width: 33.33333%;
    }

    @media (min-width: 992px) {
      width: 20%;
    }
  }
}
</style>
