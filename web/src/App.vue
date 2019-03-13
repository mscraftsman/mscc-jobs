<template>
  <div id="app">
    <router-view :key="$route.path"/>
  </div>
</template>

<script>
import "normalize-css";

export default {
  name: "App",
  components: {}
};
</script>


<style lang="scss">
* {
  box-sizing: border-box;
}

#app,
body {
  font-family: var(--font-Poppins);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.container__fw {
  max-width: 1400px;
  padding: 0 10px;
  margin: 0 auto;
}
</style>
