<template>
  <div class="moon-animation">
    <svg
      v-for="index in 7"
      :key="index"
      viewBox="0 0 18 20"
      class="icon icon-moon-star"
    >
      <use xlink:href="#icon-moon-star"></use>
    </svg>
    <div class="moon"></div>
  </div>
</template>

<style lang="scss" scoped>
@mixin keyframes($animation-name) {
  @-webkit-keyframes #{$animation-name} {
    @content;
  }
  @-moz-keyframes #{$animation-name} {
    @content;
  }
  @keyframes #{$animation-name} {
    @content;
  }
}

@include keyframes(moonlight) {
  0% {
    box-shadow: 0px 0px 150px 0px white;
  }
  50% {
    box-shadow: 0px 0px 150px 10px white;
  }
  100% {
    box-shadow: 0px 0px 150px 0px white;
  }
}

@include keyframes(star1opacity) {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}

@include keyframes(stardot7opacity) {
  0% {
    opacity: 0.7;
  }
  50% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.7;
  }
}

@include keyframes(stardot5opacity) {
  0% {
    opacity: 0.5;
  }
  50% {
    opacity: 0.1;
  }
  100% {
    opacity: 0.5;
  }
}

@include keyframes(stardot4opacity) {
  0% {
    opacity: 0.4;
  }
  50% {
    opacity: 0.7;
  }
  100% {
    opacity: 0.4;
  }
}

@include keyframes(stardot3opacity) {
  0% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.8;
  }
  100% {
    opacity: 0.3;
  }
}

.moon-animation {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
  overflow: hidden;
  .moon {
    position: absolute;
    width: 120px;
    height: 120px;
    top: -60px;
    left: 50%;
    margin: 0 0 0 -60px;
    background: #fff;
    border-radius: 100%;
    animation: moonlight 10s ease-in-out infinite;
  }
  .icon-moon-star {
    position: absolute;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
    max-width: 30px;
  }
  .icon-moon-star:nth-child(1) {
    width: 10px;
    transform: translate(90px, 16px);
    animation: star1opacity 6s ease-in-out infinite;
    animation-delay: 0.2s;
  }
  .icon-moon-star:nth-child(2) {
    width: 18px;
    transform: translate(50px, 66px);
    animation: star1opacity 2s ease-in-out infinite;
    animation-delay: 0.6s;
  }
  .icon-moon-star:nth-child(3) {
    width: 8px;
    transform: translate(-80px, 26px);
    animation: star1opacity 3s ease-in-out infinite;
  }
  .icon-moon-star:nth-child(4) {
    width: 6px;
    transform: translate(-160px, 66px);
    animation: stardot7opacity 2s ease-in-out infinite;
    animation-delay: 0.4s;
  }
  .icon-moon-star:nth-child(5) {
    width: 4px;
    transform: translate(-90px, 80px);
    animation: stardot4opacity 2.5s ease-in-out infinite;
    animation-delay: 0.7s;
  }
  .icon-moon-star:nth-child(6) {
    width: 4px;
    transform: translate(-50px, 65px);
    animation: stardot3opacity 3s ease-in-out infinite;
    animation-delay: 0.2s;
  }
  .icon-moon-star:nth-child(7) {
    width: 8px;
    transform: translate(120px, 55px);
    opacity: 0.5;
    animation: stardot5opacity 4s ease-in-out infinite;
  }
}
</style>
