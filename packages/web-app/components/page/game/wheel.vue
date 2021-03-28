<template>
  <div class="wheel-content">
    <svg
      width="54"
      height="68"
      viewBox="0 0 54 68"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="icon icon-wheel-accessory"
    >
      <g filter="url(#filter0_d)">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M17.9271 9.16279C12.2254 13.6642 10.6862 21.6654 14.3109 27.961L27 50L39.6891 27.961C43.3138 21.6654 41.7746 13.6642 36.0729 9.16279C30.7533 4.96311 23.2467 4.96311 17.9271 9.16279Z"
          fill="#FFD000"
        />
      </g>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M27 28C30.866 28 34 24.866 34 21C34 17.134 30.866 14 27 14C23.134 14 20 17.134 20 21C20 24.866 23.134 28 27 28Z"
        fill="#C37001"
      />
      <defs>
        <filter
          id="filter0_d"
          x="0.356934"
          y="0.0130324"
          width="53.286"
          height="67.987"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="6" />
          <feGaussianBlur stdDeviation="6" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.0749702 0 0 0 0 0.106028 0 0 0 0 0.158826 0 0 0 0.3 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
    <div class="canvas-content">
      <div
        class="center-area text-center d-flex align-items-center justify-content-center"
      >
        <div v-show="timer" class="timer-content">
          <span>{{ $t('time_to_next_game') }}:</span>
          <Timer
            ref="timer"
            :show-only-seconds="true"
            :seconds="timerSeconds"
            @timeOver="timeOver"
          />
        </div>
        <div
          v-if="text"
          class="text-content d-flex align-items-center semi-bold"
        >
          {{ text }}
        </div>
      </div>
      <canvas id="canvas" width="296" height="296">
        Canvas not supported, use another browser.
      </canvas>
    </div>
  </div>
</template>

<script>
import { Timer } from '~/components/ui'
/* eslint-disable */
require('gsap')
import Winwheel from 'winwheel'
/* eslint-enable */

