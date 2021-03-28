<template>
  <div :class="`loader ${loading ? 'loading' : 'loaded'}`">
    <template v-if="loading">
      <b-progress :value="progress" variant="danger"></b-progress>
      <svg class="icon-loader" viewBox="0 0 100 100">
        <use xlink:href="#icon-loader"></use>
      </svg>
    </template>
    <div class="loading-area">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      progress: 0,
      progressInterval: null
    }
  },
  computed: {
    loading() {
      return this.$store.state.system.loading
    }
  },
  watch: {
    loading() {
      if (!this.loading) {
        clearInterval(this.progressInterval)
        this.$set(this, 'progress', 0)
      } else {
        this.randomProgress()
      }
    }
  },
  methods: {
    randomProgress() {
      this.progressInterval = setInterval(() => {
        const progress =
          Math.floor(Math.random() * (100 - this.progress)) + this.progress
        this.$set(this, 'progress', progress)
      }, 300)
    }
  }
}
</script>

<style lang="scss" scope>
.loader {
  position: relative;
  .icon-loader {
    position: fixed;
    width: 50px;
    left: 50%;
    top: 50%;
    z-index: 9;
    margin: -25px 0 0 -25px;
    fill: #d9113a;
  }
  .loading-area {
    transition: 1000ms;
  }
  &.loading {
    .loading-area {
      filter: blur(8px);
      opacity: 0.4;
    }
  }
  &.loaded {
    .loading-area {
      // filter: blur(0px);
      opacity: 1;
    }
  }
  .progress {
    opacity: 0.5;
    position: fixed;
    z-index: 1;
    width: 100%;
    height: 2px;
    top: 0;
    background: #121d2b;
    border-radius: 0;
    .bg-danger {
      background: #d9113a !important;
      transition: 300ms;
    }
  }
}
@media (max-width: 768px) {
  .loader {
    .progress {
      top: 70px;
    }
  }
}
</style>
