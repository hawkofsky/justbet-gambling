<template>
  <div class="main-content guides">
    <TotalBar />
    <div class="container">
      <div class="py-5">
        <Header />
        <div class="mt-5">
          <h2 class="mb-5 semi-bold">{{ $t('guides.title') }}</h2>
          <div class="row">
            <div class="col-12 col-lg-8">
              <div class="guide-bg">
                <div id="introduction" class="mb-4">
                  <div class="mb-4">
                    <h4>{{ $t('introduction') }}</h4>
                  </div>
                  <p
                    v-for="(paragraph, key) in $t('guides.paragraphs')"
                    :key="key"
                    class="mb-4"
                    v-html="paragraph"
                  />
                </div>
                <div id="how-to-play" class="guides-content mb-4">
                  <div class="pt-4 mb-4">
                    <h4>
                      {{ $t('how_to_play') }}
                    </h4>
                  </div>
                  <List :items="$t('how_to_play_list')" />
                </div>
                <div id="how-to-join" class="mb-4">
                  <div class="pt-4 mb-4">
                    <h4>
                      {{ $t('how_to_join_the_weekly_lottery') }}
                    </h4>
                  </div>
                  <List :items="$t('how_to_join_the_weekly_lottery_list')" />
                </div>
                <div id="daily-profits-sharing" class="mb-4">
                  <div class="pt-4 mb-4">
                    <h4>
                      {{ $t('daily_profits_sharing') }}
                    </h4>
                  </div>
                  <List :items="$t('daily_profits_sharing_list')" />
                </div>
                <div id="mining" class="mb-4">
                  <div class="pt-4 mb-4">
                    <h4>
                      {{ $t('mining_list_caption') }}
                    </h4>
                  </div>
                  <List :items="$t('mining_list')" />
                </div>
                <div id="buying-and-selling-winr" class="guides-content mb-4">
                  <div class="pt-4 mb-4">
                    <h4>
                      {{ $t('buying_and_selling_winr') }}
                    </h4>
                  </div>
                  <div class="row text-list">
                    <div class="col-12 mb-4">
                      <div class="list-item pl-5">
                        <svg viewBox="0 0 20 23" class="icon mr-3">
                          <use xlink:href="#icon-dice-red"></use>
                        </svg>
                        <p v-html="$t('buying_and_selling_winr_1')" />
                      </div>
                    </div>
                    <div class="col-12">
                      <div class="list-item pl-5">
                        <svg viewBox="0 0 20 23" class="icon mr-3">
                          <use xlink:href="#icon-dice-red"></use>
                        </svg>
                        <p>
                          {{ $t('buying_and_selling_winr_2') }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="how-to-use-justbet" class="guides-content mb-4">
                  <div class="pt-4 mb-4">
                    <h4>
                      How to use JustBet platform like a centralized gaming
                      platform?
                    </h4>
                  </div>
                  <p
                    v-for="(paragraph, key) in $t(
                      'how_to_use_justbet_like_a_centralired_carino.paragraphs'
                    )"
                    :key="key"
                    class="mb-4"
                    v-html="paragraph"
                  />
                </div>
              </div>
            </div>
            <div class="col-4 d-none d-lg-block">
              <div class="nav-content px-5 pt-4 pb-5">
                <b-nav v-b-scrollspy class="d-flex flex-column">
                  <b-nav-item href="#introduction">
                    {{ $t('introduction') }}
                  </b-nav-item>
                  <b-nav-item href="#how-to-play">
                    {{ $t('how_to_play') }}
                  </b-nav-item>
                  <b-nav-item href="#how-to-join">
                    {{ $t('how_to_join_the_weekly_lottery') }}
                  </b-nav-item>
                  <b-nav-item href="#daily-profits-sharing">
                    {{ $t('daily_profits_sharing') }}
                  </b-nav-item>
                  <b-nav-item href="#mining">
                    {{ $t('mining') }}
                  </b-nav-item>
                  <b-nav-item href="#buying-and-selling-winr">
                    {{ $t('buying_and_selling_winr') }}
                  </b-nav-item>
                  <b-nav-item href="#how-to-use-justbet">
                    {{
                      $t('how_to_use_justbet_like_a_centralired_carino.title')
                    }}
                  </b-nav-item>
                </b-nav>
                <a
                  target="_blank"
                  href="/whitepaper.pdf"
                  class="btn mt-4 mb-3 btn-red uppercase"
                >
                  <svg
                    viewBox="0 0 18 20"
                    class="icon icon-whitepaper mr-2 ml-1"
                  >
                    <use xlink:href="#icon-whitepaper"></use>
                  </svg>
                  {{ $t('whitepaper') }}
                </a>
                <b-button
                  variant="yellow"
                  class="uppercase"
                  @click="redirect('/how-it-works')"
                >
                  <svg viewBox="0 0 15 20" class="icon icon-hiw mr-2 ml-1">
                    <use xlink:href="#icon-hiw"></use>
                  </svg>
                  {{ $t('how_it_works') }}
                </b-button>
              </div>
            </div>
          </div>
          <img
            src="~/assets/images/guides-image.png"
            class="w-100 mt-4 guide-image"
            alt=""
          />
        </div>
        <Footer extra-class="mt-5" />
      </div>
    </div>
  </div>
</template>

<script>
import { Footer, Header, List, TotalBar } from '~/components/ui/'

export default {
  components: {
    Footer,
    Header,
    List,
    TotalBar
  },
  data() {
    return {}
  },
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scope>
.guides {
  .guide-bg {
    .guides-content {
      background-image: url(~assets/images/guide-coin.png);
      background-repeat: no-repeat;
      background-position: top center;
      background-size: 80% auto;
    }
  }
  .guide-image {
    margin-bottom: -13.7%;
  }
  .nav-content {
    background: #1d2738;
    position: sticky;
    top: 50px;
    border-radius: 10px;
    .nav-link {
      position: relative;
      padding-left: 0;
      color: #68758c;
      font-size: 0.8em;
      &:hover {
        color: #d9113a;
      }
      &.active {
        color: #fff;
        &:before {
          content: '';
          display: block;
          position: absolute;
          pointer-events: none;
          top: 50%;
          left: -20px;
          width: 2px;
          height: 60%;
          transform: translateY(-50%);
          transition: 150ms;
          background: #d9113a;
          box-shadow: 0px 0px 10px 3px rgba(217, 17, 58, 0.5);
          -webkit-filter: blur(0.5px);
          filter: blur(0.5px);
        }
      }
    }
    .btn {
      font-weight: 500;
      font-size: 0.8em;
      .icon {
        width: 15px;
        margin-top: -5px;
        &.icon-hiw {
          width: 12px;
        }
      }
    }
  }
}
</style>
