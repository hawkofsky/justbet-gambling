<template>
  <div :class="`${extraClass} logo`" @click="redirect('/')">
    <img v-if="dice" src="~/assets/images/logo_dice.svg" />
    <img v-else src="~/assets/images/logo.svg" />
  </div>
</template>

<script>
export default {
  props: {
    extraClass: {
      type: String,
      default: ''
    },
    dice: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style media="screen">
.logo {
  cursor: pointer;
}
</style>
