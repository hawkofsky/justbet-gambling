<template>
  <div class="pt-4 pb-5">
    <div class="d-flex justify-content-center">
      <div class="col-md-9">
        <Counter
          :date="counterDate"
          :colors="{
            backgroundColor: '#ffbb01',
            shadow: '#c86908',
            color: '#CD8103'
          }"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import { Counter } from '~/components/ui/'

export default {
  components: {
    Counter
  },
  data() {
    return {
      counterDate: 0
    }
  },
  mounted() {
    const today = new Date()
    const timeEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12, 0, 0)
    const timeNow = new Date().getTime()
    const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 12, 0, 0)

    if (timeNow > timeEnd.getTime()) {
      this.counterDate = tomorrow.getTime() / 1000
    } else {
      this.counterDate = timeEnd.getTime() / 1000
    }
  }
}
</script>
