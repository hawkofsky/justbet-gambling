<template>
  <div class="input d-flex align-items-center">
    <input
      ref="inputElement"
      type="number"
      :min="min"
      :max="maxValue"
      :step="step"
      :value="value"
      :disabled="disabled"
      class="form-control"
      @input="inputEvent"
    />
    <div v-if="!disabled" class="controls">
      <div v-if="all > 0" class="all" @click="handleClickAll">
        {{ $t('all') }}
      </div>
      <div class="up">
        <a @click="handleUp">
          <svg viewBox="0 0 9 11" class="icon icon-arrow-up">
            <use xlink:href="#icon-arrow-up"></use>
          </svg>
        </a>
      </div>
      <div class="down">
        <a @click="handleDown">
          <svg viewBox="0 0 9 11" class="icon icon-arrow-down">
            <use xlink:href="#icon-arrow-down"></use>
          </svg>
        </a>
      </div>
    </div>
    <div v-if="iconImage" :class="`icon-wrap ${isPlayUSDT ? 'flip' : ''}`">
      <img class="icon" :src="iconImage" alt="" />
      <img v-if="secondIconImage" class="icon" :src="secondIconImage" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 10
    },
    min: {
      type: Number,
      default: 10
    },
    max: {
      type: Number,
      default: 10000
    },
    step: {
      type: Number,
      default: 1
    },
    isPlayUSDT: {
      type: Boolean,
      default: false
    },
    iconImage: {
      type: String,
      default: () => require('~/assets/svg/coin-trx-red.svg')
    },
    secondIconImage: {
      type: String,
      default: ''
    },
    all: {
      type: Number,
      default: 0
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    maxValue() {
      if (this.max < this.min) {
        return this.min
      } else {
        return this.max
      }
    }
  },
  methods: {
    /**
     * Increase input value by step
     *
     * @public This is a public method
     */
    handleUp() {
      this.$refs.inputElement.stepUp(this.step)
      this.$emit('input', parseFloat(this.$refs.inputElement.value))
    },
    /**
     * Decrease input value by step
     *
     * @public This is a public method
     */
    handleDown() {
      this.$refs.inputElement.stepUp(-this.step)
      this.$emit('input', parseFloat(this.$refs.inputElement.value))
    },
    /**
     * Set all to input
     *
     * @public This is a public method
     */
    handleClickAll() {
      this.$emit('input', this.all)
    },
    /**
     * Looking for changins in input
     *
     * @public This is a public method
     */
    inputEvent() {
      this.$emit('input', parseFloat(this.$refs.inputElement.value))
    }
  }
}
</script>

<style lang="scss" scoped>
.input {
  border: 2px solid #283346;
  border-radius: 4px;

  .form-control {
    border: 0;
    height: 56px;
    background: transparent;
    color: #fff;
    font-size: 1.66em;
    font-weight: 600;
    padding: 0 0 0 15px;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    &:focus {
      box-shadow: none;
    }

    /* Firefox */
    &[type='number'] {
      -moz-appearance: textfield;
    }
  }

  .controls {
    margin-top: 5px;
    position: relative;
    .all {
      position: absolute;
      right: 40px;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
    }
    .up,
    .down {
      a {
        display: block;
        width: 20px;
        height: 20px;
        text-align: center;
        cursor: pointer;
        svg {
          width: 10px;
          fill: #68758c;
          transition: 300ms;
        }
        &:hover {
          svg {
            fill: #fff;
          }
        }
      }
    }
  }

  .icon-wrap {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 111px;

    &.flip .icon:nth-child(1n) {
      transform: rotateY(180deg);
    }
    &.flip .icon:nth-child(2n) {
      transform: rotateY(0deg);
    }
  }

  .icon {
    position: absolute;
    width: 34px;
    user-select: none;
    transform: translate3d(0, 0, 0);
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    transition: transform 0.3s;
    right: 10px;
    &:nth-child(1n) {
      transform: rotateY(0deg);
    }
    &:nth-child(2n) {
      transform: rotateY(180deg);
    }
  }
}
</style>
