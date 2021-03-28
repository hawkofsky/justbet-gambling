<template>
  <div class="game-list mt-5">
    <h1 class="semi-bold d-none">
      {{ $t('our_games') }}
    </h1>
    <div class="row align-items-end">
      <div :class="`game-list-item mt-5 ${smallIcons ? 'small' : ''}`">
        <GameItem
          :show-title="showTitle"
          :title="$t('game.dice')"
          to="/game/dice"
        >
          <DiceIcon />
        </GameItem>
      </div>
      <div :class="`game-list-item mt-5 ${smallIcons ? 'small' : ''}`">
        <GameItem
          :show-title="showTitle"
          :title="$t('game.coin_flip')"
          to="/game/coin"
        >
          <CoinFlipIcon />
        </GameItem>
      </div>
      <div :class="`game-list-item ${smallIcons ? 'small' : ''} hidden`">
        <GameItem :show-title="showTitle" :title="$t('game.moon')" to="/">
          <!--/game/moon-->
          <MoonIcon />
        </GameItem>
      </div>
      <div :class="`game-list-item mt-5 ${smallIcons ? 'small' : ''} hidden`">
        <GameItem :show-title="showTitle" :title="$t('game.wheel')" to="/">
          <!--/game/wheel-->
          <WheelIcon />
        </GameItem>
      </div>
      <div :class="`game-list-item mt-5 ${smallIcons ? 'small' : ''} hidden`">
        <GameItem :show-title="showTitle" :title="$t('game.poker')" to="/">
          <PokerIcon />
        </GameItem>
      </div>
      <div :class="`game-list-item mt-5 ${smallIcons ? 'small' : ''} hidden`">
        <GameItem :show-title="showTitle" :title="$t('game.roluette')" to="/">
          <RouletteIcon />
        </GameItem>
      </div>
      <div :class="`game-list-item mt-5 ${smallIcons ? 'small' : ''} hidden`">
        <GameItem :show-title="showTitle" :title="$t('game.blackjack')" to="/">
          <BlackjackIcon />
        </GameItem>
      </div>
      <div :class="`game-list-item mt-5 ${smallIcons ? 'small' : ''} hidden`">
        <GameItem
          :show-title="showTitle"
          :title="$t('game.slot_machine')"
          to="/"
        >
          <SlotMachineIcon />
        </GameItem>
      </div>
      <div :class="`game-list-item mt-5 ${smallIcons ? 'small' : ''} hidden`">
        <GameItem
          :show-title="showTitle"
          :title="$t('game.sports_betting')"
          to="/"
        >
          <SportsBettingIcon />
        </GameItem>
      </div>
      <div :class="`game-list-item mt-5 ${smallIcons ? 'small' : ''} hidden`">
        <GameItem :show-title="showTitle" :title="$t('game.bacarrat')" to="/">
          <BacarratIcon />
        </GameItem>
      </div>
    </div>
  </div>
</template>

<script>
import {
  CoinFlipIcon,
  GameItem,
  MoonIcon,
  WheelIcon,
  DiceIcon,
  PokerIcon,
  RouletteIcon,
  BlackjackIcon,
  SlotMachineIcon,
  SportsBettingIcon,
  BacarratIcon
} from '~/components/ui/'

export default {
  components: {
    CoinFlipIcon,
    GameItem,
    MoonIcon,
    WheelIcon,
    DiceIcon,
    PokerIcon,
    RouletteIcon,
    BlackjackIcon,
    SlotMachineIcon,
    SportsBettingIcon,
    BacarratIcon
  },
  props: {
    showTitle: {
      type: Boolean,
      default: true
    },
    smallIcons: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss">
.game-list {
  &-item {
    padding: 0 15px;
    width: 50%;

    &.small {
      width: 12.5%;
    }

    &.hidden {
      .image {
        filter: grayscale(1);
      }
    }

    @media (min-width: 500px) {
      width: 33.33333%;
    }

    @media (min-width: 768px) {
      width: 25%;
    }

    @media (min-width: 1080px) {
      width: 20%;
    }
  }

  @media (max-width: 500px) {
    overflow: hidden;
  }
}
</style>
