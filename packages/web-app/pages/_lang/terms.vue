<template>
  <div class="main-content guides">
    <TotalBar />
    <div class="container">
      <div class="py-5">
        <Header />
        <div class="mt-5">
          <h2 class="mb-5 semi-bold">{{ $t('terms.title') }}</h2>
          <div class="row">
            <div class="col-12 col-lg-8">
              <div class="guide-bg">
                <p
                  v-for="(paragraph, j) in $t('terms.paragraphs')"
                  :key="j"
                  class="mb-4"
                  v-html="paragraph"
                />
                <div
                  v-for="(element, i) in $t('terms.elements')"
                  :id="element.id"
                  :key="i"
                >
                  <div :id="element.id" class="mb-4">
                    <h4>{{ element.title }}</h4>
                  </div>
                  <p
                    v-for="(paragraph, j) in element.paragraphs"
                    :key="j"
                    class="mb-4"
                    v-html="paragraph"
                  />
                  <List v-if="element.list" :items="element.list" />
                </div>
              </div>
            </div>
            <div class="col-4 d-none d-lg-block">
              <div class="nav-content px-5 pt-4 pb-5">
                <b-nav v-b-scrollspy class="d-flex flex-column">
                  <template v-for="(element, i) in $t('terms.elements')">
                    <b-nav-item :key="i" :href="`#` + element.id">
                      {{ element.title }}
                    </b-nav-item>
                    <template v-for="(item, j) in element.heads">
                      <b-nav-item
                        v-if="item.id"
                        :key="j"
                        class="pl-2 mt-n2"
                        :href="`#` + item.id"
                      >
                        {{ item.title }}
                      </b-nav-item>
                      <template v-for="(sub, k) in item.subs">
                        <!-- eslint-disable  -->
                        <b-nav-item
                          :key="k"
                          class="pl-4 mt-n2"
                          :href="`#` + sub.id"
                          v-if="sub.id"
                        >
                          {{ sub.title }}
                        </b-nav-item>
                        <!-- eslint-enable  -->
                      </template>
                    </template>
                  </template>
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
