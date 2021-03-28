<template>
  <div class="main-content">
    <TotalBar />
    <div class="container">
      <div class="py-5">
        <Header :show-how-it-works-button="true" />
        <div class="mt-5 pt-5 d-none-if-empty">
          <HowItWorks />
        </div>
        <div class="pt-4">
          <GameList />
        </div>
        <div class="mt-5 pt-5">
          <CounterList />
        </div>
        <!-- <div class="mt-5 pt-4">
          <Stats />
        </div> -->
        <Footer extra-class="mt-5" />
      </div>
    </div>
  </div>
</template>

<script>
import { Footer, Header, TotalBar } from '~/components/ui/'
import { CounterList, GameList, HowItWorks } from '~/components/page/home/'

export default {
  components: {
    CounterList,
    Footer,
    GameList,
    Header,
    HowItWorks,
    TotalBar
  }
}
</script>

<style>
.d-none-if-empty:empty {
  display: none;
}
</style>
