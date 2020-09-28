<template>
  <div>
    <JumboSearch
      @searchTriggered="searchTriggered"
      :keywordValue="search.keyword"
      :locationValue="search.location"
      :locationLat="search.lat"
      :locationLng="search.lng"
      :loading="loading"
    />
    <JobsListing
      :breadcrumbs="breadcrumbs"
      :pageTitle="listingPageTitle"
      :alertStatus="listingAlert"
      :isHomepage="true"
      :isSearch="isSearch"
      :searchResults="jobs"
      :loading="loading"
      :keywordValue="search.keyword"
      :locationValue="search.location"
      @removeKeyword="removeParams"
      @removeLocation="removeParams"
    />
  </div>
</template>

<script>
import SiteHeader from "@/components/shared/SiteHeader.vue";
import JumboSearch from "@/components/homepage/JumboSearch.vue";
import JobsListing from "@/components/jobs/JobsListing.vue";
import Utils from "@/components/utils";

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
        location: null,
        lat: 0.0,
        lng: 0.0
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
      // -------- To build URL -------
      let keyword = val.keyword;
      let location = val.locationValue;
      let lng = val.longitude;
      let lat = val.latitude;

      let query = {};
      if (keyword) {
        query.keyword = keyword;
        this.search.keyword = keyword;
      } else {
        this.search.keyword = null;
      }
      if (location) {
        query.location = location;
        this.search.location = location;
      } else {
        this.search.location = null;
      }
      if (lng) {
        query.lng = lng;
        this.search.lng = lng;
      } else {
        this.search.lng = 0.0;
      }
      if (lat) {
        query.lat = lat;
        this.search.lat = lng;
      } else {
        this.search.lat = 0.0;
      }
      // -------- To build URL -------

      if (
        typeof val.keyword !== "undefined" ||
        (typeof val.locationValue !== "undefined" &&
          typeof val.lng !== "undefined" &&
          typeof val.lat !== "undefined")
      ) {
        // Push to router
        this.$router.push({ name: "home", query: query });
        // Set loading
        this.loading = true;

        // if no value is set, get latest jobs
        if (
          (keyword === null || keyword === "") &&
          (location === null || location === "")
        ) {
          // Job Listing title
          this.listingPageTitle = "Latest jobs";
          this.fetchData();
          this.$scrollTo("#joblisting", "0.3s", {
            offset: -50
          });
        } else {
          // Set searching
          this.isSearch = true;
          this.$store
            .dispatch("jobs/executeJobsSearch", { value: val })
            .then(response => {
              this.jobs = response;
              this.loading = false;
              this.$scrollTo("#joblisting", "0.3s", {
                offset: -50
              });

              // Job Listing title
              this.listingPageTitle = "Displaying results for:";
            })
            .catch(error => {
              // console.error(error);
            });
        }
      }
    },
    fetchData() {
      this.$store
        .dispatch("jobs/getLatestJobsFromApi")
        .then(response => {
          this.jobs = response;
          this.loading = false;
          this.isSearch = false;
        })
        .catch(error => {
          // console.error(error);
        });
    },
    sanitizeModel() {
      this.filter.id = SITE_ID.replace("/sites/", "");
      this.filter.keyword = this.search.keyword;

      if (this.search.location && this.search.lat && this.search.lng) {
        this.filter.locationValue = this.search.location;
        this.filter.latitude = this.search.lat;
        this.filter.longitude = this.search.lng;
      }

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
      let lng = this.$route.query.lng;
      let lat = this.$route.query.lat;

      if (typeof keyword !== "undefined") {
        this.search.keyword = keyword;
      }

      if (typeof location !== "undefined") {
        this.search.location = location;
      }

      if (typeof lng !== "undefined") {
        this.search.lng = Number(lng);
      }

      if (typeof lat !== "undefined") {
        this.search.lat = Number(lat);
      }

      // Sanitize model
      this.sanitizeModel();

      //Check URL if has params or now else fetch latest jobs
      if (
        typeof keyword !== "undefined" ||
        (typeof location !== "undefined" &&
          typeof lng !== "undefined" &&
          typeof lat !== "undefined")
      ) {
        this.searchTriggered(this.filter);
      } else {
        this.fetchData();
      }
    },
    removeParams(val) {
      let queryObj = {
        keyword: null,
        location: null,
        lat: null,
        lng: null
      };

      // Remove only keyword
      if (val === "keyword") {
        queryObj.keyword = null;
        this.search.keyword = null;

        if (this.search.location !== null) {
          queryObj.location = this.search.location;
          queryObj.lat = this.search.lat;
          queryObj.lng = this.search.lng;
        }
      }

      // Remove only location
      if (val === "location") {
        this.search.location = null;
        this.search.lat = null;
        this.search.lng = null;

        if (this.search.keyword !== null) {
          queryObj.keyword = this.search.keyword;
        }
      }

      this.$router.push({ name: "home", query: queryObj });
      this.checkURL();
    }
  },
  beforeMount() {
    this.checkURL();
  },
  watch: {
    $route(from, to) {
      // this.fetchData();
    }
  },
  metaInfo: {
    title: "Home",
    meta: [
      { name: "rights", content: "Agile Media Ltd." },
      { name: "apple-mobile-web-app-title", content: "Jobs in Tech" },
      { name: "theme-color", content: "#b45f06" },
      { name: "application-name", content: "Jobs in Tech" },
      { name: "author", content: "Jobs in Tech" },
      { name: "description", content: "Jobs in Tech Description" },
      { type: "og:type", content: "website" },
      { name: "og:locale", content: "en_GB" },
      { name: "og:site_name", content: "Jobs in Tech" },
      { name: "og:title", content: "Jobs in Tech" },
      { name: "og:url", content: "" },
      { name: "og:description", content: "Jobs in Tech Description" },
      { name: "og:image", content: "https://jobs.mscc.mu/assets/image/og-home.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@MSCraftsman" },
      { name: "twitter:creator", content: "@MSCraftsman" },
      { name: "twitter:title", content: "Jobs in Tech" },
      { name: "twitter:url", content: "https://jobs.mscc.mu" },
      { name: "twitter:description", content: "Jobs in Tech Description" },
      { name: "twitter:image", content: "https://jobs.mscc.mu/assets/image/og-home.jpg" }
    ],
    link: [{ rel: "canonical", href: "https://jobs.mscc.mu" }]
  }
};
</script>

<style lang="scss" scoped>
</style>

