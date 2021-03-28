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
              <Rounds :total-supply="totalSupply" />
            </div>
            <div class="mt-5 mt-lg-0 col-lg-8 col-xl-9">
              <Progress :total-mined="totalMined" />
            </div>
          </div>
        </div>
        <Footer extra-class="mt-5" />
      </div>
    </div>
    <InfoPopup :page="'mining'" :footer="true" />
  </div>
</template>

<script>
import { mapState } from 'vuex'

import { Rounds, Progress } from '~/components/page/mining/'

import { Footer, Header, TotalBar, InfoPopup } from '~/components/ui/'

export default {
  components: {
    Footer,
    Header,
    Rounds,
    Progress,
    TotalBar,
    InfoPopup
  },
  data() {
    return {
      totalMined: 0
    }
  },
  computed: {
    ...mapState('stats', ['totalSupply'])
  },
  methods: {
    async getTotalMined() {
      try {
        await this.delay(2000)
        const winrContract = await this.getContract(this.contractAddr.WINR_ADDR)
        // eslint-disable-next-line no-unmodified-loop-condition
        while (!winrContract) await this.delay(200)
        const totalMinted = Number(await winrContract.totalMinted().call())

        this.$set(this, 'totalMined', totalMinted / 1e6)
      } catch (error) {
        // eslint-disable-next-line
        console.log(error)
      }
    }
  },
  mounted() {
    this.getTotalMined()
  }
}
</script>
