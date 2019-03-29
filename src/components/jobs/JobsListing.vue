<template>
  <div class="views job-listing__view">
    <HeadingBreadcrumbs
      :breadcrumbs="breadcrumbs"
      :pageTitle="pageTitle"
      :alertStatus="alertStatus"
    />

    <div class="container__fw">
      <div class="filtered__content">
        <div class="heading">Showing results:</div>
        <div class="tags white__bg">
          <ul>
            <li>
              <span class="tag">Front-end</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="jobs__listing">
        <div class="jobs">
          <JobBlock v-for="(job, index) in jobs" :jobData="job" :key="index"/>

          <div class="load__more-jobs">
            <button class="load_more__button button__global outline blue">Load more</button>
          </div>
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
    }
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      jobs: "jobs/getJobs"
    })
  },
  beforeMount() {}
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

@media (max-width: 1024px) {
  .jobs__listing {
    grid-template-columns: 1fr;
  }
}
</style>

