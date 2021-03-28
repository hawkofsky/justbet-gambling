<template>
  <div class="counter-container text-center">
    <div class="counter-shadow" :style="{ backgroundColor: colors.shadow }">
      <div
        class="counter-box-shadow"
        :style="{ boxShadow: `0px 10px 51px 0px ${colors.backgroundColor}` }"
      ></div>
      <div
        class="counter pt-4 pb-3"
        :style="{ backgroundColor: colors.backgroundColor }"
      >
        <div class="row">
          <template v-if="showHours">
            <div v-if="days > 0" :class="getColClass()">
              <div class="hours">
                <div class="dots" :style="{ color: colors.color }">:</div>
                <div class="date semi-bold">
                  {{ days }}
                </div>
                <small
                  class="d-block pb-1 pt-2"
                  :style="{ color: colors.color }"
                >
                  Days
                </small>
              </div>
            </div>
            <div :class="getColClass()">
              <div class="hours">
                <div class="dots" :style="{ color: colors.color }">:</div>
                <div class="date semi-bold">
                  {{ hours | twoDigit }}
                </div>
                <small
                  class="d-block pb-1 pt-2"
                  :style="{ color: colors.color }"
                >
                  {{ $t('hours') }}
                </small>
              </div>
            </div>
          </template>
          <div :class="getColClass()">
            <div class="minutes">
              <div class="dots" :style="{ color: colors.color }">:</div>
              <div class="date semi-bold">
                {{ minutes | twoDigit }}
              </div>
              <small class="d-block pb-1 pt-2" :style="{ color: colors.color }">
                {{ minText }}
              </small>
            </div>
          </div>
          <div :class="getColClass()">
            <div class="sec">
              <div class="date semi-bold">
                {{ seconds | twoDigit }}
              </div>
              <small class="d-block pb-1 pt-2" :style="{ color: colors.color }">
                {{ secText }}
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  filters: {
    twoDigit: v => (('' + v).length - 1 ? v : `0${v}`)
  },
  props: {
    timezone: {
      type: Boolean,
      default: true
    },
    colors: {
      type: Object,
      default: () => ({})
    },
    date: {
      type: [Number, String],
      default: 0
    },
    showHours: {
      type: Boolean,
      default: true
    },
    minText: {
      type: String,
      default: 'Min'
    },
    secText: {
      type: String,
      default: 'Sec'
    }
  },
  data() {
    return {
      days: 0,
      hours: '00',
      minutes: '00',
      seconds: '00'
    }
  },
  mounted() {
    this.counter()
    this.interval = setInterval(() => this.counter(), 1000)
  },
  beforeDestroy() {
    clearInterval(this.interval)
  },
  methods: {
    counter() {
      /* eslint-disable */
      const countDownDate = this.date * 1000
      // Get today's date and time
      let now
      // if (this.timezone)
      //   now = new Date().getTime() + new Date().getTimezoneOffset() * 1000 * 60
      // else
        now = new Date().getTime()

      // Find the distance between now and the count down date
      let distance = countDownDate > now ? Math.floor((countDownDate - now) / 1000) : 0;

      // console.log("distance", distance, countDownDate, now, this.date);

      // Time calculations for days, hours, minutes and seconds
      const timeSplit = {
        days: 86400,
        hours: 3600,
        minutes: 60,
        seconds: 1
      };

      Object.keys(timeSplit).map(key => {
        this[key] = Math.floor(distance / timeSplit[key]);
        distance -= this[key] * timeSplit[key];
      });
    },
    getColClass() {
      if (!this.showHours) {
        return 'col-6'
      }
      if (this.days > 0) {
        return 'col-3'
      }
      return 'col-4'
    }
  },
}
</script>

<style lang="scss" scoped>
.counter-container {
  user-select: none;

  .counter-shadow {
    position: relative;
    padding-bottom: 10px;
    border-radius: 10px;
    .counter-box-shadow {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      opacity: 0.5;
      border-radius: 10px;
    }
    .counter {
      border-radius: 10px;

      .minutes .dots,
      .hours .dots {
        display: block;
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-66%) translateX(50%);
        font-size: 3em;
        font-weight: 700;
        line-height: 2.3em;
      }
      .date {
        font-size: 3em;
        line-height: 1em;
        & + small {
          line-height: 1em;
        }
      }
    }
  }
}
@media (max-width: 768px) {
  .counter-container {
    .counter-shadow {
      .counter {
        .date {
          font-size: 1.5em;
        }
        .hours {
          .dots {
            font-size: 2em;
          }
        }
        .date {
          + small {
            font-size: 0.8em;
          }
        }
      }
    }
  }
}
</style>
