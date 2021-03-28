<template>
  <div :class="`select ${extraClass}`">
    <div
      class="d-flex justify-content-center align-items-center label"
      @click="toggle()"
    >
      <label class="mb-0">{{ label }}</label>
      <div class="ml-1">
        <svg viewBox="0 0 8 12" class="icon ml-2">
          <use xlink:href="#icon-angle-down"></use>
        </svg>
      </div>
    </div>
    <div v-show="show" class="options">
      <div
        v-for="option in options"
        :key="option.value"
        :class="`option ${option.value == value ? 'active' : ''}`"
        @click="change(option)"
      >
        {{ option.label }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      default: () => []
    },
    extraClass: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      label: this.options[0].label,
      value: this.options[0].value,
      show: false
    }
  },
  methods: {
    toggle() {
      this.$set(this, 'show', !this.show)
    },
    open() {
      this.$set(this, 'show', true)
    },
    close() {
      this.$set(this, 'show', false)
    },
    change(option) {
      this.$set(this, 'label', option.label)
      this.$set(this, 'value', option.value)
      this.$emit('input', option.value)
      this.close()
    }
  }
}
</script>

<style lang="scss" scoped>
.select {
  background: #1d2738;
  padding: 9px 15px 9px 18px;
  border-radius: 4px;
  .label {
    cursor: pointer;
  }
  .icon {
    width: 8px;
    fill: #fff;
  }
  .options {
    position: absolute;
    top: 100%;
    right: 0;
    min-width: 100%;
    text-align: center;
    margin-top: 10px;
    background: #1d2738;
    border-radius: 4px;
    z-index: 1;
    .option {
      cursor: pointer;
      padding: 9px 15px 9px 18px;
      color: #fff;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      &.active {
        background: rgba(255, 255, 255, 0.1);
      }
      &:hover {
        background: rgba(0, 0, 0, 0.1);
      }
    }
  }
}
</style>
