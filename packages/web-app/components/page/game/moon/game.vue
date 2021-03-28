<template>
  <div class="moon-game-area w-100">
    <div v-show="wait" class="timer-content">
      <span>{{ $t('preparing') }}</span>
    </div>
    <div v-show="timer" class="timer-content">
      <span>{{ $t('time_to_next_game') }}: </span>
      <Timer ref="timer" :seconds="timerSeconds" />
    </div>
    <template v-if="!timer && !wait">
      <div :class="`rocket ${rocketStatus}`">
        <svg viewBox="0 0 39 65" class="icon icon-moon-rocket">
          <use xlink:href="#icon-moon-rocket"></use>
        </svg>
        <svg viewBox="0 0 21 26" class="crash-icon">
          <use xlink:href="#icon-moon-rocket-crash-fire"></use>
        </svg>
        <svg viewBox="0 0 76 72" class="crash-cloud">
          <use xlink:href="#icon-moon-rocket-crash-cloud"></use>
        </svg>
        <div class="fly-fire"></div>
      </div>
      <div
        :class="
          `score ${
            score ? 'show' : 'hide'
          } ${scoreType} d-flex align-items-center`
        "
      >
        <svg
          v-if="scoreType == 'up'"
          viewBox="0 0 9 11"
          class="score-icon mr-2"
        >
          <use xlink:href="#icon-arrow-up"></use>
        </svg>
        <svg v-else viewBox="0 0 9 11" class="score-icon mr-2">
          <use xlink:href="#icon-arrow-down"></use>
        </svg>
        {{ score }}x
      </div>
    </template>
  </div>
</template>

<script>
import { Timer } from '~/components/ui'

export default {
  components: {
    Timer
  },
  data() {
    return {
      rocketStatus: '',
      timerSeconds: 120,
      timer: false,
      score: 0,
      scoreType: '',
      wait: false
    }
  },
  mounted() {
    this.test()
  },
  methods: {
    fly() {
      this.$set(this, 'rocketStatus', '')
      setTimeout(() => {
        this.$set(this, 'rocketStatus', 'fly')
      }, 100)
    },
    crash() {
      this.$set(this, 'rocketStatus', 'crash')
    },
    setScore(score, type = 'up') {
      this.$set(this, 'scoreType', type)
      this.$set(this, 'score', score)
    },
    refresh() {
      this.$set(this, 'timer', false)
      this.$set(this, 'wait', false)
      this.$set(this, 'rocketStatus', '')
      this.$set(this, 'scoreType', '')
      this.$set(this, 'score', '')
    },
    startTimer(seconds) {
      if (!this.timer) {
        this.$set(this, 'timer', true)
        this.$set(this, 'wait', false)
        this.$set(this, 'timerSeconds', seconds)
        this.$refs.timer.start(seconds)
      }
    },
    waitFor() {
      this.$set(this, 'wait', true)
      this.$set(this, 'timer', false)
    },
    test() {}
  }
}
</script>

<style lang="scss" scoped>
@keyframes flyFire {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.75;
  }
  100% {
    opacity: 1;
  }
}

.moon-game-area {
  font-size: 0.8em;
  position: relative;
  height: 200px;
  z-index: 2;
  .rocket {
    position: absolute;
    left: 50%;
    transform: translate(-15px, 318px);
    opacity: 0;
    svg.icon {
      position: relative;
      width: 30px;
      z-index: 1;
    }
    svg.crash-cloud,
    svg.crash-icon {
      position: absolute;
      opacity: 0;
    }
    svg.crash-icon {
      width: 15px;
      left: 50%;
      margin-left: -8px;
      bottom: -4px;
      transition: 1000ms ease-in;
    }
    svg.crash-cloud {
      top: -10px;
      width: 50px;
      left: -10px;
      transition: 3000ms ease-in;
    }
    &.fly {
      z-index: 1;
      transform: translate(-15px, 50px);
      opacity: 1;
      transition: 3000ms ease-out;
      .fly-fire {
        position: absolute;
        width: 2px;
        height: 9px;
        background: #ffd000;
        border-radius: 2px;
        bottom: 3px;
        left: 50%;
        margin: 0 0 0 -1px;
        animation: flyFire 0.5s linear infinite;
        &:after,
        &:before {
          content: '';
          display: block;
          position: absolute;
          width: 2px;
          height: 9px;
          background: #ffd000;
          border-radius: 2px;
        }
        &:before {
          left: -4px;
          top: 3px;
          animation: flyFire 0.5s linear infinite;
          animation-delay: 0.25s;
        }
        &:after {
          left: 4px;
          top: 5px;
          animation: flyFire 0.5s linear infinite;
          animation-delay: 0.5s;
        }
      }
    }
    &.crash {
      transform: translate(-15px, 50px);
      opacity: 1;
      svg.crash-icon,
      svg.crash-cloud {
        opacity: 1;
      }
    }
  }
  .score {
    position: absolute;
    top: 110px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0em;
    font-weight: bold;
    height: 100px;
    svg {
      width: 0px;
    }
    &.show {
      transition-delay: 100ms;
      transition: 500ms font-size cubic-bezier(0.18, 0.89, 0.32, 1.28);
      font-size: 5.5em;
      svg {
        transition-delay: 500ms;
        transition: 500ms width ease-out;
        width: 25px;
      }
    }
    &.up {
      svg {
        fill: #fff;
      }
    }
    &.down {
      color: #ed395e;
      svg {
        fill: #ed395e;
      }
    }
  }
  .timer-content {
    position: absolute;
    top: 70px;
    left: 50%;
    transform: translateX(-50%);
    font-weight: bold;
    text-align: center;
    .timer {
      font-size: 5.5em;
      line-height: 1.4em;
    }
    span {
      font-size: 1.5em;
    }
  }
}
</style>
