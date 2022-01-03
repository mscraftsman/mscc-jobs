<template>
  <div>
    <div class="views homepage__view">
      <div class="search__container">
        <div class="heading">
          <h3>looking for a job ?</h3>
        </div>
        <div class="search__criterion">
          <div class="field__jobtitle">
            <div class="icon">
              <img
                src="@/assets/img/binoc.svg"
                alt="Search for Jobs in Tech"
                title="Search for Jobs in Tech"
              />
            </div>
            <div class="field">
              <input
                type="text"
                class="input"
                placeholder="job title, keyword"
                v-model="title"
                v-on:keyup.enter="execSearch()"
              />
            </div>
          </div>
          <div class="field__location">
            <div class="icon">
              <img src="@/assets/img/location.svg" alt />
            </div>
            <div class="field">
              <!-- <input type="text" class="input" placeholder="location" v-model="location"> -->
              <gmap-autocomplete
                class="input"
                placeholder="location"
                @place_changed="setLocation"
                :options="options"
                :value="locationDisplayValue"
                ref="locationAutocomplete"
                v-on:keyup.enter="execSearch()"
              />
            </div>
          </div>
          <div class="search__button">
            <button
              :class="['search', { loading: loading }]"
              aria-label="Search for Jobs in Tech"
              @click="execSearch"
              :disabled="loading === true"
            >
              <transition name="fade" mode="out-in">
                <img
                  src="@/assets/img/binoc.svg"
                  alt="Search for Jobs in Tech"
                  title="Search for Jobs in Tech"
                  v-if="!loading"
                />
                <LoaderComponent :tiny="true" v-else key="loader" />
              </transition>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import JobsListing from "@/components/jobs/JobsListing";
import Utils from "@/components/utils";
import LoaderComponent from "@/components/shared/LoaderComponent";

import {
  SEARCH_ENDPOINT,
  SITE_ID,
  GOOGLEMAPS_KEY,
  DEFAULT_RADIUS_MILES
} from "@/store/constants";
import { filter } from "minimatch";

export default {
  extends: Utils,
  components: {
    LoaderComponent
  },
  props: {
    keywordValue: {
      type: String,
      default: null
    },
    locationValue: {
      type: String,
      default: null
    },
    locationLat: {
      type: Number,
      default: 0.0
    },
    locationLng: {
      type: Number,
      default: 0.0
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      buttonState: false,
      location: {},
      title: null,
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
      },
      options: {
        bounds: {
          north: -19.9795,
          south: -20.5391,
          east: 57.808026,
          west: 57.309035
        },
        strictBounds: true
      },
      locationDisplayValue: null
    };
  },
  methods: {
    SanitizeModel: function() {
      this.filter.id = SITE_ID.replace("/sites/", "");
      this.filter.keyword = this.title;

      if (
        this.location &&
        this.location.formatted_address &&
        this.location.geometry
      ) {
        this.filter.locationValue = this.location.formatted_address;
        this.filter.latitude = this.location.geometry.location.lat();
        this.filter.longitude = this.location.geometry.location.lng();
      }

      let location = this.$refs["locationAutocomplete"].$refs.input.value;
      if (location === "") {
        this.filter.locationValue = null;
        this.filter.latitude = 0.0;
        this.filter.longitude = 0.0;
        this.locationDisplayValue = null;
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
    execSearch() {
      this.SanitizeModel();
      // this.GetCoordinateByLocation();
      if (this.title !== null || this.location !== null) {
        this.buttonState = true;
        this.$emit("searchTriggered", this.filter);
      }
    },
    setLocation(location) {
      this.location = location;
    }
  },
  watch: {
    keywordValue: {
      handler(val) {
        this.title = val;
      },
      deep: true,
      immediate: true
    },
    locationValue: {
      handler(val) {
        this.location.formatted_address = val;
        this.locationDisplayValue = val;
      },
      deep: true,
      immediate: true
    },
    locationLat: {
      handler(val) {
        this.location.lat = val;
      },
      deep: true,
      immediate: true
    },
    locationLng: {
      handler(val) {
        this.location.lng = val;
      },
      deep: true,
      immediate: true
    }
  }
};
</script>

<style lang="scss" scoped>
.homepage__view {
  background: url("/img/utils/homepage.png");
  background-size: cover;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  .search__container {
    z-index: 1;

    .heading {
      h3 {
        color: var(--color-white);
        text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.32);

        font-family: var(--font-Roboto);
        font-style: normal;
        font-weight: 300;
        line-height: normal;
        font-size: 53px;
        text-align: center;
        letter-spacing: -0.02em;
      }
    }

    .search__criterion {
      display: grid;
      grid-template-columns: 1fr 1fr 100px;
      grid-template-rows: 1fr;
      grid-gap: var(--gutter);

      .field__jobtitle,
      .field__location {
        position: relative;
        width: 400px;

        .icon {
          position: absolute;
          left: 20px;
          top: 25px;
          opacity: 0.6;

          img {
            width: 35px;
          }
        }

        .field {
          .input {
            width: 100%;
            height: 80px;
            padding-right: var(--gutter);
            padding-left: 70px;
            font-family: var(--font-Roboto);
            background: var(--color-white);
            box-shadow: 0px 17px 32px rgba(0, 0, 0, 0.69);
            border-radius: 100px;
            outline: none;
            border: 0;
            font-size: 26px;
            font-weight: 100;
            transition: all 0.3s ease-in-out;

            &:focus {
              box-shadow: 0px 17px 45px rgba(0, 0, 0, 1);
            }
          }
        }
      }

      .field__location {
        .icon {
          position: absolute;
          left: 20px;
          top: 20px;
          opacity: 0.6;

          img {
            width: 35px;
          }
        }
      }

      .search__button {
        .search {
          width: 80px;
          height: 80px;
          font-family: var(--font-Roboto);
          background: var(--color-yellow);
          box-shadow: 0px 4px 16px rgba(255, 228, 0, 0.73);
          border-radius: 100px;
          outline: none;
          border: 0;
          transition: all 0.3s ease-in-out;

          &.loader,
          &[disabled] {
            background: var(--color-dark);
            box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.73);

            &:hover {
              box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.73);
            }
          }

          &:hover {
            box-shadow: 0px 4px 25px rgba(255, 228, 0, 0.8);

            img {
              transform: scale(1.05);
            }
          }

          img {
            width: 30px;
            transition: all 0.3s ease-in-out;
          }
        }
      }
    }
  }
}

@media (max-width: 1024px) {
  .homepage__view {
    .search__container {
      .search__criterion {
        grid-template-columns: 1fr;

        .search__button {
          z-index: 5;

          .search {
            width: 100%;
          }
        }
      }
    }
  }
}

@media (max-width: 450px) {
  .homepage__view {
    --width: 320px;
    --height: 60px;

    .search__container {
      .heading {
        h3 {
          font-size: 35px;
        }
      }

      .search__criterion {
        grid-gap: 10px;

        .field__jobtitle,
        .field__location {
          width: var(--width);
          margin: 0 auto;

          .icon {
            top: 16px;

            img {
              width: 25px;
            }
          }

          .field {
            .input {
              height: var(--height);
              font-size: 20px;
            }
          }
        }

        .search__button {
          margin: 0 auto;

          .search {
            width: var(--width);
            height: var(--height);
          }
        }
      }
    }
  }
}
</style>
