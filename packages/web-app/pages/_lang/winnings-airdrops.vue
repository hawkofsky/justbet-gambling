<template>
  <div class="main-content">
    <TotalBar />
    <div class="container">
      <div class="py-5">
        <Header />
        <div class="mt-3">
          <div class="d-flex justify-content-end mb-3 mining-header"></div>
          <div class="row">
            <div class="col-lg-4 col-xl-3">
              <Statistics />
            </div>
            <div class="mt-5 mt-lg-0 col-lg-8 col-xl-9">
              <Airdrops />
            </div>
          </div>
        </div>
        <Footer extra-class="mt-5" />
      </div>
    </div>
    <InfoPopup :page="'staking'" :footer="true" />
  </div>
</template>
<script>
import { Statistics, Airdrops } from '~/components/page/stacking/'
import { Footer, Header, TotalBar, InfoPopup } from '~/components/ui/'

export default {
  components: { Statistics, Airdrops, Footer, Header, TotalBar, InfoPopup }
}
</script>
