<template>
  <div v-if="showHowItWorks" class="how-it-works">
    <Switcher :value="showHowItWorks" type="mini" @input="toggleShow" />
    <div class="row">
      <div class="col-5 d-none d-md-block">
        <img src="~/assets/images/howitworks/illustration_1@2x.png" />
      </div>
      <div class="col-12 col-md-7">
        <div class="pl-4">
          <h1 class="mt-5 semi-bold">{{ $t('home_how_it_works_title') }}</h1>
          <ul class="list-unstyled mt-3 list">
            <li
              v-for="text in $t('home_how_it_works_texts')"
              :key="text"
              class="mb-2 d-flex align-items-center"
            >
              <svg viewBox="0 0 20 23" class="icon mr-3">
                <use xlink:href="#icon-dice"></use>
              </svg>
              {{ text }}
            </li>
          </ul>
          <small class="d-block mt-4 mb-5">
            {{ $t('home_how_it_works_info') }}
          </small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Switcher } from '~/components/ui/'

export default {
  components: {
    Switcher
  },
  data() {
    return {
      show: false
    }
  },
  computed: {
    showHowItWorks() {
      return this.$store.getters['system/showHowItWorks']
    }
  },
  methods: {
    toggleShow() {
      this.$store.commit('system/setHowItWorksStatus', false)
    }
  }
}
</script>

<style lang="scss">
.how-it-works {
  background-image: url(~assets/images/how-it-works-bg.png);
  background-color: #d90f3a;
  background-size: contain;
  background-repeat: no-repeat;
  border-radius: 10px;
  position: relative;
  .switcher-input {
    position: absolute;
    right: 15px;
    top: 15px;
    z-index: 3;
    &.mini {
      .input {
        border: 1px solid #fff;
      }
    }
  }
  img {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-52%, -44%);
    height: 140%;
  }
  small {
    font-size: 0.8em;
    opacity: 0.7;
  }
}
@media (max-width: 992px) {
  .how-it-works {
    img {
      height: 100%;
    }
  }
}
</style>
