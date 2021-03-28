<template>
  <div class="sidebar vh-100 d-none d-md-block">
    <div
      class="d-flex justify-content-between align-items-center flex-column h-100"
    >
      <Logo :dice="true" extra-class="mt-4" />
      <Navigation @handle-loader="handleLoader" />
      <div class="mb-4">
        <Language extra-class="mb-4" />
      </div>
    </div>
  </div>
</template>

<script>
import { Logo, Navigation, Language } from '~/components/ui/'

export default {
  components: {
    Language,
    Logo,
    Navigation
  },
  methods: {
    handleLoader(loadStatus) {
      this.$emit('handle-loader', loadStatus)
    }
  }
}
</script>

<style lang="scss">
.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  width: 100px;
  z-index: 9;
  background: #1d2738;
}
</style>
