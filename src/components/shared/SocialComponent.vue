<template>
  <div class="social__icons">
    <div class="icon facebook" v-if="facebook">
      <a :href="facebook" target="_blank" rel="noopener">
        <img src="@/assets/img/social-facebook.svg" 
          alt="Find us on Facebook"
          title="Find us on Facebook"
          loading="lazy" />
      </a>
    </div>
    <div class="icon twitter" v-if="twitter">
      <a :href="twitter" target="_blank" rel="noopener">
        <img src="@/assets/img/social-twitter.svg" 
          alt="Find us on Twitter"
          title="Find us on Twitter"
          loading="lazy" />
      </a>
    </div>
    <div class="icon linkedin" v-if="linkedin">
      <a :href="linkedin" target="_blank" rel="noopener">
        <img src="@/assets/img/social-linkedin.svg" 
          alt="Find us on LinkedIn"
          title="Find us on LinkedIn"
          loading="lazy" />
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
      background: var(--social-icons-background-color);
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
