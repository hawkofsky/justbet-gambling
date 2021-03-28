<template>
  <b-modal
    id="fairness-popup"
    hide-footer
    :visible="visible"
    @hide="handleClose"
  >
    <template slot="modal-title">
      <span class="semi-bold">
        {{ $t('fair_play') }}
      </span>
      <div class="grey mt-3" :style="{ fontSize: '0.5em' }">
        {{ $t('fair_play_description') }}
      </div>
    </template>

    <div v-if="address" class="fairness-popup-form">
      <div class="small-text mb-3">
        <label class="uppercase"> {{ $t('block_number') }}: </label>
        <div class="input fairness-popup-form-active">
          <input v-model="inputBlock" type="number" class="form-control" />
        </div>
      </div>

      <div class="small-text mb-2">
        <label class="uppercase">{{ $t('your_address') }}</label>
        <div class="input">
          <input
            :value="address"
            type="text"
            class="form-control"
            disabled
          />
        </div>
      </div>

      <b-button
        variant="yellow"
        class="btn-xl mt-4 uppercase"
        size="lg"
        :disabled="checkDisabled"
        @click="checkBlock"
      >
        {{ $t('check') }}
      </b-button>

      <div
        v-if="error === 'invalid number'"
        class="fairness-popup-form-message small-text mt-2"
      >
        {{ $t('block_number_invalid') }}
      </div>

      <div
        v-if="error === 'some error'"
        class="fairness-popup-form-message small-text mt-2"
      >
        {{ $t('something_wrong') }}
      </div>

      <div
        v-if="error === 'not found'"
        class="fairness-popup-form-message small-text mt-2"
      >
        We're sorry, but the block #{{ blockNumber }} wasn't found.
      </div>
    </div>

    <div v-else>
      <span class="bold grey">{{ $t('please_login') }}</span>
    </div>

    <div v-if="address" class="fairness-popup-result mt-4">
      <div v-if="blockHash" class="fairness-popup-result-item py-2">
        <span class="fairness-popup-result-item-header bold grey">
          {{ $t('block_hash') }}
        </span>

        <div class="fairness-popup-result-item-content small-text mb-2">
          <span class="fairness-popup-result-item-content-header ellipsed-text">
            {{ blockHash }}
          </span>
        </div>
      </div>

      <div
        v-if="blockTransactions.length > 0 || blockTransfers.length > 0"
        class="fairness-popup-result-item py-2"
      >
        <span class="fairness-popup-result-item-header bold grey">
          {{ $t('result') }}
        </span>

        <div
          v-if="blockTransactions.length > 0"
          class="fairness-popup-result-item-content small-text mb-2"
        >
          <span class="fairness-popup-result-item-content-header ellipsed-text">
            {{ $t('block_transactions') }}:
          </span>

          <ul>
            <li
              v-for="transaction in blockTransactions"
              :key="transaction.txID"
              class="px-2 px-md-0 py-2"
            >
              <span class="ellipsed-text">
                {{ transaction.txID }}
              </span>
            </li>
          </ul>
        </div>

        <div
          v-if="blockTransfers.length > 0"
          class="fairness-popup-result-item-content small-text mb-2"
        >
          <span class="fairness-popup-result-item-content-header">
            {{ $t('block_transfers') }}:
          </span>

          <ul>
            <li
              v-for="transfer in blockTransfers"
              :key="transfer.txID"
              class="px-2 px-md-0 py-2"
            >
              <span class="ellipsed-text">
                {{ transfer.txID }}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </b-modal>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      blockTransactions: [],
      blockTransfers: [],
      checkDisabled: true,
      blockNumber: '',
      inputBlock: '',
      blockHash: '',
      visible: this.value,
      error: false
    }
  },
  computed: {
    ...mapState('user', ['address'])
  },
  watch: {
    value() {
      this.$set(this, 'visible', this.value)
    },
    inputBlock(value) {
      if (value.length > 0) {
        this.checkDisabled = false
      } else {
        this.checkDisabled = true
      }
    }
  },
  methods: {
    /**
     * Open/close fairness popup
     *
     * @public This is a public method
     */
    handleClose() {
      this.$emit('input', false)
    },
    /**
     * Get info of block by its number
     *
     * @public This is a public method
     */
    async checkBlock() {
      if (!this.address) return

      this.$set(this, 'blockTransactions', [])
      this.$set(this, 'blockTransfers', [])
      this.$set(this, 'blockNumber', this.inputBlock)
      this.$set(this, 'blockHash', '')
      this.$set(this, 'error', false)

      try {
        const blockResult = await window.tronWeb.trx.getBlock(this.inputBlock)

        if (blockResult.Error) {
          this.$set(this, 'error', 'some error')

          return
        }

        this.$set(this, 'blockHash', blockResult.blockID)

        if (blockResult.transactions) {
          this.$set(this, 'blockTransactions', blockResult.transactions)
        }

        if (blockResult.transfers) {
          this.$set(this, 'blockTransfers', blockResult.transfers)
        }
      } catch (error) {
        switch (error) {
          case 'Invalid block number provided':
            this.$set(this, 'error', 'invalid number')

            break
          case 'Block not found':
            this.$set(this, 'error', 'not found')

            break
          default:
            this.$set(this, 'error', 'some error')

            return
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.fairness-popup-form {
  &-active {
    border-radius: 6px;
    background: #283449;

    input {
      &[type=number] {
        -moz-appearance: textfield;

        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
            -webkit-appearance: none;
        }
      }
    }
  }

  &-message {}

  label {
    color: #68758c;
  }

  input {
    border: 1px solid #283449;
    background: transparent;
    height: 50px;
    font-size: 1.2em;
    color: #fff;
  }
}

.fairness-popup-result {
  &-item {
    &-header {
      border-bottom: 1px solid #283346;
      display: block;
    }

    &-content {
      &-header {
        padding-top: 1em;
      }
    }
  }

  .ellipsed-text {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    display: block;
    width: 100%;
  }
}
</style>

<style lang="scss">
#fairness-popup___BV_modal_backdrop_ {
  background: #000a19;
  &:not(.show):not(.fade) {
    opacity: 0.7;
  }
}

#fairness-popup {
  .modal-content {
    border-radius: 10px;
    background: #1d2738;
    border: 0;
    .modal-header {
      padding: 3em 3em 1.5em 3em;
      border: 0;
      .close {
        text-shadow: none;
        opacity: 1;
        margin: -1em;
        color: #41506b;
      }

      .modal-title {
        line-height: 1;
        font-size: 2em;
      }
    }

    .modal-body {
      padding: 1em 3em 3em 3em;
    }
  }
}
</style>