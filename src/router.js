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
      path: "/about", // Generic
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
      path: "/profile/:id",
      name: "profileSingle",
      component: () => import("./views/Company.vue")
    },
    {
      path: "/submit-job",
      name: "submitJob",
      component: () => import("./views/SubmitAJob.vue")
    },
    {
      path: "/404",
      name: "notFound",
      component: () => import("./views/NotFound.vue")
    },
    {
      path: "/:id", // Generic
      name: "GenericContent",
      component: () => import("./views/Generic.vue")
    },
    { path: "*", component: () => import("./views/NotFound.vue") }
  ],
  scrollBehavior(to, from, savedPosition) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ x: 0, y: 0 });
      }, 10);
    });
  }
});
