<template>
  <div class="main-content">
    <TotalBar />
    <div class="container">
      <div class="py-5">
        <Header />
        <div class="mt-5">
          <h2 class="mb-3 semi-bold">
            {{ $t('referral_page') }}
          </h2>
          <p>
            {{ $t('referral_page_text') }}
          </p>
          <ReferralBrackets />
          <ReferralDetails />
        </div>
        <Footer extra-class="mt-5" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import { ReferralBrackets, ReferralDetails } from '~/components/page/referral/'
import { Footer, Header, TotalBar } from '~/components/ui/'

export default {
  components: {
    ReferralBrackets,
    ReferralDetails,
    Footer,
    Header,
    TotalBar
  }
}
</script>
