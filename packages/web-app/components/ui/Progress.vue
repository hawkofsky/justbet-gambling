<template>
  <div class="custom-progress">
    <div class="progress-bar h-100" :style="{ width: `${percent}%` }">
      <div class="point h-100">
        <div class="value">
          {{ value.toShort(0) }}
        </div>
        <div class="icon">
          <div class="percent">
            {{ percentFirst }}.<span>{{ priceLast }}%</span>
          </div>
          <img src="~/assets/images/coin-winr.png" alt="" />
        </div>
      </div>
    </div>
    <div class="delimiters d-flex justify-content-between grey w-100">
      <span>0%</span>
      <span>50%</span>
      <span>100%</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    percent: {
      type: Number,
      default: 0
    },
    value: {
      type: Number,
      default: 0
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
    },
    percentFirst() {
      const percent = this.percent
      const percentArr = percent.toString().split('.')

      return percentArr[0]
    },
    priceLast() {
      const percent = this.percent
      const percentArr = percent.toFixed(3).split('.')

      if (percentArr[1]) {
        return percentArr[1]
      }

      return '0'
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
.custom-progress {
  position: relative;
  height: 20px;
  border-radius: 10px;
  background: #334159;
  .progress-bar {
    position: relative;
    background: linear-gradient(
      80deg,
      rgba(217, 17, 58, 1) 0%,
      rgba(255, 208, 0, 1) 100%
    );
    border-radius: 10px 10px 10px 10px;
    max-width: 100%;
    .point {
      position: absolute;
      right: 0;
      .icon {
        position: absolute;
        width: 18px;
        height: 18px;
        border: 4px solid #1d2738;
        border-radius: 100%;
        top: -8px;
        right: -8px;
        img {
          position: absolute;
          top: 0;
          left: 0;
          width: 10px;
          height: 10px;
        }
        .percent {
          position: absolute;
          top: -30px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 1.4em;
          span {
            font-size: 0.7em;
          }
        }
      }
      .value {
        color: #0f1826;
        opacity: 0.4;
        line-height: 2.3em;
        padding: 0 10px 0 0;
        font-size: 0.7em;
      }
    }
  }
  .delimiters {
    position: absolute;
    top: 100%;
    left: 0;
    padding: 10px 0 0 0;
    font-size: 0.8em;
    font-weight: 600;
  }
}
</style>
