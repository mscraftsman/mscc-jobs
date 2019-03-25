<template>
  <div>
    <JumboSearch/>
    <JobsListing
      :breadcrumbs="breadcrumbs"
      :pageTitle="listingPageTitle"
      :alertStatus="listingAlert"
    />
  </div>
</template>

<script>
import SiteHeader from "@/components/shared/SiteHeader.vue";
import JumboSearch from "@/components/homepage/JumboSearch.vue";
import JobsListing from "@/components/jobs/JobsListing.vue";

export default {
  name: "home",
  components: {
    SiteHeader,
    JumboSearch,
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
  }
};
</script>

<style lang="scss" scoped>
</style>

