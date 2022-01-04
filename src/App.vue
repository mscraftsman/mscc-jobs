<template>
  <div id="app" :class="[theme, 'app']">
    <SiteHeader />
    <div class="view">
      <transition name="fade__page" mode="out-in">
        <router-view :key="$route.path" />
      </transition>
    </div>
    <SiteFooter />
    <!-- <div class="theme-switcher" @click="switchTheme()">{{ themes[currentTheme] }}</div> -->
  </div>
</template>

<script>
import "normalize-css";
import SiteHeader from "@/components/shared/SiteHeader.vue";
import SiteFooter from "@/components/shared/SiteFooter.vue";
import { mapGetters, mapActions } from "vuex";
import { DROPBOX_APP_KEY } from "./store/constants";

export default {
  name: "JobsInTechApp",
  components: {
    SiteHeader,
    SiteFooter
  },
  beforeMount() {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({ theme: "shared/getTheme" })
  },
  methods: {},
  metaInfo: {
    title: "Home",
    titleTemplate: "Jobs In Tech: %s",
    htmlAttrs: {
      lang: "en"
    }
  },
  beforeMount() {},
  mounted() {
    let dropboxScript = document.createElement("script");
    dropboxScript.setAttribute(
      "src",
      "https://www.dropbox.com/static/api/2/dropins.js"
    );
    dropboxScript.setAttribute("id", "dropboxjs");
    dropboxScript.setAttribute("data-app-key", DROPBOX_APP_KEY);
    document.head.appendChild(dropboxScript);

    let oneDriveScript = document.createElement("script");
    oneDriveScript.setAttribute("src", "https://js.live.net/v7.0/OneDrive.js");
    document.head.appendChild(oneDriveScript);
  }
};
</script>

<style lang="scss">
.app {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  background: var(--site-background-color);
}

.view,
.body__container {
  flex: 1;
}

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
.submit__a__job__view,
.generic__view {
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
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade__page-enter-active,
.fade__page-leave-active {
  transition: opacity 0.3s;
}
.fade__page-enter,
.fade__page-leave-to {
  opacity: 0;
}

a {
  outline: none;

  &:focus {
    outline: none;
  }
}
</style>
