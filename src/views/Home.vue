<template>
  <div>
    <JumboSearch
      @searchTriggered="searchTriggered"
      :keywordValue="search.keyword"
      :locationValue="search.location"
    />
    <JobsListing
      :breadcrumbs="breadcrumbs"
      :pageTitle="listingPageTitle"
      :alertStatus="listingAlert"
      :isHomepage="true"
      :isSearch="isSearch"
      :searchResults="jobs"
      :loading="loading"
    />
  </div>
</template>

<script>
import SiteHeader from "@/components/shared/SiteHeader.vue";
import JumboSearch from "@/components/homepage/JumboSearch.vue";
import JobsListing from "@/components/jobs/JobsListing.vue";

import {
  SEARCH_ENDPOINT,
  SITE_ID,
  GOOGLE_MAPS_API_KEY,
  DEFAULT_RADIUS_MILES
} from "@/store/constants";

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
      listingAlert: true,
      jobs: [],
      loading: true,
      isSearch: false,
      search: {
        keyword: null,
        location: null
      },
      filter: {
        id: null,
        keyword: null,
        Seed: 0,
        Offset: 0,
        Limit: 0,
        Live: 0,
        JobType: 0,
        ContractType: 0,
        Radius: 0,
        latitude: 0.0,
        longitude: 0.0,
        StartDate: null,
        EndDate: null,
        HasStartDate: false,
        HasEndDate: false,
        IsCountry: false,
        StartMonth: 0,
        EndMonth: 0,
        locationValue: null
      }
    };
  },
  methods: {
    searchTriggered(val) {
      console.log(val);

      // -------- To build URL -------
      let keyword = val.keyword;
      let location = val.locationValue;
      let query = {};
      if (String(keyword).trim().length && keyword !== null) {
        query.keyword = keyword;
      }
      if (String(location).trim().length && location !== null) {
        query.location = location;
      }
      // -------- To build URL -------

      if (
        typeof val.keyword !== "undefined" ||
        typeof val.locationValue !== "undefined"
      ) {
        // Push to router
        this.$router.push({ name: "home", query: query });

        this.loading = true;
        this.isSearch = true;
        this.$store
          .dispatch("jobs/executeJobsSearch", { value: val })
          .then(response => {
            console.log(response);
            this.jobs = response;
            this.loading = false;
            this.$scrollTo("#joblisting", "0.3s", {
              offset: -50
            });
          })
          .catch(error => {
            console.error(error);
          });
      }
    },
    fetchData() {
      this.$store
        .dispatch("jobs/getLatestJobsFromApi")
        .then(response => {
          console.log(response);
          this.jobs = response;
          this.loading = false;
        })
        .catch(error => {
          console.error(error);
        });
    },
    sanitizeModel: function() {
      this.filter.id = SITE_ID.replace("/sites/", "");
      this.filter.keyword = this.search.keyword;
      this.filter.locationValue = this.search.location;
      this.filter.ContractType = -1;
      this.filter.EndDate = "2017-12-01";
      this.filter.HasStartDate = false;
      this.filter.HasEndDate = false;
      this.filter.JobType = -1;
      this.filter.Live = -1;
      this.filter.Radius = DEFAULT_RADIUS_MILES;
      this.filter.Seed = 5;
      this.filter.StartDate = "1753-01-01";
      this.filter.Offset = 0;
    },
    checkURL() {
      let keyword = this.$route.query.keyword;
      let location = this.$route.query.location;

      if (typeof keyword !== "undefined") {
        this.search.keyword = keyword;
      }

      if (typeof location !== "undefined") {
        this.search.location = location;
      }

      // Sanitize model
      this.sanitizeModel();

      //Check URL if has params or now else fetch latest jobs
      if (typeof keyword !== "undefined" || typeof location !== "undefined") {
        this.searchTriggered(this.filter);
      } else {
        this.fetchData();
      }
    }
  },
  beforeMount() {
    this.checkURL();
  },
  watch: {
    $route(from, to) {
      // this.fetchData();
    }
  }
};
</script>

<style lang="scss" scoped>
</style>

