<template>
  <div id="app" class="theme-global">
    <SiteHeader />
    <router-view :key="$route.path" />
    <SiteFooter />
  </div>
</template>

<script>
import "normalize-css";
import SiteHeader from "@/components/shared/SiteHeader.vue";
import SiteFooter from "@/components/shared/SiteFooter.vue";

export default {
  name: "App",
  components: {
    SiteHeader,
    SiteFooter
  }
};
</script>


<style lang="scss">
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
.company-profile__view {
  background: var(--color-bg);
  padding-bottom: calc(var(--gutter) * 2);
}
</style>
