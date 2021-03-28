<template>
  <b-nav
    :class="
      `navigation ${type} w-100 d-flex ${
        type == 'mobile' ? 'flex-row d-block d-md-none' : 'flex-column'
      }`
    "
    @mouseout="setActiveNavigationBorder"
  >
    <div
      class="navigation-border"
      :style="
        type == 'mobile'
          ? `width: ${border.width}px; left: ${border.left}px`
          : `height: ${border.height}px; top: ${border.top}px`
      "
    ></div>
    <b-nav-item
      :active="activeRoute == '/'"
      link-classes="home"
      @mouseover="handleMouseOver"
      @click="handleChangeRoute('/')"
    >
      <span>{{ $t('home') }}</span>
    </b-nav-item>
    <b-nav-item
      :active="activeRoute == '/game/lottery'"
      link-classes="tickets"
      @mouseover="handleMouseOver"
      @click="handleChangeRoute('/game/lottery')"
    >
      <span>{{ $t('lottery') }}</span>
    </b-nav-item>
    <b-nav-item
      exact
      :active="activeRoute == '/winnings-airdrops'"
      link-classes="profit"
      @mouseover="handleMouseOver"
      @click="handleChangeRoute('/winnings-airdrops')"
    >
      <span>{{ $t('staking') }}</span>
    </b-nav-item>
    <b-nav-item
      exact
      :active="activeRoute == '/mining'"
      link-classes="mining"
      @mouseover="handleMouseOver"
      @click="handleChangeRoute('/mining')"
    >
      <span>{{ $t('mining') }}</span>
    </b-nav-item>
    <b-nav-item
      exact
      :active="activeRoute == '/referral'"
      link-classes="rate"
      @mouseover="handleMouseOver"
      @click="handleChangeRoute('/referral')"
    >
      <span>{{ $t('referral') }}</span>
    </b-nav-item>
    <b-nav-item
      exact
      :active="activeRoute == '/guides'"
      link-classes="guide"
      @mouseover="handleMouseOver"
      @click="handleChangeRoute('/guides')"
    >
      <span>{{ $t('guides.title') }}</span>
    </b-nav-item>
    <b-nav-item
      exact
      link-classes="wallet"
      @mouseover="handleMouseOver"
      @click="openFairnessPopup()"
    >
      <span>{{ $t('fairness') }}</span>
    </b-nav-item>

    <FairnessPopup v-model="FairnessPopup" />
  </b-nav>
</template>

<script>
import FairnessPopup from './FairnessPopup'

export default {
  components: { FairnessPopup },
  props: {
    dice: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'desktop'
    }
  },
  data() {
    return {
      FairnessPopup: false,
      activeRoute: this.getActiveRoutePath(),
      border: {
        height: 0,
        top: 0,
        left: 0,
        width: 0
      }
    }
  },
  watch: {
    $route: {
      handler: function() {
        this.$set(this, 'activeRoute', this.getActiveRoutePath())
        setTimeout(() => this.setActiveNavigationBorder(), 200)
      },
      deep: true
    }
  },
  mounted() {
    this.setActiveNavigationBorder()
  },
  methods: {
    handleMouseOver(event) {
      const { target } = event
      this.handleScrollBorder(target)
    },
    setActiveNavigationBorder() {
      const activeElem = document.querySelector(
        `.navigation.${this.type} .active`
      )
      this.handleScrollBorder(activeElem)
    },
    handleScrollBorder(element) {
      if (!element) {
        return false
      }

      this.$set(this, 'border', {
        height: element.offsetHeight,
        top: element.offsetTop,
        width: element.offsetWidth,
        left: element.offsetLeft
      })
    },
    handleChangeRoute(route) {
      this.redirect(route)
      this.setActiveNavigationBorder()
    },
    /**
     * Open/close fairness popup
     *
     * @public This is a public method
     */
    openFairnessPopup() {
      this.$set(this, 'FairnessPopup', true)
    }
  }
}
</script>

<style lang="scss">
.navigation {
  position: relative;

  overflow: hidden;
  overflow-y: auto;
  flex-wrap: nowrap;

  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer 10+ */

  &::-webkit-scrollbar {
    /* WebKit */
    width: 0;
    height: 0;
  }

  .navigation-border {
    display: block;
    position: absolute;
    pointer-events: none;
    top: 50%;
    right: 0;
    width: 2px;
    transition: 150ms;
    background: #d9113a;
    box-shadow: 0px 0px 10px 3px rgba(217, 17, 58, 0.5);
    filter: blur(0.5px);
  }

  .nav-item {
    width: 100%;
    .nav-link {
      position: relative;
      width: 100%;
      height: 90px;
      text-align: center;
      padding: 2em 0;
      background-repeat: no-repeat;
      background-size: 80px;
      background-position: center;
      &.home {
        background-image: url(~assets/images/leftbar/home.png);
      }
      &.home.active,
      &.home:hover {
        background-image: url(~assets/images/leftbar/home-act.png);
      }
      &.tickets {
        background-image: url(~assets/images/leftbar/tickets.png);
      }
      &.tickets.active,
      &.tickets:hover {
        background-image: url(~assets/images/leftbar/tickets-act.png);
      }
      &.profit {
        background-image: url(~assets/images/leftbar/profit.png);
      }
      &.profit.active,
      &.profit:hover {
        background-image: url(~assets/images/leftbar/profit-act.png);
      }
      &.rate {
        background-image: url(~assets/images/leftbar/rate.png);
      }
      &.rate.active,
      &.rate:hover {
        background-image: url(~assets/images/leftbar/rate-act.png);
      }
      &.mining {
        background-image: url(~assets/images/leftbar/Mining_4.png);
      }
      &.mining.active,
      &.mining:hover {
        background-image: url(~assets/images/leftbar/Mining_4_act.png);
      }
      &.wallet {
        background-image: url(~assets/images/leftbar/Wallet.png);
      }
      &.wallet.active,
      &.wallet:hover {
        background-image: url(~assets/images/leftbar/Wallet_act.png);
      }
      &.guide {
        background-image: url(~assets/images/leftbar/Guide.png);
      }
      &.guide.active,
      &.guide:hover {
        background-image: url(~assets/images/leftbar/Guide_act.png);
      }
      span {
        display: block;
        position: absolute;
        pointer-events: none;
        bottom: 5%;
        left: 0;
        width: 100%;
        text-align: center;
        opacity: 0;
        transition: 300ms;
        font-weight: 600;
        font-size: 0.8em;
      }
      &:hover {
        color: white;
        text-shadow: unset;
        span {
          opacity: 1;
        }
      }
    }
  }
  &.mobile {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 9;
    background: #1d2738;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    .navigation-border {
      right: auto;
      top: 0;
      height: 2px;
    }
    .nav-item {
      display: inline-flex;
      flex: 1;
      .nav-link {
        background-size: 50px;
        height: 60px;
        span {
          font-size: 0.8em;
        }
      }
    }
  }
}
</style>
