<template>
  <div class="range-slider">
    <div id="range-slider"></div>
    <div class="start">
      {{ min }}
    </div>
    <div class="finish">
      {{ max }}
    </div>
  </div>
</template>

<script>
import wNumb from 'wnumb'
import noUiSlider from 'nouislider'
import 'nouislider/distribute/nouislider.min.css'

export default {
  props: {
    value: {
      type: Array,
      default: () => [20, 80]
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    house: {
      type: Number,
      default: 1
    }
  },
  mounted() {
    const slider = document.getElementById('range-slider')

    noUiSlider.create(slider, {
      start: this.value,
      tooltips: [wNumb({ decimals: 2 }), wNumb({ decimals: 2 })],
      connect: true,
      margin: 2,
      limit: 99,
      range: {
        min: this.min,
        max: this.max
      }
    })

    slider.noUiSlider.on('update', () => {
      this.$emit('input', slider.noUiSlider.get())
    })
  }
}
</script>

<style lang="scss" scope>
.range-slider {
  position: relative;
  .noUi-target {
    background: #344158;
    border: 0;
    height: 3px;
    box-shadow: none;
    border-radius: 3px;
    .noUi-connect {
      background: #d9113a;
    }
  }
  .noUi-horizontal {
    .noUi-handle {
      background: #d9113a;
      width: 30px;
      height: 30px;
      top: -13px;
      border: 0;
      box-shadow: none;
      &:before {
        width: 10px;
        height: 10px;
        border: 0;
        background: #fff;
        top: 50%;
        left: 50%;
        border-radius: 2px;
        margin-top: -5px;
        margin-left: -5px;
      }
      &:after {
        display: none;
      }
    }
    .noUi-tooltip {
      top: 35px;
      bottom: auto;
      background: transparent;
      border: 0;
      color: #fff;
    }
  }
  .finish,
  .start {
    position: absolute;
    top: 28px;
    color: #68758c;
  }
  .finish {
    right: 0;
  }
  .start {
    left: 0;
  }
}
</style>
