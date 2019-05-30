<template>
  <div class="showbox">
    <div :class="['loader', {'small': small}, {'tiny': tiny}]">
      <svg class="circular" viewBox="25 25 50 50">
        <circle
          :class="['path', {'tiny': tiny}]"
          cx="50"
          cy="50"
          r="20"
          fill="none"
          :stroke-width="!tiny ? 2 : 4"
          stroke-miterlimit="10"
        ></circle>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    small: {
      default: false,
      type: Boolean
    },
    tiny: {
      default: false,
      type: Boolean
    }
  }
};
</script>

<style lang="scss" scoped>
// scaling... any units
$width: 100px;

.loader {
  position: relative;
  margin: 0 auto;
  width: $width;
  height: 200px;

  &.small {
    height: 70px;
    width: 70px;
  }

  &.tiny {
    height: 30px;
    width: 30px;
  }

  &:before {
    content: "";
    display: block;
    padding-top: 100%;
  }
}

.circular {
  animation: rotate 2s linear infinite;
  height: 100%;
  transform-origin: center center;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}

.path {
  stroke-dasharray: 1, 200;
  stroke-dashoffset: 0;
  animation: dash 1.5s ease-in-out infinite, color 6s ease-in-out infinite;
  stroke-linecap: round;

  &.tiny {
    animation: dash 1.5s ease-in-out infinite, colorless 6s ease-in-out infinite;
  }
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35px;
  }
  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124px;
  }
}

@keyframes color {
  100%,
  0% {
    stroke: var(--color-red);
  }
  40% {
    stroke: var(--color-blue);
  }
  66% {
    stroke: var(--color-yellow);
  }
  80%,
  90% {
    stroke: var(--color-green);
  }
}

@keyframes colorless {
  100%,
  0% {
    stroke: var(--color-white);
  }
  100% {
    stroke: var(--color-white);
  }
}

.showbox {
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2%;
  z-index: 1;
}
</style>
