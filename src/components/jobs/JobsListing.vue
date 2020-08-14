<template>
  <div class="views job-listing__view" id="joblisting">
    <HeadingBreadcrumbs
      :breadcrumbs="breadcrumbs"
      :pageTitle="pageTitle"
      :alertStatus="alertStatus"
    />

    <div class="container__fw">
      <div class="filtered__content" v-if="isSearch">
        <div class="heading">
          <span v-if="keywordValue" class="keyword__search">
            Keyword:
            <button
              class="search__button"
              alt="Remove"
              aria-label="Remove the keyword"
              @click="removeKeyword()"
            >
              {{ keywordValue }}
              <span class="remove__icon">
                <img
                  src="@/assets/img/close.svg"
                  alt="Remove the keyword"
                  title="Remove the keyword"
                />
              </span>
            </button>
          </span>

          <span v-if="locationValue">
            Location:
            <button
              class="search__button"
              alt="Remove"
              aria-label="Remove the location"
              @click="removeLocation()"
            >
              {{ locationValue }}
              <span class="remove__icon">
                <img
                  src="@/assets/img/close.svg"
                  alt="Remove the location"
                  title="Remove the location"
                />
              </span>
            </button>
          </span>
        </div>
      </div>

      <div class="jobs__listing">
        <div class="jobs">
          <transition name="fade" mode="out-in">
            <LoaderComponent v-if="loading" key="loader"/>

            <div key="search-results" v-else>
              <template
                v-if="isSearch === false ? (jobs && jobs.length > 0) : false || isSearch === true ? (searchResults && searchResults.length > 0) : false"
              >
                <transition-group name="addjobblock">
                  <JobBlock
                    v-for="(job, index) in (!isSearch ? jobs : searchResults)"
                    v-if="index <= limit"
                    :jobData="job"
                    :key="index"
                  />
                </transition-group>

                <div class="load__more-jobs" v-if="loadMoreVisibility">
                  <button
                    class="load_more__button button__global outline blue"
                    @click="addJobs()"
                  >
                    Load more
                  </button>
                </div>
              </template>
              <template v-else>
                <h3>No results</h3>
              </template>
            </div>
          </transition>
          <!-- <template v-if="isHomepage && triggerSearch && jobSearchResult && jobSearchResult.length">
            <transition-group name="addjobblock">
              <JobBlock v-for="(job, index) in jobSearchResult" :jobData="job" :key="index"/>
            </transition-group>
          </template>-->
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
import LoaderComponent from "@/components/shared/LoaderComponent";

export default {
  components: {
    HeadingBreadcrumbs,
    JobBlock,
    LoaderComponent
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
    },
    searchResults: {
      type: Array,
      default: () => {
        return [];
      }
    },
    loading: {
      type: Boolean,
      default: true
    },
    isSearch: {
      type: Boolean,
      default: true
    },
    keywordValue: {
      type: String,
      default: null
    },
    locationValue: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      limit: 9,
      loadMoreVisibility: true
    };
  },
  computed: {
    ...mapGetters({
      jobs: "jobs/getJobs"
      // jobsSearched: "jobs/getJobsSearched"
    })
  },
  beforeMount() {},
  methods: {
    addJobs() {
      let jobsLength = this.jobs.length;

      if (this.isSearch) {
        jobsLength = this.searchResults.length;
      }

      if (jobsLength > this.limit) {
        this.limit = this.limit + 10;
        this.checkLoadMoreButtonVisbility();
      } else if (this.limit >= jobsLength) {
        this.checkLoadMoreButtonVisbility();
      }
    },
    checkLoadMoreButtonVisbility() {
      let jobsLength = this.jobs && this.jobs.length ? this.jobs.length : 0;

      if (this.isSearch) {
        jobsLength =
          this.searchResults && this.searchResults.length
            ? this.searchResults.length
            : 0;
      }

      if (jobsLength > this.limit) {
        this.loadMoreVisibility = true;
      } else if (this.limit >= jobsLength) {
        this.loadMoreVisibility = false;
      }
    },
    removeKeyword() {
      this.$emit("removeKeyword", "keyword");
    },
    removeLocation() {
      this.$emit("removeLocation", "location");
    }
  },
  watch: {
    jobs: {
      handler(val) {
        this.checkLoadMoreButtonVisbility();
      },
      deep: true
    },
    searchResults: {
      handler(val) {
        this.checkLoadMoreButtonVisbility();
      },
      deep: true
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

.search__button {
  height: 30px;
  border-radius: 100px;
  padding: 0 15px;
  padding-right: 6px;
  border: 0;
  background: var(--color-dark);
  color: white;
  margin-left: 10px;
  box-shadow: 0px 4px 18px var(--color-light);
}

.keyword__search {
  margin-right: 20px;
}

.remove__icon {
  width: 20px;
  height: 20px;
  border-radius: 10px;
  padding: 2px;
  background: var(--color-light);
  display: inline-flex;
  align-items: center;
  justify-content: center;

  img {
    width: 8px;
  }
}

.addjobblock-enter-active,
.addjobblock-leave-active {
  transition: all 1s;
}
.addjobblock-enter,
.addjobblock-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.addjobblock-enter-active {
  transition-delay: 0.2s;
}

@media (max-width: 1024px) {
  .jobs__listing {
    grid-template-columns: 1fr;
  }
}
</style>
