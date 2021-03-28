<template>
  <div class="text-list row">
    <div
      v-for="(item, key) in items"
      :key="key"
      :class="`col-12 col-md-${col} mb-2`"
    >
      <div v-if="!item.not" class="list-item pl-5">
        <svg viewBox="0 0 20 23" class="icon mr-3">
          <use xlink:href="#icon-dice-red"></use>
        </svg>
        <p v-html="item" />
      </div>
      <div v-else>
        <p v-html="item.text" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => []
    },
    col: {
      type: [String, Number],
      default: 12
    }
  }
}
</script>

<style lang="scss">
.text-list {
  .list-item {
    position: relative;
    svg {
      width: 14px;
      height: 16px;
      fill: #d9113a;
      position: absolute;
      left: 0;
      top: 2px;
      g {
        stroke: #d9113a;
        fill: #d9113a;
      }
    }
    p {
      color: #9aa2b2;
      margin-bottom: 0;
      line-height: 1.65em;
      span {
        color: #fff;
      }
    }
  }
}
</style>
