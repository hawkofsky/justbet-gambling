<template>
  <b-modal id="login-popup" hide-footer :visible="showPopup" @hide="closePopup">
    <template slot="modal-title">
      <span class="semi-bold">
        {{ $t('login_popup.header') }}
      </span>
    </template>

    <p v-if="tronLinkStatus == 'active'">
      <img
        width="20"
        src="~/assets/svg/coin-trx-red.svg"
        alt="coin"
        class="mr-1"
      />
      {{ $t('login_popup.login') }}
    </p>

    <p v-if="tronLinkStatus == 'offline'">
      {{ $t('login_popup.install') }}
    </p>
  </b-modal>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      popupClosed: false
    }
  },
  computed: {
    ...mapState(['tronLinkStatus']),
    showPopup() {
      if (this.popupClosed) {
        return false
      }

      if (this.tronLinkStatus === 'active') {
        return true
      }

      if (this.tronLinkStatus === 'offline') {
        return true
      }

      return false
    }
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
#login-popup___BV_modal_backdrop_ {
  background: #000a19;

  &:not(.show):not(.fade) {
    opacity: 0.7;
  }
}
#login-popup {
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
