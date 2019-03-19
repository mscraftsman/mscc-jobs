<template>
  <div class="social__icons">
    <div class="icon facebook">
      <a :href="facebook" target="_blank">
        <img src="@/assets/img/social-twitter.svg" alt />
      </a>
    </div>
    <div class="icon twitter">
      <a :href="twitter" target="_blank">
        <img src="@/assets/img/social-facebook.svg" alt />
      </a>
    </div>
    <div class="icon linkedin">
      <a :href="linkedin" target="_blank">
        <img src="@/assets/img/social-linkedin.svg" alt />
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "SocialComponent",
  components: {},
  props: {
    facebook: {
      type: String,
      default: null
    },
    twitter: {
      type: String,
      default: null
    },
    linkedin: {
      type: String,
      default: null
    }
  }
};
</script>

<style lang="scss" scoped>
.social__icons {
  display: flex;

  .icon {
    display: block;
    margin-right: 10px;

    a {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      background: var(--social-icon-background-color);
      border-radius: 50px;
      transition: all 0.2s ease-in-out;

      img {
        height: 15px;
      }

      &:hover {
        transform: scale(1.1);
      }
    }
  }
}
</style>
