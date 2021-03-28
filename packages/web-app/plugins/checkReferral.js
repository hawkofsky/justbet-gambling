import Vue from 'vue'
import { mapState } from 'vuex'

Vue.mixin({
  computed: {
    ...mapState('contracts', ['contractAddr'])
  },
  methods: {
    /**
     * Check if referral exist and confirmed then remove him from local storage
     *
     * @param {String}  userAddress  User address
     * @public This is a public method
     */
    async checkReferral(userAddress) {
      const routerAddress = await this.getContract(
        this.contractAddr.ROUTER_ADDR
      )
      const refereeHex = await routerAddress.refParent(userAddress).call()
      const referee = window.tronWeb.address.fromHex(refereeHex)
      const localReferee = window.localStorage.getItem('ref')
      if (referee === localReferee) {
        window.localStorage.removeItem('ref')
      }
    }
  }
})
