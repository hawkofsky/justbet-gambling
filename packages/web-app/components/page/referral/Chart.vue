<template>
  <div class="referral-chart">
    <CircularProgress
      :count="150"
      default-color="transparent"
      :colours="[color, color]"
      :width="140"
      :percent="percent"
    >
      <div
        v-if="percent == 100"
        class="check d-flex align-items-center justify-content-center"
        :style="{ backgroundColor: color }"
      >
        <svg viewBox="0 0 9 7" class="icon">
          <use xlink:href="#icon-check"></use>
        </svg>
      </div>
      <div class="w-100 h-100 d-flex align-items-center justify-content-center">
        <div
          class="referral-coin-content d-flex align-items-center justify-content-center"
        >
          <img
            :class="`${percent == 0 ? 'greyscale' : ''}`"
            :src="require(`~/assets/svg/${imgColor}.svg`)"
            alt=""
          />
        </div>
      </div>
    </CircularProgress>
    <div class="text-center">
      <h4 class="name semi-bold mb-2">
        {{ name }}
      </h4>
      <div class="semi-bold total mb-3">
        {{ completed }}/<span class="grey">{{ total }}</span>
      </div>
      <div
        class="semi-bold rate d-flex align-items-center justify-content-center"
      >
        <div v-b-tooltip.hover :title="$t('ref_bonus_received_by_user')">
          <svg viewBox="0 0 12 11" class="icon mr-2">
            <use xlink:href="#icon-star"></use>
          </svg>
        </div>
        {{ rate }}x
      </div>
    </div>
  </div>
</template>

<script>
import { CircularProgress } from '~/components/ui/'

export default {
  components: {
    CircularProgress
  },
  props: {
    imgColor: {
      type: String,
      default: '#000000'
    },
    color: {
      type: String,
      default: '#000000'
    },
    name: {
      type: String,
      default: ''
    },
    percent: {
      type: Number,
      default: 0
    },
    rate: {
      type: Number,
      default: 0
    },
    total: {
      type: [Number, String],
      default: 0
    },
    completed: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {}
  },
  mounted() {},
  methods: {}
}
</script>

<style lang="scss">
.referral-chart {
  .check {
    width: 18px;
    height: 18px;
    position: absolute;
    top: 0;
    left: 50%;
    border-radius: 100%;
    box-shadow: 0px 10px 20px #131b29;
    margin: 14px 0 0 -9px;
    svg {
      width: 12px;
      margin-top: 2px;
    }
  }
  .circular-progress {
    .cp-progress-bar {
      .cp-bar {
        width: 10px;
        height: 10px;
        border-radius: 10px;
      }
    }
  }
  .referral-coin-content {
    background: rgba(32, 42, 59, 0.5);
    border: 10px solid #1d2738;
    border-radius: 100%;
    height: 102px;
    width: 102px;
  }
  img {
    &.greyscale {
      -webkit-filter: grayscale(20%); /* Safari 6.0 - 9.0 */
      filter: grayscale(20%);
    }
  }
  .total {
    font-size: 0.8em;
  }
  .rate {
    font-size: 0.7em;
    .icon {
      width: 16px;
      cursor: pointer;
      &:hover {
        fill: #fff;
      }
    }
  }
}
</style>
