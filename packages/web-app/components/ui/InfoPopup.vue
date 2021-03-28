<template>
  <b-modal id="info-popup" hide-footer :visible="visible" @hide="handleClose">
    <div class="modal-info">
      <span class="modal-info__title"> Information </span>
      <div class="modal-info__body">
        <div v-if="page === 'lottery'">
          <ul class="modal-info__list">
            <li class="modal-info__item">
              Every week, on Monday at 17:00 UTC, the lottery will draw.
            </li>
            <li class="modal-info__item">
              The lottery tickets are valid only for one period and the ticket
              price is dynamic.
            </li>
            <li class="modal-info__item">
              WINR spent to buy lottery tickets will be distributed as bonus
              mining rounds after the mining ends.
            </li>
            <li class="modal-info__item">
              The 20% of JustBet's winnings daily are sent to the lottery
              contract.
            </li>
            <li class="modal-info__item">
              If there is no winner this week, amount in the jackpot will be
              forwarded to next week’s jackpot.
            </li>
          </ul>
        </div>
        <div v-if="page === 'staking'">
          <ul class="modal-info__list">
            <li class="modal-info__item">
              Stake WINR to get the winnings!
            </li>
            <li class="modal-info__item">
              "TOTAL BALANCE" The amount of the winnings received.
            </li>
            <li class="modal-info__item">
              "STAKED" The amount of staked tokens, the winnings are airdropped
              for these tokens.
            </li>
            <li class="modal-info__item">
              "AVAILABLE FOR STAKE" The amount of tokens that you may stake.
            </li>
          </ul>
        </div>
        <div v-if="page === 'mining'">
          <ul class="modal-info__list">
            <li class="modal-info__item">
              WINR Mining is a process of rewarding players by offering WINR
              tokens in exchange for playing volume of Just.Bet players.
            </li>
            <li class="modal-info__item">
              Just.Bet players can stake their WINR tokens to “Share Winnings”
              or buy Just.Bet lottery tickets “Buy lottery tickets”.
            </li>
            <li class="modal-info__item">
              Players will be rewarded after each mining round. You can see the
              progress percentage of the current mining round of WINR at the top
              of mining page.
            </li>
            <li class="modal-info__item">
              The mining progress will be completed only after enough volume of
              playing. Therefore, there is no date/time countdown.
            </li>
            <li class="modal-info__item">
              Each transaction needs confirmation and a small fee so be sure
              that you have a certain amount of TRX in your wallet.
            </li>
            <li class="modal-info__item">
              Play Just.Bet games as much as you want. Even if you lose the
              games, you will earn WINR after the end of the mining round!
            </li>
          </ul>
        </div>
        <div v-if="page === 'top-players'">
          <p>
            {{ $t('latest_bets_modal') }}
          </p>
        </div>
      </div>
      <div v-if="footer" class="modal-info__footer">
        <b-button
          variant="yellow"
          class="btn-xl uppercase"
          size="lg"
          @click="$router.push('/guides')"
        >
          CHECK
        </b-button>
        <span class="modal-info__footer__text" v-if="page === 'lottery'">
          For further guidance, please check the JustBet Guidelines.
        </span>
        <span class="modal-info__footer__text" v-if="page === 'staking'">
          To understand the daily winnings airdrop, please check the JustBet
          Guidelines.
        </span>
        <span class="modal-info__footer__text" v-if="page === 'mining'">
          To understand WINR mining, please check the JustBet Guidelines.
        </span>
      </div>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: 'InfoPopup',
  data() {
    return {
      visible: false
    }
  },
  props: {
    page: {
      type: String,
      default: () => ''
    },
    footer: {
      type: Boolean,
      default: () => false
    }
  },
  methods: {
    handleClose() {
      this.visible = false
    }
  }
}
</script>

<style lang="scss">
#info-popup___BV_modal_backdrop_ {
  background: #000a19;

  &:not(.show):not(.fade) {
    opacity: 0.7;
  }
}
#info-popup {
  .modal-content {
    background: #1d2738;
  }
  .modal-dialog {
    max-width: 560px;
  }

  .modal-body {
    padding-top: 0;
  }

  .modal-header {
    padding: 10px 20px;
    border: 0;

    .close {
      opacity: 1;
      text-shadow: none;
      color: #41506b;
    }
  }
  .modal-info {
    padding: 0px 60px 30px;
    .modal-info__title {
      font-weight: bold;
      font-size: 30px;
    }
    .modal-info__list {
      margin: 25px 0 30px;
      padding: 0;
      .modal-info__item {
        padding-left: 25px;
        position: relative;
        list-style-type: none;
        color: #9aa2b2;
        margin-bottom: 15px;

        &:before {
          content: '';
          display: inline-block;
          position: absolute;
          top: 5px;
          left: 0;
          width: 15px;
          height: 16px;
          background: url('~assets/images/dice_bulletcopy.svg') no-repeat;
          background-size: contain;
        }
      }
    }
    .modal-info__body {
      p {
        margin: 20px 0;
      }
    }
    .modal-info__footer {
      display: flex;
      align-items: center;
      .modal-info__footer__text {
        color: #68758c;
        margin-left: 25px;
      }
    }
  }
}
</style>
