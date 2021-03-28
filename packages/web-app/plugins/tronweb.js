import Vue from 'vue'
import { mapGetters, mapState } from 'vuex'
import Tronweb from 'tronweb'

const USER_BALANCE_POLL_INTERVAL = 3000
let userPollTimer

const ms = delay => new Promise(resolve => setTimeout(resolve, delay))

Vue.mixin({
  data() {
    return {
      contracts: {}
    }
  },
  computed: {
    ...mapGetters({
      address: 'user/address',
      balance: 'user/balance',
      winrBalance: 'user/winrBalance',
    }),
    ...mapState('contracts', ['contractAddr'])
  },
  methods: {
    async tronInit() {
      await new Promise(
        resolve => (window.onload = resolve)
      ) /* not safe! there could be more window.onload handler that will override this */

      const tronWeb = new Tronweb({
        fullHost: process.env.NETWORK,
        privateKey:
          '33384036d34bce6c6db02caa87bcd5df65e41651d796cd22882aceed5b8bcc2d'
      })
      window.localWeb = tronWeb

      const denom = a => parseFloat((a / 1e6).toFixed(2))

      tronWeb.trx
        .getBalance(this.contractAddr.ROUTER_ADDR)
        .then(a => this.$store.commit('stats/changeBankRollTRX', denom(a)))

      this.getLotteryTime()

      if (typeof window.tronWeb !== 'undefined' && window.tronWeb) {
        this.$store.commit('setTronLinkStatus', 'active')
        while (!window.tronWeb.ready) await ms(50)
        const address = window.tronWeb.defaultAddress.base58

        if (address) {
          this.$store.dispatch('tickets/loadUser', address, {
            root: true
          }) /* not awaited! */
          this.$store.commit('user/setAddress', address, { root: true })
          this.$store.commit('setTronLinkStatus', 'online')
          this.$store.dispatch('mining/getStats', address)

          this.getRefCount()

          if (userPollTimer) clearInterval(userPollTimer)
          userPollTimer = setInterval(
            () => this.getBalances(),
            USER_BALANCE_POLL_INTERVAL
          )
        }
      } else {
        this.$store.commit('setTronLinkStatus', 'offline')
      }

      window.addEventListener('message', e => {
        if (e.data.message && e.data.message.action === 'setAccount') {
          const isAddressExist = e.data.message.data.address
          if (isAddressExist) {
            this.$store.commit('setTronLinkStatus', 'online')
            this.$store.commit('user/setAddress', e.data.message.data.address)
            this.$store.dispatch('mining/getStats', e.data.message.data.address)
          } else {
            this.$store.commit('setTronLinkStatus', 'active')
            this.$store.commit('user/setAddress', '')
          }
        }
      })
    },
    async getContract(address) {
      if (this.contracts[address]) return this.contracts[address]

      if (!window.tronWeb) return null

      try {
        this.contracts[address] = await window.tronWeb.contract().at(address)

        return this.contracts[address]
      } catch (error) {
        return null
      }
    },
    async getBalances() {
      const denom = a => parseFloat((a / 1e6).toFixed(2))

      const balance = await window.tronWeb.trx.getBalance(this.address)

      if (this.balance !== denom(balance)) {
        this.$store.commit('user/setBalance', denom(balance))
      }

      const stakeContract = await this.getContract(this.contractAddr.STAKE_ADDR)

      if (!stakeContract) {
        return
      }

      const activeStakesAmount = await stakeContract.activeStakesAmount().call()

      if (activeStakesAmount !== activeStakesAmount / 1e6) {
        this.$store.commit(
          'stats/changeActiveStakesAmount',
          activeStakesAmount / 1e6
        )
      }

      const winrContract = await this.getContract(this.contractAddr.WINR_ADDR)

      if (!winrContract) {
        return
      }

      const winrBalance = await winrContract.balanceOf(this.address).call()

      if (this.winrBalance !== denom(winrBalance)) {
        this.$store.commit('user/setWinrBalance', denom(winrBalance))
      }

      try {
        const stakeOf = await winrContract.stakeOf(this.address).call()

        this.$store.commit(
          'user/setTotalWinrBalance',
          denom(winrBalance) + denom(stakeOf[0])
        )
        this.$store.commit('user/setWinrStaked', denom(stakeOf[0]))
        this.$store.commit('user/setWinrAvailable', this.winrBalance)
        this.$store.commit('user/setWinrStakedTime', Number(stakeOf[2]))
        this.$store.commit('user/setWinrPassiveStaked', denom(stakeOf[1]))
      } catch (e) {
        console.log('error stakeOf', e)
      }

      const usdtContract = await this.getContract(
        this.contractAddr.USDTMOCK_ADDR
      )
      const usdtBalance = await usdtContract.balanceOf(this.address).call()
      if (this.usdtBalance !== denom(usdtBalance)) {
        this.$store.commit('user/setUSDTBalance', denom(Number(usdtBalance)))
      }
      return balance
    },
    async getRefCount() {
      const routerContract = await this.getContract(
        this.contractAddr.ROUTER_ADDR
      )

      if (!routerContract) {
        return
      }

      routerContract
        .playerRefCount(this.address)
        .call()
        .then(res => {
          this.$store.commit('user/setRefCount', Number(res._hex))
          let refMultiplier
          switch (res.refCount) {
            case res.refCount >= 30:
              refMultiplier = 2
              break
            case res.refCount >= 25:
              refMultiplier = 1.8
              break
            case res.refCount >= 20:
              refMultiplier = 1.6
              break
            case res.refCount >= 15:
              refMultiplier = 1.4
              break
            case res.refCount >= 10:
              refMultiplier = 1.2
              break
            default:
              refMultiplier = 1
          }
          this.$store.commit('user/setRefMultiplier', refMultiplier)
        })
    },
    async getLotteryTime() {
      if (!window.localWeb) return null

      try {
        const lotteryContract = await window.localWeb
          .contract()
          .at(this.contractAddr.LOTTERY_ADDR)

        const lotteryTime = await lotteryContract.getLastDrawTime().call()

        this.$store.commit(
          'stats/changeLotteryTime',
          parseInt(lotteryTime.lastDrawTime) + 7 * 24 * 60 * 60
        )
      } catch (error) {
        return null
      }
    },
    shortAddr(addr) {
      return addr
        ? addr.substring(0, 4) + '.....' + addr.substring(30)
        : 'Please Login'
    }
  }
})
