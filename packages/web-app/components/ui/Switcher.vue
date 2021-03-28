<template>
  <div :class="`switcher-input d-flex align-items-center ${type}`">
    <label v-if="label" class="grey mb-0">{{ label }}</label>
    <div
      :class="`input ml-3 ${value ? 'active' : 'passive'}`"
      @click="change()"
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    value: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: ''
    }
  },
  methods: {
    change() {
      this.$emit('input', !this.value)
    }
  }
}
</script>

<style lang="scss">
.switcher-input {
  .input {
    position: relative;
    width: 70px;
    height: 38px;
    border-radius: 20px;
    border: 1px solid #979797;
    cursor: pointer;
    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 20px;
      height: 20px;
      left: 8px;
      top: 8px;
      border: 6px solid #979797;
      border-radius: 14px;
      transition: 300ms;
    }
    &.active {
      &:after {
        border-color: #ffd000;
        left: 40px;
      }
    }
  }
  &.mini {
    .input {
      width: 50px;
      height: 28px;
      &:after {
        width: 15px;
        height: 15px;
        left: 5px;
        top: 5px;
        border: 5px solid #979797;
        border-radius: 15px;
      }
      &.active {
        &:after {
          border-color: #ffd000;
          left: 28px;
        }
      }
    }
  }
}
</style>
