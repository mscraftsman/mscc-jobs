import Vue from "vue";
import Router from "vue-router";
// import VueScrollTo from 'vue-scrollto';

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
      path: "/privacy", // Generic
      name: "privacyPolicy",
      component: () => import("./views/Generic.vue")
    },
    {
      path: "/terms", // Generic
      name: "termsOfUse",
      component: () => import("./views/Generic.vue")
    },
    {
      path: "/contact", // Generic
      name: "contact",
      component: () => import("./views/Generic.vue")
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
      path: "/page/:id", // Generic
      name: "GenericContent",
      component: () => import("./views/Generic.vue")
    },
    { path: "*", component: () => import("./views/NotFound.vue") }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      // VueScrollTo.scrollTo(to.hash, 700);
      return { selector: to.hash };
    } else if (savedPosition) {
      return savedPosition;
    } else {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({ x: 0, y: 0 });
        }, 10);
      });
    }
  }
});
