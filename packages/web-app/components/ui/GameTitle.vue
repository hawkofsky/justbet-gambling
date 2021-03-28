<template>
  <div :class="`title ${isOpen ? 'show' : 'hide'}`">
    <div class="toggler d-flex align-items-center" @click="toggler">
      <slot></slot>
      <svg viewBox="0 0 129 129" class="icon icon-angle ml-2">
        <use xlink:href="#arrow-down"></use>
      </svg>
    </div>
    <div class="game-select semi-bold">
      <ul class="list-unstyled mb-0 px-4 py-3">
        <!--
        <li class="px-2 py-3">
          <a
            :class="
              `d-flex align-items-center ${
                activeGame === 'moon' ? 'active' : null
              }`
            "
            @click="redirect('/game/moon')"
          >
            <svg viewBox="0 0 18 20" class="icon mr-3">
              <use xlink:href="#icon-moon-game-nc"></use>
            </svg>
            {{ $t('game.moon') }}
          </a>
        </li>
        -->
        <li class="px-2 py-3">
          <a
            :class="
              `d-flex align-items-center ${
                activeGame === 'dice' ? 'active' : null
              }`
            "
            @click="redirect('/game/dice')"
          >
            <svg viewBox="0 0 20 23" class="icon mr-3">
              <use xlink:href="#icon-dice-nc"></use>
            </svg>
            {{ $t('game.dice') }}
          </a>
        </li>
        <!--
        <li class="px-2 py-3">
          <a
            :class="
              `d-flex align-items-center ${
                activeGame === 'wheel' ? 'active' : null
              }`
            "
            @click="redirect('/game/wheel')"
          >
            <svg viewBox="0 0 20 20" class="icon mr-3">
              <use xlink:href="#icon-wheel-game-nc"></use>
            </svg>
            {{ $t('game.wheel') }}
          </a>
        </li>
        -->
        <li class="px-2 py-3">
          <a
            :class="
              `d-flex align-items-center ${
                activeGame === 'coin' ? 'active' : null
              }`
            "
            @click="redirect('/game/coin')"
          >
            <svg viewBox="0 0 20 20" class="icon mr-3">
              <use xlink:href="#coin-game-icon-nc"></use>
            </svg>
            {{ $t('game.coin_flip') }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    activeGame: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isOpen: false
    }
  },
  mounted() {
    document.onclick = this.documentClickHandler
  },
  methods: {
    toggler() {
      this.$set(this, 'isOpen', !this.isOpen)
    },
    documentClickHandler(e) {
      if (e.target.closest('.title') === null) {
        this.$set(this, 'isOpen', false)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  position: relative;
  z-index: 99;
  .toggler {
    cursor: pointer;
  }
  .icon-angle {
    width: 10px !important;
    fill: #fff;
    stroke: #fff;
  }
  .game-select {
    opacity: 0;
    pointer-events: none;
    position: absolute;
    min-width: 170px;
    left: 0;
    top: 100%;
    margin: 30px 0 0 0;
    transition: 300ms;
    background: #283346;
    border: 0px solid #283346;
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    ul {
      li {
        a {
          cursor: pointer;
          font-size: 0.6em;
          color: #3a4d69;
          svg {
            fill: #3a4d69;
            transition: 300ms;
          }
          &.active,
          &:hover {
            color: #fff;
            text-shadow: unset;
            svg {
              fill: #fff;
            }
          }
        }
      }
    }
  }
  &.show {
    .game-select {
      opacity: 1;
      pointer-events: all;
    }
  }
}
@media (max-width: 768px) {
  .title {
    .game-select {
      margin: 10px 0 0 0;
    }
  }
}
</style>
