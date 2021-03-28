<template>
  <div class="timer">
    {{ shownVal }}
  </div>
</template>

<script>
import Timer from 'easytimer'

export default {
  props: {
    showOnlySeconds: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      value: '00:00:00'
    }
  },
  computed: {
    shownVal() {
      return this.showOnlySeconds ? this.value.split(':')[2] : this.value
    }
  },
  mounted() {
    this.timer = new Timer()
    this.timer.addEventListener('secondsUpdated', this.secondsUpdated)
  },
  methods: {
    start(seconds) {
      this.$set(this, 'value', '00:00:00')
      this.timer.stop()
      this.timer.start({
        countdown: true,
        startValues: { seconds }
      })
    },
    secondsUpdated(e) {
      // eslint-disable-next-line
      console.log('timer', this.value)
      if (this.value === '00:00:01') {
        setTimeout(() => {
          this.$emit('timeOver', true)
        }, 1000)
      }
      this.$set(this, 'value', this.timer.getTimeValues().toString())
    }
  }
}
</script>
