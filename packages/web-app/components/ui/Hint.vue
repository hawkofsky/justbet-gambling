<template>
  <div :class="`hint-content ${className}`">
    <svg
      viewBox="0 0 612 612"
      class="icon icon-question"
      @click="setShow(true)"
    >
      <use xlink:href="#icon-question"></use>
    </svg>
    <div v-if="show" class="hint p-3">
      <carousel
        class="product-list-item-image-slider"
        :items="1"
        :nav="true"
        :dots="false"
      >
        <div v-for="(image, key) in images" :key="key" class="item">
          <img :src="image" alt="" />
        </div>
      </carousel>
      <p class="mb-0">
        {{ text }}
      </p>
      <b-button
        class="mt-3 w-100"
        variant="white-border"
        @click="setShow(false)"
      >
        Close
      </b-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    className: {
      type: String,
      default: ''
    },
    contextPadding: {
      type: [Number, Boolean],
      default: 4
    },
    text: {
      type: String,
      default:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc scelerisque mauris vel lectus efficitur, non viverra mauris gravida.'
    },
    images: {
      type: Array,
      default: () => [
        'https://via.placeholder.com/350x200',
        'https://via.placeholder.com/350x200',
        'https://via.placeholder.com/350x200'
      ]
    }
  },
  data() {
    return {
      swiperOption: {},
      show: false
    }
  },
  methods: {
    setShow(status) {
      this.$set(this, 'show', status)
    }
  }
}
</script>

<style lang="scss" scope>
.hint-content {
  position: relative;
  .hint {
    position: absolute;
    right: 100%;
    top: 0;
    z-index: 9;
    width: 300px;
    background: #283346;
    border: 0px solid #313d53;
    box-shadow: 0px 0px 20px 5px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    margin-top: -15px;
    &:after {
      content: '';
      display: block;
      position: absolute;
      right: -20px;
      top: 15px;
      border-top: 10px solid transparent;
      border-right: 10px solid transparent;
      border-bottom: 10px solid transparent;
      border-left: 10px solid #283346;
    }
    .owl-prev,
    .owl-next {
      display: block;
      position: absolute;
      top: 50%;
      margin: -15px 0 0 0 !important;
      width: 30px;
      height: 30px;
      background: rgba(40, 51, 70, 0.3) !important;
      border-radius: 0 !important;
    }
    .owl-prev {
      left: 0;
    }
    .owl-next {
      right: 0;
    }
  }
}
@media (max-width: 768px) {
  .hint-content {
    position: absolute;
    right: 30px;
    top: 15px;
    .hint {
      width: 240px;
    }
  }
}
</style>
