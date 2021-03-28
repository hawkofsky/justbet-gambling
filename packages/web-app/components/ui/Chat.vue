<template>
  <div :class="`chat-content`">
    <!-- <div class="h-100 d-flex flex-column">
      <header
        class="header d-flex justify-content-between align-items-center py-4 px-4"
      >
        <h4 class="mb-0">{{ $t('chat') }}</h4>
        <div class="status">
          <span class="grey mr-1 uppercase">{{ $t('online') }}</span> 880
        </div>
        <Language extra-class="mobile" />
        <b-button
          v-if="closeButton"
          class="chat-closer"
          @click="$emit('chat-toggler')"
        >
          <svg viewBox="0 0 224.512 224.512" class="icon icon-close">
            <use xlink:href="#icon-close"></use>
          </svg>
        </b-button>
      </header>
      <div class="chat-message-list-content col">
        <div class="chat-message-list">
          <vue-scroll :ops="scrollOptions">
            <div class="py-4 px-3">
              <ChatMessage
                pp="http://placeimg.com/20/20/any"
                name="Chigusa Kisa"
                message="ou will Quit whinning ? Or quit what victor ?"
              />
              <ChatMessage
                pp="http://placeimg.com/20/20/any"
                name="Chigusa Kisa"
                message="ou will Quit whinning ? Or quit what victor ?"
              />
              <ChatMessage
                pp="http://placeimg.com/20/20/any"
                name="Chigusa Kisa"
                message="ou will Quit whinning ? Or quit what victor ?"
              />
              <ChatMessage
                pp="http://placeimg.com/20/20/any"
                name="Chigusa Kisa"
                message="ou will Quit whinning ? Or quit what victor ?"
              />
              <ChatMessage
                pp="http://placeimg.com/20/20/any"
                name="Chigusa Kisa"
                message="ou will Quit whinning ? Or quit what victor ?"
              />
              <ChatMessage
                pp="http://placeimg.com/20/20/any"
                name="Chigusa Kisa"
                message="ou will Quit whinning ? Or quit what victor ?"
              />
              <ChatMessage
                pp="http://placeimg.com/20/20/any"
                name="Chigusa Kisa"
                message="ou will Quit whinning ? Or quit what victor ?"
              />
              <ChatMessage
                pp="http://placeimg.com/20/20/any"
                name="Chigusa Kisa"
                message="ou will Quit whinning ? Or quit what victor ?"
              />
              <ChatMessage
                pp="http://placeimg.com/20/20/any"
                name="Chigusa Kisa"
                message="ou will Quit whinning ? Or quit what victor ?"
              />
              <ChatMessage
                pp="http://placeimg.com/20/20/any"
                name="Chigusa Kisa"
                message="ou will Quit whinning ? Or quit what victor ?"
              />
            </div>
          </vue-scroll>
        </div>
      </div>
      <div class="pb-4 pt-3 px-4">
        <div class="form">
          <b-form-input placeholder="Type something"></b-form-input>
          <div class="buttons">
            <b-button class="mr-2">
              /
            </b-button>
            <b-button class="mr-2">
              @
            </b-button>
            <b-button class="mr-2" variant="send">
              <svg viewBox="0 0 12 9" class="icon icon-arrow-right">
                <use xlink:href="#icon-arrow-right"></use>
              </svg>
            </b-button>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
// import ChatMessage from '~/components/ui/ChatMessage'
// import Language from '~/components/ui/Language'

export default {
  components: {
    // ChatMessage,
    // Language
  },
  props: {
    closeButton: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scrollOptions: {
        scrollPanel: {
          initialScrollY: false,
          initialScrollX: false,
          scrollingX: false,
          scrollingY: true
        },
        rail: {
          background: '#283346'
        },
        bar: {
          background: '#283346'
        }
      }
    }
  }
}
</script>

<style lang="scss" scope>
.chat-content {
  position: sticky;
  top: 0;
  height: 100vh;
  background: #1d2738;
  header {
    height: 88px;
    background: #283346;
    .status {
      &:before {
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
    .chat-closer {
      background: transparent;
      border: 0;
      padding: 0;
      svg {
        width: 20px;
        fill: #fff;
      }
    }
    .language {
      .active-language {
        margin: 0 !important;
      }
    }
  }
  .chat-message-list-content {
    height: calc(100vh - 180px);
    overflow: hidden;
    .chat-message-list {
      position: relative;
      overflow: auto;
      height: 100%;
    }
    &:after {
      content: '';
      display: block;
      box-shadow: 0px 0px 250px 180px #1d2738;
      position: absolute;
      width: 100%;
      bottom: 0;
      left: 0;
    }
  }
  .form {
    position: relative;
    .form-control {
      background: #1d2738;
      border-color: #283346;
      color: #fff;
      height: 40px;
    }
    .buttons {
      position: absolute;
      right: 4px;
      top: 8px;
      .btn {
        background: #283346;
        border: 0;
        width: 24px;
        height: 24px;
        padding: 0;
        line-height: 24px;
        color: #68758c;
        &.btn-send {
          background: transparent;
        }
      }
      .icon {
        fill: #fff;
        width: 12px;
      }
    }
  }
}

@media (max-width: 1140px) {
  .chat-content {
    position: relative;
    border-radius: 10px;
    overflow: hidden;
  }
}
</style>
