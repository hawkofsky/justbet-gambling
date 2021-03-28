<template>
  <div
    class="circular-progress mx-auto"
    :style="{ width: `${width}px`, height: `${height}px` }"
  >
    <div
      v-for="key in count"
      :key="key"
      :style="{
        transform: `rotate(${(360 / count) * key}deg)`
      }"
      class="cp-progress-bar"
    >
      <div
        class="cp-bar"
        :style="{
          marginTop: `-${width / 2 - 20}px`,
          background: getColor(key)
        }"
      ></div>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    width: {
      type: Number,
      default: 200
    },
    count: {
      type: Number,
      default: 52
    },
    percent: {
      type: Number,
      default: 0
    },
    defaultColor: {
      type: String,
      default: '#334159'
    },
    colours: {
      type: Array,
      default: () => ['#FFD000', '#D9113A']
    }
  },
  data() {
    return {
      height: this.width
    }
  },
  computed: {
    filled() {
      return ((this.count / 100) * this.percent).toFixed(0)
    },
    colorStart() {
      return this.hexToRgb(this.colours[0])
    },
    colorEnd() {
      return this.hexToRgb(this.colours[1])
    }
  },
  methods: {
    hexToRgb(hex) {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
      return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
          }
        : null
    },
    graidentCalc(color1, color2, weight) {
      const p = (1 / this.count) * weight
      const w = p * 2 - 1
      const w1 = (w / 1 + 1) / 2

      const w2 = 1 - w1
      const rgb = [
        Math.round(color1.r * w1 + color2.r * w2),
        Math.round(color1.g * w1 + color2.g * w2),
        Math.round(color1.b * w1 + color2.b * w2)
      ]

      return rgb
    },
    getColor(index) {
      if (index < this.filled) {
        const rgbArray = this.graidentCalc(
          this.colorEnd,
          this.colorStart,
          index
        )
        return `rgb(${rgbArray[0]}, ${rgbArray[1]}, ${rgbArray[2]})`
      }

      return this.defaultColor
    }
  }
}
</script>

<style lang="scss">
.circular-progress {
  position: relative;
  .cp-progress-bar {
    position: absolute;
    width: 2px;
    height: 2px;
    left: 50%;
    top: 50%;
    margin: -1px 0 0 -1px;
    .cp-bar {
      width: 2px;
      height: 25px;
      border-radius: 4px;
    }
  }
}
</style>
