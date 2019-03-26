import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("./views/Home.vue")
    },
    {
      path: "/about",
      name: "about",
      component: () => import("./views/About.vue")
    },
    {
      path: "/jobs",
      name: "jobs",
      component: () => import("./views/Jobs.vue")
    },
    {
      path: "/jobs/:id",
      name: "jobsSingle",
      component: () => import("./views/Job.vue")
    },
    {
      path: "/company/:id",
      name: "companySingle",
      component: () => import("./views/Company.vue")
    },
    {
      path: "/submit-job",
      name: "submitJob",
      component: () => import("./views/SubmitAJob.vue")
    },
    {
      path: "/terms-conditions",
      name: "termsAndConditions",
      component: () => import("./views/About.vue")
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ x: 0, y: 0 });
      }, 10);
    });
  }
});
