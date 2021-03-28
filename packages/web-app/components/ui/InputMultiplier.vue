<template>
  <div class="radio-buttons d-flex flex-wrap">
    <div
      v-for="(option, key) in options"
      :key="key"
      :class="
        `radio-button col d-flex justify-content-center align-items-center mr-2 ${option.state}`
      "
      @click="handleSelect(key)"
    >
      {{ option.title }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      default: () => [
        { value: 0, title: 'X2', state: '' },
        { value: 1, title: '1/2', state: '' },
        { value: 2, title: 'Min', state: '' },
        { value: 3, title: 'Max', state: '' }
      ]
    }
  },
  methods: {
    handleSelect(key) {
      this.$emit('inputMultiplied', {
        value: this.options[key].value,
        state: this.options[key].state
      })
    }
  }
}
</script>

<style lang="scss" scope>
.radio-buttons {
  user-select: none;
  font-weight: 600;
  font-size: 0.8em;
  height: 100%;

  .radio-button {
    position: relative;
    padding: 2px 15px 0px;
    background: #394861;
    line-height: 20px;
    border-radius: 6px;
    cursor: pointer;

    &.disabled {
      opacity: 0.6;
      cursor: default;

      &:hover {
        background: #394861;
      }
    }

    &.active {
      background: #d9113a;

      &:before {
        content: '';
        display: block;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translateX(-50%) translateY(-20%);
        width: 45px;
        height: 35px;
        pointer-events: none;
        filter: blur(15px);
        background: #f5355d;
        background: radial-gradient(
          circle,
          rgb(245, 53, 93) 0%,
          rgba(0, 0, 0, 0) 70%
        );
      }
    }

    &:hover {
      background: #d9113a;
    }

    &:active {
      background: #be0f33;
    }
  }
}
</style>
