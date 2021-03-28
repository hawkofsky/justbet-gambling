<template>
  <div
    :class="
      `language d-flex flex-column align-items-center ${
        isOpen ? 'show' : 'hide'
      } ${extraClass}`
    "
  >
    <div
      class="active-language semi-bold d-flex justify-content-between align-items-center mb-0 mb-md-2"
      @click="handleToggle"
    >
      {{ locale.toUpperCase() }}
      <svg viewBox="0 0 129 129" class="icon">
        <use xlink:href="#arrow-down"></use>
      </svg>
    </div>
    <ul class="list-unstyled mb-0 px-4 py-2">
      <li
        v-for="_locale in locales"
        :key="_locale"
        class="px-2 px-md-0 py-2"
        @click="handleToggle"
      >
        <b-link :href="`#${_locale}`" @click="redirect(`/${_locale}`, false)">
          {{ _locale.toUpperCase() }}
        </b-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    extraClass: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isOpen: false
    }
  },
  computed: {
    locale() {
      return this.$store.state.system.locale
    },
    locales() {
      return this.$store.state.system.locales
    }
  },
  methods: {
    handleToggle() {
      // eslint-disable-next-line
      this.$set(this, 'isOpen', !this.isOpen)
    }
  }
}
</script>

<style lang="scss" scope>
.language {
  position: relative;
  z-index: 9;
  .active-language {
    width: 36px;
    height: 15px;
    font-size: 0.8em;
    cursor: pointer;
    .icon {
      width: 10px;
      fill: #fff;
      transition: 300ms;
    }
  }
  ul {
    position: absolute;
    left: 180%;
    bottom: -20px;
    transition: 300ms;
    opacity: 0;
    pointer-events: none;
    background: #1d2738;
    border: 0px solid #313d53;
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    li {
      a {
        font-size: 1.4em;
      }
    }
    &:after {
      content: '';
      display: block;
      position: absolute;
      left: -20px;
      bottom: 25px;
      border-top: 10px solid transparent;
      border-right: 10px solid #1d2738;
      border-bottom: 10px solid transparent;
      border-left: 10px solid transparent;
    }
  }
  &.show {
    .active-language {
      .icon {
        transform: rotate(-90deg);
      }
    }
    ul {
      left: 200%;
      opacity: 1;
      pointer-events: all;
      li {
        &:last-child {
          border-bottom: 0;
        }
        a {
          display: block;
          text-align: center;
        }
      }
    }
  }
  &.mobile {
    border-bottom: 0;
    position: relative;
    ul {
      bottom: auto;
      top: 50px;
      left: 50%;
      transform: translateX(-50%);
      &:after {
        // border-bottom-color: #1d2738;
        border-right-color: transparent;
        left: 50%;
        top: -20px;
        bottom: auto;
        margin-left: -10px;
      }
      li {
        a {
        }
      }
    }
    &.show {
      .active-language {
        .icon {
          transform: unset;
        }
      }
      ul {
        top: 60px;
      }
    }
  }
}
</style>
