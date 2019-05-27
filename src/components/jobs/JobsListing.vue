<template>
  <div class="views job-listing__view">
    <HeadingBreadcrumbs
      :breadcrumbs="breadcrumbs"
      :pageTitle="pageTitle"
      :alertStatus="alertStatus"
    />

    <div class="container__fw">
      <div class="filtered__content" v-if="hasTag">
        <div class="heading">Showing results:</div>
        <div class="tags white__bg">
          <ul>
            <li>
              <span class="tag">{{hasTag}}</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="jobs__listing">
        <div class="jobs">
          <template v-if="isHomepage && jobs && jobs.length">
            <template v-for="(job, index) in jobs">
              <transition-group name="addjobblock" :key="index">
                <JobBlock v-if="index <= limit" :jobData="job" :key="index"/>
              </transition-group>
            </template>

            <div class="load__more-jobs" v-if="loadMoreVisibility">
              <button
                class="load_more__button button__global outline blue"
                @click="addJobs()"
              >Load more</button>
            </div>
          </template>

          <template v-if="!isHomepage && jobsSearched && jobsSearched.length">
            <JobBlock
              v-if="jobsSearched && jobsSearched.length"
              v-for="(job, index) in jobsSearched"
              :jobData="job"
              :key="index"
            />
          </template>
        </div>
        <div class="sidebar">
          <div class="sidebar__block">
            <div class="sidebar__wrapper"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import HeadingBreadcrumbs from "@/components/shared/HeadingBreadcrumbs";
import JobBlock from "@/components/jobs/JobBlock";
import { mapGetters } from "vuex";

export default {
  components: {
    HeadingBreadcrumbs,
    JobBlock
  },
  props: {
    breadcrumbs: {
      type: Array,
      default: () => {
        return [];
      }
    },
    pageTitle: {
      type: String,
      default: "Jobs In Tech"
    },
    alertStatus: {
      type: Boolean,
      default: false
    },
    isHomepage: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      hasParams: false,
      hasTag: false,
      limit: 9,
      loadMoreVisibility: true
    };
  },
  computed: {
    ...mapGetters({
      jobs: "jobs/getJobs",
      jobsSearched: "jobs/getJobsSearched"
    })
  },
  beforeMount() {
    // this.$store.dispatch("companies/getCompaniesFromApi");

    // Only if homepage, get latest jobs from API
    if (this.isHomepage) {
      // props
      this.$store.dispatch("jobs/getLatestJobsFromApi");
    } else {
      //Do search as per query in url
      let searchTag = false;
      let searchKeyword = false;
      let searchLocation = false;
      let payload = {};

      if (typeof this.$route.query.tag !== "undefined") {
        payload.tag = decodeURIComponent(this.$route.query.tag);
      }

      if (typeof this.$route.query.keyword !== "undefined") {
        payload.keyword = decodeURIComponent(this.$route.query.keyword);
      }

      if (typeof this.$route.query.location !== "undefined") {
        payload.location = decodeURIComponent(this.$route.query.location);
      }

      // Dispatch action which executes search
      this.$store.dispatch("jobs/executeJobsSearch", payload);
    }

    // Check if route has params
    this.checkRoute();
  },
  methods: {
    checkRoute() {
      this.hasTag =
        typeof this.$route.query.tag !== "undefined"
          ? decodeURIComponent(this.$route.query.tag)
          : false;
    },
    addJobs() {
      let jobsLength = this.jobs.length;

      if (jobsLength > this.limit) {
        this.limit = this.limit + 10;
        this.checkLoadMoreButtonVisbility();
      } else if (this.limit >= jobsLength) {
        this.checkLoadMoreButtonVisbility();
      }
    },
    checkLoadMoreButtonVisbility() {
      let jobsLength = this.jobs.length;
      if (jobsLength > this.limit) {
        this.loadMoreVisibility = true;
      } else if (this.limit >= jobsLength) {
        this.loadMoreVisibility = false;
      }
    }
  },
  watch: {
    $route(to, from) {
      this.checkRoute();
    }
  }
};
</script>

<style lang="scss" scoped>
.jobs__listing {
  display: grid;
  grid-template-columns: 1fr 350px;
  grid-gap: calc(var(--gutter) + 10px);

  .jobs {
    .load__more-jobs {
      margin-top: calc(var(--gutter) * 2);
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .sidebar__block {
    .sidebar__wrapper {
      background: var(--color-white);
      box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.1);
      padding: var(--gutter);
    }
  }
}

.filtered__content {
  margin-bottom: var(--gutter);
  display: flex;
  align-items: center;

  .heading {
    font-size: 13px;
    color: var(--color-light);
    margin-right: 10px;
  }
}

.addjobblock-enter-active,
.addjobblock-leave-active {
  transition: opacity 0.3s;
  transform: translateY(0px);
}
.addjobblock-enter,
.addjobblock-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

@media (max-width: 1024px) {
  .jobs__listing {
    grid-template-columns: 1fr;
  }
}
</style>

