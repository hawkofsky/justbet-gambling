<template>
  <div class="mobile-header d-block d-md-none">
    <div
      class="d-flex justify-content-between align-items-center flex-row px-4 h-100"
    >
      <Logo :dice="true" />
      <div class="d-flex justify-content-center align-items-center">
        <Language extra-class="mb-0 mobile" />
      </div>
    </div>
  </div>
</template>

<script>
import Language from './Language.vue'
import Logo from './Logo.vue'

export default {
  components: {
    Language,
    Logo
  }
}
</script>

<style lang="scss">
.mobile-header {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 70px;
  z-index: 9;
  background: #1d2738;
  box-shadow: 0px 0px 5px 0px #141d2b;
  img {
    height: 35px;
  }
}
</style>
