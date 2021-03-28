<template>
  <div class="game-item" @click="clickHandler">
    <div class="image">
      <slot></slot>
    </div>
    <div v-if="showTitle" class="title semi-bold py-3 px-4">
      {{ title }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    imgStyle: {
      type: String,
      default: ''
    },
    to: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    showTitle: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    clickHandler() {
      this.redirect(this.to)
    }
  }
}
</script>

<style lang="scss">
.game-item {
  cursor: pointer;
  img {
    display: block;
    width: 100%;
  }
  .title {
    background: #1d2738;
    border-radius: 0 0 10px 10px;
    transition: 300ms;
    font-size: 1em;

    @media (min-width: 500px) {
      font-size: 1.5em;
    }

    @media (min-width: 1280px) {
      font-size: 1.25em;
    }
  }
  &:hover {
    .title {
      background: #d9113a;
    }
  }
}
</style>
