<template>
  <div class="my-5">
    <div class="row">
      <div class="col-12 col-md-8">
        <div class="mb-4">
          <h4>
            {{ $t('referral_details') }}
          </h4>
        </div>
        <List :items="$t('what_is_justbet.list_2')" />
      </div>
      <div class="col-12 col-md-4 mt-4 mt-md-0">
        <div class="mb-4">
          <h4>
            {{ $t('referral_link') }}
          </h4>
        </div>
        <div class="mb-3">
          <label class="semi-bold">
            {{ $t('your_personal_referral_link') }}
          </label>
          <div class="input">
            <input
              v-if="address"
              ref="inputElement"
              id="referral-input"
              :value="referralLink"
              readonly
              type="text"
              class="form-control"
              @focus="$event.target.select()"
            />
            <div v-else>
              {{ $t('login_first') }}
            </div>
          </div>
        </div>
        <b-button
          v-if="address"
          variant="yellow"
          class="w-100"
          size="lg"
          @click="copyLink"
        >
          {{ copyText }}
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import { List } from '~/components/ui/'

export default {
  components: {
    List
  },
  data() {
    return {
      copyText: this.$t('copy_link')
    }
  },
  computed: {
    ...mapState('user', ['address']),
    referralLink() {
      return window.location.protocol +
        '//' +
        window.location.host +
        '/?ref=' +
        this.address
    }
  },
  methods: {
    /**
     * Put referral link to clipboard
     *
     * @public This is a public method
     */
    copyLink() {
      this.$refs.inputElement.select()
      document.execCommand('copy')
      this.$set(this, 'copyText', this.$t('copied'))
    }
  }
}
</script>

<style lang="scss" scoped>
label {
  color: #68758c;
  font-size: 0.8em;
}
input,
.btn {
  height: 50px;
  line-height: 50px;
}
input {
  &.form-control[readonly] {
    border-radius: 6px;
    background: #283449;
    border: 0;
    color: #fff;
    font-weight: 600;
  }
}
</style>
