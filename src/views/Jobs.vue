<template>
  <div class="body__container">
    <JobsListing
      :breadcrumbs="breadcrumbs"
      :pageTitle="listingPageTitle"
      :alertStatus="listingAlert"
    />
  </div>
</template>

<script>
import JobsListing from "@/components/jobs/JobsListing";

export default {
  components: {
    JobsListing
  },
  data() {
    return {
      breadcrumbs: [
        {
          name: "Jobs",
          path: "jobs"
        }
      ],
      listingPageTitle: "Latest jobs",
      listingAlert: true
    };
  },
  mounted() {},
  beforeMount() {},
  metaInfo: {
    title: "Jobs"
  }
};
</script>

<style lang="scss" scoped></style>
