<template>
  <div :class="`game-content ${extraClass}`">
    <header
      class="header d-flex flex-column flex-md-row justify-content-between align-items-center p-4"
    >
      <slot name="header" />
    </header>
    <div :class="`context ${contextPadding ? `p-` + contextPadding : ''}`">
      <slot name="context" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    extraClass: {
      type: String,
      default: ''
    },
    contextPadding: {
      type: [Number, Boolean],
      default: 4
    }
  }
}
</script>

<style lang="scss" scope>
.game-content {
  .icon-coin {
    width: 20px;
    display: block;
  }
  .header {
    font-size: 0.8em;
    background: #283346;
    border-radius: 10px 10px 0 0;
    .icon {
      width: 18px;
    }
    .title {
      font-size: 2em;
    }
    .status {
      :before {
        content: '';
        display: inline-block;
        width: 6px;
        height: 6px;
        border-radius: 6px;
        background: #37dd4a;
        vertical-align: middle;
        margin: -2px 8px 0 0;
      }
    }
  }
  .context {
    background: #1d2738;
    border-radius: 0 0 10px 10px;
    user-select: none;
  }
}
</style>
