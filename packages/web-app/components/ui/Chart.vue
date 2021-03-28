<template>
  <div :class="`chart ${loaded ? 'loaded' : 'loading'}`">
    <div
      :class="
        `value semi-bold ${valueType} ${show && !isPlayed ? 'show' : 'hide'}`
      "
      :style="{ left: getValueLeftSpace() }"
    >
      <span>{{ number }}</span>
    </div>
    <canvas id="chart" class="chart-canvas" height="100"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js'
import _ from 'lodash'

export default {
  props: {
    chartData: {
      type: Array,
      default: () => [
        { rate: 0, value: '' },
        { rate: 0, value: '' },
        { rate: 0, value: '' },
        { rate: 0, value: '' },
        { rate: 0, value: '' },
        { rate: 0, value: '' },
        { rate: 0, value: '' },
        { rate: 0, value: '' },
        { rate: 0, value: '' },
        { rate: 0, value: '' },
        { rate: 0, value: '' },
        { rate: 0, value: '' },
        { rate: 0, value: '' },
        { rate: 0, value: '' },
        { rate: 0, value: '' },
        { rate: 0, value: '' },
        { rate: 0, value: '' },
        { rate: 0, value: '' }
      ]
    },
    value: {
      type: Number,
      default: 50
    },
    isPlayed: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loaded: false,
      show: false,
      number: this.value,
      valueType: ''
    }
  },
  watch: {
    value() {
      this.$set(this, 'show', false)
      setTimeout(() => {
        this.$set(this, 'number', this.value)
        setTimeout(() => {
          this.$set(this, 'show', true)
        }, 250)
      }, 250)
    },
    chartData() {
      this.updateChart()
    }
  },
  mounted() {
    this.updateChart()
  },
  methods: {
    updateChart() {
      Chart.defaults.scale.ticks.display = false

      const titles = _.map(this.chartData, data => data.value)
      const values = _.map(this.chartData, data => data.rate)

      const barCtx = document.getElementById('chart').getContext('2d')

      const purpleOrangeGradient = barCtx.createLinearGradient(0, 0, 0, 100)
      purpleOrangeGradient.addColorStop(0, '#D9113A')
      purpleOrangeGradient.addColorStop(0.96, '#1D2738')

      const draw = Chart.controllers.line.prototype.draw
      Chart.controllers.line = Chart.controllers.line.extend({
        draw: function() {
          draw.apply(this, arguments)
          const ctx = this.chart.chart.ctx
          const stroke = ctx.stroke
          ctx.stroke = function() {
            ctx.save()
            ctx.shadowColor = '#18202E'
            ctx.shadowBlur = 10
            ctx.shadowOffsetX = 0
            ctx.shadowOffsetY = 0
            stroke.apply(this, arguments)
            ctx.restore()
          }
        }
      })

      const barChart = new Chart(barCtx, {
        type: 'line',
        data: {
          labels: titles,
          datasets: [
            {
              label: { display: false },
              data: values,
              borderColor: '#D9113A',
              borderWidth: 2,
              pointRadius: 0,
              pointBorderWidth: 0,
              pointBackgroundColor: 'transparent',
              backgroundColor: purpleOrangeGradient,
              hoverBackgroundColor: purpleOrangeGradient,
              hoverBorderWidth: 2,
              hoverBorderColor: 'purple'
            }
          ]
        },
        options: {
          legend: {
            display: false
          },
          tooltips: {
            callbacks: {
              label: function(tooltipItem) {}
            }
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  suggestedMin: 0,
                  suggestedMax: 40,
                  display: false
                },
                gridLines: {
                  drawBorder: false,
                  drawOnChartArea: false,
                  display: false
                }
              }
            ],
            xAxes: [
              {
                ticks: {
                  suggestedMin: 0,
                  suggestedMax: 18,
                  display: false
                },
                gridLines: {
                  drawBorder: false,
                  drawOnChartArea: false,
                  display: false
                }
              }
            ]
          }
        }
      })

      this.$set(this, 'loaded', true)
      return barChart
    },
    getValueLeftSpace() {
      let leftSpace = this.number
      let valueType = 'flat'

      if (this.number > 97) {
        leftSpace = 99
        valueType = 'half'
      } else if (this.number < 2) {
        leftSpace = 1
      }

      this.$set(this, 'valueType', valueType)

      return leftSpace + '%'
    }
  }
}
</script>

<style lang="scss" scope>
.chart {
  position: relative;
  margin: 0 0 -10px -10px;
  .value {
    font-size: 3em;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    transition: 250ms;
    &.half {
      font-size: 2.5em;
    }
    &.hide {
      transform: scale(0) translateX(-50%) translateY(-50%);
      opacity: 0;
    }
    &.show {
      transform: scale(1) translateX(-50%) translateY(-50%);
      opacity: 1;
    }
    &:before {
      content: '';
      display: block;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translateX(-50%) translateY(-50%);
      width: 250px;
      height: 250px;
      opacity: 1;
      transition: 400ms;
      pointer-events: none;
      filter: blur(15px);
      background: rgb(245, 53, 93);
      background: radial-gradient(
        circle,
        rgba(245, 53, 93, 0.5) 0%,
        rgba(0, 0, 0, 0) 70%
      );
    }
    &:after {
      content: '';
      display: block;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translateX(-50%) translateY(120%);
      width: 2px;
      height: 30px;
      background: #fff;
    }
    span {
      position: relative;
      z-index: 1;
    }
  }
  .chart-canvas {
    display: block;
    width: 100%;
    height: 120px;
  }
}
@media (max-width: 768px) {
  .chart {
    .value {
      font-size: 4em;
    }
  }
}
</style>
