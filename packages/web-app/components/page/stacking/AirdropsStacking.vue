<template>
  <div class="row mt-5">
    <div class="col-12 col-md-6">
      <div class="label small-text mb-1 uppercase">
        {{ $t('how_much_would_you_like_to_stake') }}
      </div>
      <Input
        v-model="valToStake"
        :min="1"
        :max="winrBalance"
        :disabled="!address || winrBalance < 1"
        :icon-image="require('~/assets/images/coin-winr.png')"
      />
    </div>
    <div class="col-12 col-md-6 mt-3 mt-md-0">
      <div class="label small-text mb-1 uppercase">
        {{ $t('staked') }}
      </div>
      <Input
        v-model="winrStaked"
        :icon-image="require('~/assets/images/coin-winr.png')"
        :disabled="true"
      />
    </div>
    <div class="col-12 col-md-6 mt-4">
      <b-button
        class="w-100 uppercase"
        size="lg"
        variant="yellow"
        :disabled="!address || winrBalance < 1 || winrPassiveStaked > 0"
        @click="stake"
      >
        {{ $t('stake') }}
      </b-button>
    </div>
    <div v-if="winrPassiveStaked > 0" class="col-12 col-md-6 mt-4">
      <b-button
        class="w-100 uppercase"
        size="lg"
        variant="white-border"
        :disabled="!address || withdrawTime > 0"
        @click="withdrawal"
      >
        {{ $t('withdrawal') }}
      </b-button>
    </div>
    <div v-else class="col-12 col-md-6 mt-4">
      <b-button
        class="w-100 uppercase"
        size="lg"
        variant="white-border"
        :disabled="!address || winrStaked < 1 || winrPassiveStaked > 0"
        @click="unstake"
      >
        {{ $t('unstake') }}
      </b-button>
    </div>
    <div v-if="winrPassiveStaked > 0" class="text col-12 mt-3">
      <p v-if="withdrawTime > 0">
        {{ $t('withdraw_text_before_timer', { 'value': winrPassiveStaked }) }}
        {{ new Date((winrStakedTime + freezingPeriod) * 1000).toLocaleString() }}
      </p>
      <p v-else>
        {{ $t('withdraw_text_after_timer', { 'value': winrPassiveStaked }) }}
      </p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import { Input } from '~/components/ui/'

export default {
  components: {
    Input
  },
  data() {
    return {
      valToStake: 1,
      currentTime: new Date().getTime() / 1000,
      freezingPeriod: 0,
    }
  },
  computed: {
    ...mapState('user', [
      'address',
      'winrStaked',
      'winrBalance',
      'winrStakedTime',
      'winrPassiveStaked'
    ]),
    ...mapState('contracts', ['contractAddr']),
    withdrawTime() {
      return this.winrStakedTime + this.freezingPeriod - this.currentTime
    }
  },
  async mounted() {
    while (!this.address) {
      await this.delay(200)
    }

    this.withdraw_time()
  },
  methods: {
    /**
     * Stacke winr
     *
     * @public This is a public method
     */
    async stake() {
      if (!this.address) return

      const winrContract = await this.getContract(this.contractAddr.WINR_ADDR)

      if (!winrContract) return

      try {
        await winrContract.stake(this.valToStake * 1e6).send()
      } catch (error) {
        // eslint-disable-next-line
        console.log(error)
      }
    },
    /**
     * Unstacke winr
     *
     * @public This is a public method
     */
    async unstake() {
      if (!this.address) return

      const winrContract = await this.getContract(this.contractAddr.WINR_ADDR)

      if (!winrContract) return

      try {
        await winrContract.unstake().send()
      } catch (error) {
        // eslint-disable-next-line
        console.log(error)
      }
    },
    /**
     * Claim coins
     *
     * @public This is a public method
     */
    async withdrawal() {
      if (!this.address) return

      const winrContract = await this.getContract(this.contractAddr.WINR_ADDR)

      if (!winrContract) return

      try {
        await winrContract.withdrawStake().send()
      } catch (error) {
        // eslint-disable-next-line
        console.log(error)
      }
    },
    /**
     * Get time for withdraw available
     *
     * @public This is a public method
     */
    async withdraw_time() {
      if (!this.address) return

      const winrContract = await this.getContract(this.contractAddr.WINR_ADDR)

      if (!winrContract) return

      try {
        const time = await winrContract.freezingPeriod().call()

        this.$set(this, 'freezingPeriod', parseInt(time._hex))
      } catch (error) {
        // eslint-disable-next-line
        console.log(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.label {
  color: #68758c;
}
</style>
