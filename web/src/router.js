import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      component: Home
    },
    {
      path: "/jobs",
      name: "jobs",
      component: () => import("./views/Home.vue")
    },
    {
      path: "/jobs/id",
      name: "jobsSingle",
      component: () => import("./views/Home.vue")
    },
    {
      path: "/company/:id",
      name: "companySingle",
      component: () => import("./views/Home.vue")
    },
    {
      path: "/submit-job",
      name: "submitJob",
      component: () => import("./views/Home.vue")
    },
    {
      path: "/terms-conditions",
      name: "termsAndConditions",
      component: () => import("./views/Home.vue")
    }
  ]
});
