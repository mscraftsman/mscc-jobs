import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import "./registerServiceWorker";
import * as VueGoogleMaps from "vue2-google-maps";
import VeeValidate from "vee-validate";
import VueTheMask from "vue-the-mask";
import VModal from "vue-js-modal";
import Meta from "vue-meta";
import VueTimeago from "vue-timeago";
import VueScrollTo from "vue-scrollto";

import { GOOGLEMAPS_KEY } from "../src/store/constants";

Vue.config.productionTip = false;

Vue.use(VeeValidate);
Vue.use(VueGoogleMaps, {
  load: {
    key: GOOGLEMAPS_KEY,
    libraries: "places"
  }
});
Vue.use(VueTheMask);
Vue.use(VModal);
Vue.use(Meta);

Vue.use(VueTimeago, {
  name: "Timeago",
  locale: "en"
});

Vue.use(VueScrollTo);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
