<template>
  <div class="timeline">
    <div class="line" :style="lineWidth ? { width: lineWidth } : {}">
      <div
        v-for="(time, key) in times"
        :key="key"
        :style="{ width: getWidth(key) }"
        :class="
          `time-card-content ${time.isActive ? 'active' : ''} ${
            key == lastItem ? 'last-item' : ''
          }`
        "
      >
        <div
          :class="
            `time-card text-center px-3 pt-2 pb-3 ${key % 2 ? 'top' : 'bottom'}`
          "
        >
          <div class="time semi-bold mb-2">{{ time.time }}</div>
          <p v-html="time.description"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    times: {
      type: Array,
      default: () => [
        {
          time: 'DEC 2018',
          description: 'Idea Emerged',
          isActive: true
        },
        {
          time: 'JAN 2019',
          description: 'Planning Begun',
          isActive: true
        },
        {
          time: 'FEB 2019',
          description: 'Whitepapper v1<br />Completed',
          isActive: true
        },
        {
          time: 'MAR 2019',
          description: 'Design and<br />Development Begun',
          isActive: true
        },
        {
          time: 'JUN 2019',
          description: 'First Private<br />Alpha Release',
          isActive: true
        },
        {
          time: 'AUG 2019',
          description: 'First Private<br />Beta Release',
          isActive: true
        },
        {
          time: 'OCT 2019',
          description: 'Extensive Simulations<br>and Testing',
          isActive: true
        },
        {
          time: 'JAN 2020',
          description: 'Addition of<br>New Features',
          isActive: true
        },
        {
          time: 'MAR 2020',
          description: 'Seed Investment',
          isActive: true
        },
        {
          time: 'MAY 2020',
          description: 'Partnership<br>with Bitmart',
          isActive: true
        },
        {
          time: 'JUN 2020',
          description: 'IEO'
        },
        {
          time: 'JUN 2020',
          description: 'Massive User<br/>Acquisition Campaign'
        },
        {
          time: 'JUL 2020',
          description: 'Addition of New<br/>Traditional Games'
        },
        {
          time: 'SEP 2020',
          description: 'Addition of<br/>Direct Fiat Gateway'
        },
        {
          time: 'NOV 2020',
          description: 'Launch of the<br/>P2P Sports Betting'
        }
      ]
    }
  },
  data() {
    return {
      width: 0,
      lineWidth: false,
      lastItem: 0
    }
  },
  mounted() {
    let lastItem = 0
    this.times.map((item, key) => {
      if (item.isActive) {
        lastItem = key
      }
    })
    this.$set(this, 'lastItem', lastItem)

    window.onresize = this.setWidth
    this.setWidth()
  },
  methods: {
    getWidth(key) {
      const ext = 'px'
      key++

      return this.width * key + ext
    },
    setWidth() {
      const width = 100

      this.$set(this, 'lineWidth', this.times.length * width + width + 'px')

      this.$set(this, 'width', width)
    }
  }
}
</script>

<style lang="scss" scoped>
.timeline {
  position: relative;
  height: 300px;
  .line {
    position: absolute;
    top: 50%;
    margin-top: -2px;
    background: #1d2738;
    width: 100%;
    height: 4px;
    border-radius: 4px;
    .time-card-content {
      position: absolute;
      left: 0;
      top: 0;
      height: 4px;
      border-radius: 4px;
      &:before {
        content: '';
        display: block;
        width: 18px;
        height: 18px;
        border: 4px solid #68758c;
        border-radius: 100%;
        position: absolute;
        right: -8px;
        top: -7px;
        z-index: 2;
      }
      .time-card {
        position: absolute;
        background: #1d2738;
        width: 190px;
        border-radius: 10px;
        z-index: 3;
        right: 0%;
        transform: translateX(49%);
        &:before {
          content: '';
          display: block;
          position: absolute;
          border-width: 10px;
          border-style: solid;
          border-top-color: #1d2738;
          border-left-color: transparent;
          border-right-color: transparent;
          border-bottom-color: transparent;
        }
        &.bottom {
          top: 45px;
          &:before {
            border-top-color: transparent;
            border-bottom-color: #1d2738;
            top: -20px;
            left: 50%;
            margin-left: -10px;
          }
        }
        &.top {
          bottom: 45px;
          &:before {
            bottom: -20px;
            left: 50%;
            margin-left: -10px;
          }
        }
        .time {
          background: #68758c;
          display: inline-block;
          border-radius: 20px;
          line-height: 10px;
          padding: 8px 10px 5px;
          font-size: 0.8em;
        }
        p {
          margin-bottom: 0;
        }
      }
      &.active {
        background: #d9113a;
        &:before {
          background-color: #050f1e;
          border: 4px solid #d9113a;
          box-shadow: 0px 10px 20px #d9113a;
        }
        &.last-item {
          box-shadow: 0px 10px 20px #d9113a;
        }
        .time {
          background: #d9113a;
        }
      }
    }
  }
}
@media (max-width: 1280px) {
  .timeline {
    overflow: auto;
    /* margin: 0 calc(-3rem + -15px); */
  }
}
</style>
