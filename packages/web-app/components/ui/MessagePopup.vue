<template>
  <b-modal id="message-popup" hide-footer @hide="closePopup">
    <template slot="modal-title">
      <span class="semi-bold">
        Status
      </span>
    </template>
    <p v-if="!isTicketBought">
      <img width="20" src="~/assets/svg/success.svg" alt="coin" class="mr-1" />
      The ticket was successfully purchased
    </p>
    <p v-if="isTicketBought">Failed: something went wrong</p>
  </b-modal>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'MessagePopup',
  data() {
    return {
      popupClosed: false
    }
  },
  computed: {
    ...mapState('messages', ['isTicketBought'])
  },
  methods: {
    /**
     * Close login popup
     *
     * @public This is a public method
     */
    closePopup() {
      this.popupClosed = false
    }
  }
}
</script>

<style lang="scss">
#message-popup___BV_modal_backdrop_ {
  background: #000a19;

  &:not(.show):not(.fade) {
    opacity: 0.7;
  }
}
#message-popup {
  .modal-body {
    padding-top: 0;
    text-align: center;
  }
  .modal-content {
    background: #1d2738 url('~assets/images/bg-popup.png') no-repeat;
  }

  .modal-header {
    padding: 20px 20px 10px 20px;
    border: 0;
    .modal-title {
      margin-top: 30px;
      text-align: center;
      width: 100%;
      font-size: 20px;
    }

    .close {
      position: absolute;
      right: 20px;
      top: 20px;
      opacity: 1;
      text-shadow: none;
      color: #41506b;
    }
  }
}
</style>
