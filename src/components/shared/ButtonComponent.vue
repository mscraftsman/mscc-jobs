<template>
  <router-link :to="url" :class="['button__global', classStyle, color]">
    <img
      :src="icon"
      :class="[
        'icon',
        { on__desktop_only: iconOnDesktop },
        { on__mobile_only: iconOnMobile }
      ]"
    />
    <span
      :class="[
        'text',
        { on__desktop_only: textOnDesktop },
        { on__mobile_only: textOnMobile }
      ]"
      >{{ text }}</span
    >
  </router-link>
</template>

<script>
export default {
  props: {
    url: {
      type: Object,
      default: () => {
        return {};
      }
    },
    text: {
      type: String,
      default: "JIT"
    },
    color: {
      type: String,
      default: "yellow"
    },
    classStyle: {
      type: String,
      default: null
    },
    icon: {
      type: String,
      default: null
    },
    iconOnMobile: {
      type: Boolean,
      default: false
    },
    iconOnDesktop: {
      type: Boolean,
      default: false
    },
    textOnMobile: {
      type: Boolean,
      default: true
    },
    textOnDesktop: {
      type: Boolean,
      default: true
    }
  }
};
</script>

<style lang="scss" scoped></style>
