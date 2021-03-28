<template>
  <footer :class="`pt-5 ${extraClass}`">
    <div class="row">
      <div class="col-12 col-md-3">
        <div class="logo">
          <Logo />
        </div>
        <p v-html="$t('copyright')"></p>
        <p>Bankroll: {{ bankRollTRX }} TRX {{ bankRollUSDT }} USDT</p>
      </div>
      <div class="col-12 col-md-9">
        <div class="row">
          <div class="col-12 col-md-4">
            <h5 class="mb-0 mt-4 mt-sm-0 py-4">{{ $t('information') }}</h5>
            <ul class="list-unstyled">
              <li class="mb-2">
                <b-link href="/JustBet_Whitepaper.pdf" target="_blank">
                  {{ $t('whitepaper') }}
                </b-link>
              </li>
              <li class="mb-2">
                <b-link href="#" @click="redirect('/statistics')">
                  {{ $t('statistics') }}
                </b-link>
              </li>
              <li class="mb-2">
                <b-link href="/terms">
                  {{ $t('terms_of_use') }}
                </b-link>
              </li>
              <li class="mb-2">
                <b-link href="/privacy-policy">
                  {{ $t('privacy_policy') }}
                </b-link>
              </li>
            </ul>
          </div>
          <div class="col-12 col-md-4">
            <h5 class="mb-0 mt-4 mt-sm-0 py-4">{{ $t('social.title') }}</h5>
            <ul class="list-unstyled">
              <li class="mb-2">
                <b-link href="https://t.me/JustBetSupport" target="_blank">
                  {{ $t('social.telegram') }}
                </b-link>
              </li>
              <li class="mb-2">
                <b-link href="https://medium.com/@justbet" target="_blank">
                  {{ $t('social.medium') }}
                </b-link>
              </li>
              <li class="mb-2">
                <b-link
                  href="https://twitter.com/JustBetOfficial"
                  target="_blank"
                >
                  {{ $t('social.twitter') }}
                </b-link>
              </li>
              <li class="mb-2">
                <b-link href="#">
                  {{ $t('social.bitcointalk') }}
                </b-link>
              </li>
            </ul>
          </div>
          <div class="col-12 col-md-4">
            <h5 class="mb-0 mt-4 mt-sm-0 py-4">&nbsp;</h5>
            <ul class="list-unstyled">
              <li class="mb-2"><b-link href="#">DappRadar</b-link></li>
              <li class="mb-2"><b-link href="#">Dapp.com</b-link></li>
              <li class="mb-2"><b-link href="#">Tronwatch.market</b-link></li>
              <li class="mb-2"><b-link href="#">Dapp.review</b-link></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { mapState } from 'vuex'

import Logo from './Logo.vue'

export default {
  components: {
    Logo
  },
  props: {
    extraClass: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapState('stats', ['bankRollTRX', 'bankRollUSDT'])
  }
}
</script>

<style lang="scss" scope>
footer {
  border-top: 1px solid #1d2738;
  .logo {
    height: 60px;
  }
  h5 {
    font-weight: normal;
    font-size: 2em;
    @media (min-width: 768px) {
      font-size: 1em;
      height: 60px;
    }
    @media (max-width: 768px) {
      border-top: 1px solid #1d2738;
    }
  }
  p {
    color: #68758c;
  }
  ul {
    a {
      color: #68758c;
    }
  }
}
</style>
