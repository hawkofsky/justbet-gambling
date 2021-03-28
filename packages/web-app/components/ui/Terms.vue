<template>
  <div v-if="show" class="terms py-3 pr-5 pl-4">
    <slot></slot>
    <div class="mt-2">
      <button type="button" class="btn btn-red" @click="close">
        Accept All Cookies
      </button>
      <button type="button" class="btn btn-red ml-2" @click="close">
        Leave
      </button>
    </div>
    <!--button type="button" aria-label="Close" class="close" @click="close">
      ×
    </button-->
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      show: false
    }
  },
  mounted() {
    this.interval = setInterval(() => {
      this.open()
    }, 1000)
  },
  methods: {
    close() {
      localStorage[this.id] = true
      this.$set(this, 'show', false)
      clearInterval(this.interval)
    },
    open() {
      const terms = document.querySelector('.terms')
      if (terms === null) {
        this.$set(this, 'show', !localStorage[this.id])
        setTimeout(() => {
          document.querySelectorAll('.terms a').forEach(link => {
            link.onclick = e => {
              e.preventDefault()
              this.close()
            }
          })
        }, 500)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.terms {
  position: fixed;
  bottom: 50px;
  right: 50px;
  max-width: 600px;
  z-index: 999;
  background: #111c2a;
  line-height: 2em;
  opacity: 1;
  border-radius: 20px;
  box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.7);
  .close {
    position: absolute;
    right: 20px;
    top: 19px;
    text-shadow: none;
    color: #fff;
    opacity: 1;
  }
}
@media (max-width: 768px) {
  .terms {
    left: 0;
    width: 100%;
  }
}
</style>
