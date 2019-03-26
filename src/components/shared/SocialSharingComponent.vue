<template>
  <div class="social__icons">
    <div class="icon twitter">
      <a :href="shareTwitter()" target="_blank">
        <img src="@/assets/img/social-twitter.svg" alt>
      </a>
    </div>
    <div class="icon facebook">
      <a :href="shareFacebook()" target="_blank">
        <img src="@/assets/img/social-facebook.svg" alt>
      </a>
    </div>
    <div class="icon linkedin">
      <a :href="shareLinkedIn()" target="_blank">
        <img src="@/assets/img/social-linkedin.svg" alt>
      </a>
    </div>
    <div class="icon email">
      <a :href="shareEmail()" target="_blank">
        <img src="@/assets/img/social-email.svg" alt>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "SocialComponent",
  components: {},
  props: {
    url: {
      type: String,
      default: null
    },
    title: {
      type: String,
      default: null
    }
  },
  methods: {
    shareFacebook() {
      return (
        "https://www.facebook.com/sharer/sharer.php?u=" + encodeURI(this.url)
      );
    },
    shareTwitter() {
      return (
        "http://twitter.com/share?text=" +
        this.title +
        "&url=" +
        encodeURI(this.url) +
        "&hashtags=Mauritius, MSCC"
      );
    },
    shareEmail() {
      return (
        "mailto:?subject=" +
        this.title +
        "- Jobs In Tech &body=Hello, see this job opening: " +
        encodeURI(this.url)
      );
    },
    shareLinkedIn() {
      return (
        "https://www.linkedin.com/shareArticle?mini=true&url=" +
        encodeURI(this.url) +
        "&title=" +
        encodeURI(this.title) +
        "&summary=" +
        encodeURI(this.title) +
        "&source=LinkedIn"
      );
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
      background: var(--color-yellow);
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
