<template>
  <div class="coin-box">
    <div class="coin-box-item coin-box-item__front" :style="coinStyle(0)"></div>
    <div class="coin-box-item coin-box-item__back" :style="coinStyle(1)"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      animationReqId: 0,
      dtStart: 0,
      dtLast: 0,
      rotation: 0,
      doAnim: false,
      stopAt: 'heads',
      speed: 0,
      stage: 'none',
      toGo: 0
    }
  },
  methods: {
    /**
     * Coin animation
     *
     * @public This is a public method
     */
    animate() {
      const dtNow = new Date().getTime()
      const time = dtNow - this.dtLast

      // start animation
      if (this.stage === 'spin_up') {
        const increment = Math.sqrt(dtNow - this.dtStart) / 10000
        this.speed += increment

        this.speed = Math.min(this.speed, 0.5)

        this.rotation = (this.rotation + time * this.speed) % 360
      }

      // end animation
      if (this.stage === 'spin_down') {
        this.speed = Math.min(Math.sqrt(this.toGo) / 70, this.speed)
        this.speed = Math.max(this.speed, 0)

        this.rotation = (this.rotation + time * this.speed) % 360
        this.toGo -= time * this.speed
        this.toGo = Math.max(this.toGo, 0)

        if (this.speed < 0.0001) {
          this.doAnim = false
          this.$store.commit('user/setIsPlaying', false)
        }
      }

      // restart animation function
      if (this.doAnim)
        this.animationReqId = window.requestAnimationFrame(
          this.animate.bind(this)
        )

      this.dtLast = dtNow
    },
    /**
     * Start coin animation
     *
     * @public This is a public method
     */
    start() {
      if (this.doAnim) return
      this.dtStart = new Date().getTime()
      this.dtLast = this.dtStart

      this.speed = 0
      this.stage = 'spin_up'
      this.doAnim = true
      this.animate()
      this.$store.commit('user/setIsPlaying', true)
    },
    /**
     * Stop coin animation
     *
     * @param {String} stopAt Side of the coin
     * @public This is a public method
     */
    async stop(stopAt = 'heads') {
      this.stopAt = stopAt
      this.stage = 'spin_down'

      this.toGo = 720 * 2 - this.rotation + (stopAt === 'tails' ? 180 : 0)
      while (this.doAnim) await this.delay(20)
    },
    /**
     * Set coin rotation coin
     * It used for animation method
     *
     * @param {String} isBack Side of the coin
     * @public This is a public method
     */
    coinStyle(isBack = 0) {
      return {
        transform: `rotateY(${isBack ? this.rotation - 180 : this.rotation}deg)`
      }
    },
    /**
     * Change coin side
     *
     * @public This is a public method
     */
    async turn() {
      this.doAnim = true

      for (let i = 0; i < 18; i++) {
        this.rotation += 10
        await this.delay(20)
      }

      if (this.stopAt === 'heads') {
        this.stopAt = 'tails'
      } else {
        this.stopAt = 'heads'
      }

      this.doAnim = false
    }
  }
}
</script>

<style lang="scss" scoped>
.coin-box {
  height: 240px;
  width: 220px;

  &-item {
    backface-visibility: hidden;
    background-position: center;
    background-repeat: no-repeat;
    background-color: transparent;
    background-size: contain;
    position: absolute;
    height: 240px;
    width: 220px;

    &__front {
      background-image: url('/flip-front.svg');
    }

    &__back {
      background-image: url('/flip-back.svg');
    }
  }
}
</style>