export default {
  components: {
    Timer
  },
  data() {
    return {
      timer: true,
      timerSeconds: 120,
      text: '',
      segments: [
        { fillStyle: '#29DF40', text: '1' },
        { fillStyle: '#283346', text: '2' },
        { fillStyle: '#29DF40', text: '3' },
        { fillStyle: '#283346', text: '4' },
        { fillStyle: '#DA0635', text: '5' },
        { fillStyle: '#117BD9', text: '6' },
        { fillStyle: '#DA0635', text: '7' },
        { fillStyle: '#283346', text: '8' },
        { fillStyle: '#29DF40', text: '9' },
        { fillStyle: '#283346', text: '10' },
        { fillStyle: '#29DF40', text: '11' },
        { fillStyle: '#283346', text: '12' },
        { fillStyle: '#29DF40', text: '13' },
        { fillStyle: '#283346', text: '14' },
        { fillStyle: '#29DF40', text: '15' },
        { fillStyle: '#283346', text: '16' },
        { fillStyle: '#DA0635', text: '17' },
        { fillStyle: '#283346', text: '18' },
        { fillStyle: '#DA0635', text: '19' },
        { fillStyle: '#283346', text: '20' },
        { fillStyle: '#29DF40', text: '21' },
        { fillStyle: '#283346', text: '22' },
        { fillStyle: '#29DF40', text: '23' },
        { fillStyle: '#283346', text: '24' },
        { fillStyle: '#29DF40', text: '25' },
        { fillStyle: '#283346', text: '26' },
        { fillStyle: '#DA0635', text: '27' },
        { fillStyle: '#283346', text: '28' },
        { fillStyle: '#DA0635', text: '29' },
        { fillStyle: '#283346', text: '30' },
        { fillStyle: '#29DF40', text: '31' },
        { fillStyle: '#283346', text: '32' },
        { fillStyle: '#29DF40', text: '33' },
        { fillStyle: '#283346', text: '34' },
        { fillStyle: '#29DF40', text: '35' },
        { fillStyle: '#283346', text: '36' },
        { fillStyle: '#DA0635', text: '37' },
        { fillStyle: '#283346', text: '38' },
        { fillStyle: '#DA0635', text: '39' },
        { fillStyle: '#283346', text: '40' },
        { fillStyle: '#29DF40', text: '41' },
        { fillStyle: '#283346', text: '42' },
        { fillStyle: '#29DF40', text: '43' },
        { fillStyle: '#283346', text: '44' },
        { fillStyle: '#29DF40', text: '45' },
        { fillStyle: '#283346', text: '46' },
        { fillStyle: '#DA0635', text: '47' },
        { fillStyle: '#283346', text: '48' },
        { fillStyle: '#DA0635', text: '49' },
        { fillStyle: '#283346', text: '50' },
        { fillStyle: '#29DF40', text: '51' },
        { fillStyle: '#283346', text: '52' },
        { fillStyle: '#29DF40', text: '53' },
        { fillStyle: '#283346', text: '54' }
      ]
    }
  },
  watch: {},
  mounted() {
    /* eslint-disable */
    window.wheelCallback = () => {}
    let theWheel = new Winwheel({
      numSegments: 54, // Number of segments
      outerRadius: 148, // The size of the wheel.
      centerX: 148, // Used to position on the background correctly.
      centerY: 148,
      textFontSize: 0, // Font size.
      lineWidth: 0,
      strokeStyle: '#000',
      segments: this.segments
    })
    this.theWheel = theWheel
  },
  methods: {
    timeOver() {
      // alert('test')
      this.setText('Spinning Now!')
      setTimeout(() => {
        this.setText('')
        this.$emit('timeOver', true)
      }, 3500);
    },
    resetWheel() {
      try {
        this.theWheel.stopAnimation(false)
      } // Stop the animation, false as param so does not call callback function
      catch(e) {}
      this.theWheel.rotationAngle = 0 // Re-set the wheel angle to 0 degrees.
      this.theWheel.draw() // Call draw to render changes to the wheel.
    },
    spin() {
      this.resetWheel()
      // this.theWheel.animation.spins = 5
      this.theWheel.startAnimation()
      setTimeout(() => {
        const segment = this.theWheel.getIndicatedSegment()
        this.$emit('input', segment.text)
        this.theWheel.stopAnimation(false) // Stop the animation, false as param so does not call callback function.
        // this.theWheel.animation.stopAngle = 130
        // this.theWheel.animation.stopAngle = stopAt
        this.theWheel.animation.type = 'spinOngoing'
        this.theWheel.animation.easing = 'Linear.easeNone'
        // this.theWheel.animation.duration = 2
        this.theWheel.animation.repeat = -1
        this.theWheel.draw()
        this.theWheel.startAnimation()
      }, 1100)
    },
    stop(num) {
      const prizeNumber = num
      const stopAt = (360 / 54) * prizeNumber - 360 / 54 / 2

      this.theWheel.stopAnimation(stopAt)
    },
    startTimer(seconds) {
      this.$set(this, 'timer', true)
      this.$set(this, 'timerSeconds', seconds)
      this.$set(this, 'text', '')
      this.$refs.timer.start(seconds)
    },
    setText(text) {
      this.$set(this, 'text', text)
      this.$set(this, 'timer', false)
    },
    wheelCallback() {
      // eslint-disable-next-line
      alert('test')
    }
  }
}
</script>

<style lang="scss" scoped>
.wheel-content {
  width: 280px;
  position: relative;
  padding-top: 35px;
  .icon-wheel-accessory {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 9;
  }
  .canvas-content {
    position: relative;
    overflow: hidden;
    width: 280px;
    height: 280px;
    border-radius: 100%;
    &:before {
      content: '';
      display: block;
      z-index: 1;
      width: 280px;
      height: 280px;
      position: absolute;
      border: 12px solid rgba(79, 93, 117, 0.25);
      border-radius: 100%;
      pointer-events: none;
    }
    canvas {
      margin: -8px 0 0 -8px;
    }
    .center-area {
      position: absolute;
      z-index: 2;
      width: 200px;
      height: 200px;
      left: 40px;
      top: 40px;
      background: url(~assets/images/wheel-game/coin-bg.png) no-repeat center
        center #1d2738;
      border-radius: 100%;
      box-shadow: 0px 0px 0px 12px rgba(35, 45, 64, 0.6),
        inset 0px 6px 1px 0px #131b29;
      .timer-content {
        span {
          font-size: 0.8em;
        }
        .timer {
          font-size: 1.65em;
          font-weight: 600;
        }
      }
      .text-content {
        font-size: 1em;
        svg {
          width: 16px;
          fill: #fff;
        }
      }
    }
  }
}
</style>
