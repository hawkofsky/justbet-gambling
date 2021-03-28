<template>
  <div class="game-result" :class="{ 'show-result': showGameResult }">
    <span class="game-result__title">Game result</span>
    <div v-if="Object.keys(gameResult).length" class="game-result__result semi-bold">
      <div>
        {{ gameResult.won ? 'You won' : 'You lost' }}
      </div>

      <span :class="`mx-2 ${gameResult.won ? 'green' : 'red'}`">
      {{ gameResult.won ? '+' : '' }}
      {{ gameResult.prize | toFormat0 }}
      </span>
      <img
        v-if="!gameResult.playUSDT"
        src="~/assets/images/coin-trx-silver.png"
        alt="icon-coin"
        class="icon-coin"
      />
      <img
        v-if="gameResult.playUSDT"
        src="~/assets/svg/coin-usdt-gray.svg"
        alt="icon-coin"
        class="icon-coin"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'GameResult',
  props: {
    gameResult: {
      type: Object,
      default: () => ({})
    },
    showGameResult: {
      type: Boolean,
      default: () => false
    }
  }
}
</script>

<style lang="scss" scoped>
.game-result {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: fixed;
  width: 360px;
  height: 107px;
  padding: 10px;
  left: 0;
  right: 0;
  bottom: 0%;
  transform: translateY(105%);
  margin: 0 auto;
  background: #283345 url('~assets/images/bg-result.png') no-repeat;
  border-radius: 10px 10px 0 0;
  transition: transform 0.3s;
  will-change: transform;
  z-index: 1009;

  &.show-result {
    transform: translateY(0);
  }

  .game-result__title {
    color: #68758c;
  }
  .game-result__result {
    display: flex;
    color: #fff;
    font-size: 20px;
    .green {
      color: #3ed957;
    }
    .red {
      color: red;
    }
  }

  .icon-coin {
    width: 24px;
    height: 24px;
  }
}
</style>