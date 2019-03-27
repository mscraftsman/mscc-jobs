<template>
  <div>
    <h2>Recent Jobs</h2>
    <div class="recent__jobs">
      <div
        class="job__block"
        v-for="(job, index) in jobs"
        v-if="index < 5 && job.id !== notIncludeId"
        :key="index"
      >
        <router-link
          :to="{ name: 'jobsSingle', params: { id: job.id }  }"
          class="title"
        >{{job.job.name}}</router-link>
        <router-link
          class="company"
          :to="{ name: 'companySingle', params: { id: job.company.id }  }"
        >{{job.company.name}}</router-link>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  props: {
    notIncludeId: {
      type: String,
      default: null
    }
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      jobs: "jobs/getJobs"
    })
  }
};
</script>

<style lang="scss" scoped>
.recent__jobs {
  .job__block {
    padding-bottom: 10px;
    border-bottom: 1px solid var(--color-gray-light);
    margin-bottom: 10px;

    &:last-child {
      border-bottom: 0;
    }

    .title {
      text-decoration: none;
      color: var(--color-light);
      font-style: normal;
      font-weight: bold;
      font-size: 18px;
      display: block;
    }
    .company {
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: normal;
      font-weight: 100;
      text-decoration: none;
      color: var(--color-light);
      display: block;
    }
  }
}
</style>
