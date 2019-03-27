<template>
  <div id="app" :class="theme">
    <SiteHeader />
    <router-view :key="$route.path" />
    <SiteFooter />
    <!-- <div class="theme-switcher" @click="switchTheme()">{{ themes[currentTheme] }}</div> -->
  </div>
</template>

<script>
import "normalize-css";
import SiteHeader from "@/components/shared/SiteHeader.vue";
import SiteFooter from "@/components/shared/SiteFooter.vue";
import { mapGetters, mapActions } from 'vuex';

export default {
  name: "App",
  components: {
    SiteHeader,
    SiteFooter
  },
  beforeMount() {
    this.$store.dispatch("jobs/getJobsFromApi");
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters({ theme: 'shared/getTheme' })
  },
  methods: {
  }
};
</script>


<style lang="scss">
body {
  overflow-y: scroll;
}

* {
  box-sizing: border-box;
}
#app,
body {
  font-family: var(--font-Poppins), Helvetica;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.container__fw {
  max-width: 1400px;
  padding: 0 10px;
  margin: 0 auto;
}
.body__container {
  margin-top: 60px;
}
.job-listing__view,
.company-profile__view,
.job-single__view,
.submit__a__job__view {
  background: var(--site-background-color);
  padding-bottom: calc(var(--gutter) * 2);
}

.job-single__view,
.submit__a__job__view {
  padding-top: var(--gutter);
}

.theme-switcher {
  position: fixed;
  bottom: 0;
  left: 0;
  background: rgba(255, 255, 255, 0.5);
  color: black;
  padding: 2px 5px;
  cursor: pointer;
  user-select: none;
  border-radius: 0 5px 0 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

a {
  outline: none;

  &:focus {
    outline: none;
  }
}
</style>