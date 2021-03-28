<template>
  <div class="chat-message small-text mb-4">
    <div class="date mb-2 d-inline-block px-3">
      Thursday, 5:19 PM
    </div>
    <div class="message">
      <div class="row">
        <div class="col-auto pr-2">
          <img :src="pp" alt="" />
        </div>
        <div class="col pl-0">
          <span class="grey mr-1">{{ name }}:</span> {{ message }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pp: {
      type: String,
      default: 'http://placeimg.com/20/20/any'
    },
    name: {
      type: String,
      default: 'Chigusa Kisa'
    },
    message: {
      type: String,
      default: 'ou will Quit whinning ? Or quit what victor ?'
    }
  }
}
</script>

<style lang="scss" scope>
.chat-message {
  .date {
    background: #161f2d;
    height: 26px;
    line-height: 26px;
    border-radius: 26px;
  }
  .message {
    font-size: 1.2em;
    line-height: 24px;
    img {
      border-radius: 100%;
    }
  }
}
</style>
