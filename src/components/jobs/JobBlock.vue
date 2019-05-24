<template>
  <div class="job__block" :data-featured="job.featured" :data-palette="lightOrDark(job.colour)">
    <div
      class="upper__section"
      :style="'background-color:' + backgroundColor + ';'"
      @click="openLowerSection($event)"
    >
      <div class="logo">
        <template v-if="!isPreview">
          <router-link :to="{ name: 'profileSingle', params: { id: job.profile || this.profile } }">
            <div class="logo__outer">
              <img v-if="job && job.logo" :src="job.logo" alt>
              <div class="company__initial" v-else>
                <span v-if="job && job.company">{{ getCompanyInitial(job.company) }}</span>
              </div>
            </div>
          </router-link>
        </template>
        <template v-else>
          <div class="logo__outer">
            <img alt v-if="previewData && previewData.company.logo" :src="previewData.company.logo">
            <div class="company__initial" v-else>
              <span
                v-if="previewData && previewData.company.name"
              >{{ getCompanyInitial(previewData.company.name) }}</span>
            </div>
          </div>
        </template>
      </div>
      <div class="title__company">
        <div>
          <template v-if="!isPreview">
            <router-link
              :to="{ name: 'jobsSingle', params: { id: job.id || jobCompanyData.id } }"
              class="title"
            >{{ job.title || jobCompanyData.jobTitle }}</router-link>
          </template>
          <template v-else>
            <div class="title" v-if="previewData.title">{{ previewData.title }}</div>
          </template>
        </div>
        <div>
          <template v-if="!isPreview">
            <router-link
              v-if="(job && job.company)"
              :to="{ name: 'profileSingle', params: { id: job.profile || this.profile } }"
              class="company"
            >{{ job.company || jobCompanyData.jobTitle }}</router-link>
          </template>
          <template v-else>
            <div class="company" v-if="previewData.company.name">{{ previewData.company.name }}</div>
          </template>
        </div>
      </div>
      <div class="tags">
        <ul>
          <template v-if="!isPreview && tags">
            <li v-for="(tag, index) in tags" :key="index">
              <router-link class="tag" :to="{ name: 'jobs', query: { tag: tag } }">
                {{
                tag
                }}
              </router-link>
            </li>
          </template>
          <template v-else>
            <template v-if="previewData.tags !== 'null' && tagsPreview(previewData.tags).length">
              <li v-for="(tag, index) in tagsPreview(previewData.tags)" :key="index">
                <span class="tag">{{ tag }}</span>
              </li>
            </template>
          </template>
        </ul>
      </div>
      <div class="time">
        <template v-if="!isPreview">
          <timeago :datetime="posted"></timeago>
        </template>
        <template v-else>
          <timeago :datetime="previewData.datePosted"></timeago>
        </template>
      </div>
      <div class="apply__button">
        <template v-if="!isPreview">
          <ButtonComponent
            :url="{ name: 'jobsSingle', params: { id: job.id || this.jobCompanyData.id }, hash: '#apply' }"
            color="yellow"
            classStyle="apply__job__button"
            text="Apply"
            :iconOnDesktop="false"
            :iconOnMobile="false"
            :textOnMobile="true"
            :textOnDesktop="true"
            icon="/img/utils/icon-bold.svg"
          />
        </template>
        <template v-else>
          <button
            type="button"
            class="button__global apply__job__button yellow override__visbility"
          >
            <span class="text">Apply</span>
          </button>
        </template>
      </div>
    </div>
    <div :class="['lower__section', { active: state }]">
      <template v-if="!isPreview">
        <template v-if="loadingStatus">
          <LoaderComponent :small="true"/>
        </template>
        <template v-else>
          <div class="row-1">
            <div class="data__cell">
              <label>Type</label>
              <div class="data__content">{{ fullView.type }}</div>
            </div>
            <div class="data__cell">
              <label>Pay (Monthly)</label>
              <div class="data__content">{{ fullView.salary }}</div>
            </div>
            <div class="data__cell">
              <label>Seniority Level</label>
              <div class="data__content">{{ fullView.seniority_level }}</div>
            </div>
            <!-- <div class="data__cell">
              <label>Job Functions</label>
              <div class="data__content">{{ fullView.functions }}</div>
            </div>-->
          </div>
          <div class="row-2">
            <div class="data__cell">
              <label>About this job</label>
              <div class="data__content" v-html="fullView.jobDesc"></div>
            </div>
            <div class="data__cell">
              <div class="tags white__bg">
                <ul>
                  <li v-for="(tag, index) in tags" :key="index">
                    <template v-if="!isPreview">
                      <router-link class="tag" :to="{ name: 'jobs', query: { tag: tag } }">
                        {{
                        tag
                        }}
                      </router-link>
                    </template>
                    <template v-else>
                      <span class="tag">{{ tag }}</span>
                    </template>
                  </li>
                </ul>
              </div>
            </div>
            <div class="data__cell">
              <div class="apply__button">
                <ButtonComponent
                  :to="{ name: 'jobsSingle', params: { id: job.id || this.jobCompanyData.id }, hash: '#apply' }"
                  color="yellow"
                  classStyle="apply__job__button"
                  text="Apply"
                  :iconOnDesktop="false"
                  :iconOnMobile="false"
                  :textOnMobile="true"
                  :textOnDesktop="true"
                  icon="/img/utils/icon-bold.svg"
                />
              </div>
            </div>
          </div>
        </template>
      </template>
      <!-- IF PREVIEW -->
      <template v-else>
        <div class="row-1">
          <div class="data__cell">
            <label>Type</label>
            <div class="data__content">{{ previewData.type }}</div>
          </div>
          <div class="data__cell">
            <label>Pay (Monthly)</label>
            <div class="data__content">{{ previewData.salary }}</div>
          </div>
          <div class="data__cell">
            <label>Seniority Level</label>
            <div class="data__content">{{ previewData.seniority_level }}</div>
          </div>
          <!-- <div class="data__cell">
            <label>Job Functions</label>
            <div class="data__content">{{ previewData.functions }}</div>
          </div>-->
        </div>
        <div class="row-2">
          <div class="data__cell">
            <label>About this job</label>
            <div class="data__content" v-html="previewData.jobDesc"></div>
          </div>
          <div class="data__cell">
            <div class="tags white__bg">
              <ul>
                <li v-for="(tag, index) in tagsPreview(previewData.tags)" :key="index">
                  <span class="tag">{{ tag }}</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="data__cell">
            <div class="apply__button">
              <template>
                <ButtonComponent
                  :url="{ name: 'jobsSingle', params: { id: job.advertId || this.jobCompanyData.id } }"
                  color="yellow"
                  classStyle="apply__job__button"
                  text="Apply"
                  :iconOnDesktop="false"
                  :iconOnMobile="false"
                  :textOnMobile="true"
                  :textOnDesktop="true"
                  icon="/img/utils/icon-bold.svg"
                />
              </template>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import ButtonComponent from "@/components/shared/ButtonComponent";
import LoaderComponent from "@/components/shared/LoaderComponent";
import { mapGetters } from "vuex";
export default {
  components: {
    ButtonComponent,
    LoaderComponent
  },
  props: {
    jobData: {
      type: Object,
      default: () => {
        return {};
      }
    },
    jobCompanyData: {
      type: Object,
      default: () => {
        return {};
      }
    },
    previewData: {
      type: Object,
      default: () => {
        return {};
      }
    },
    isPreview: {
      type: Boolean,
      default: false
    },
    isProfilePage: {
      type: Boolean,
      default: false
    },
    profile: {
      type: String,
      default: null
    }
  },
  data() {
    let job = {};

    Object.assign(job, this.jobData);

    return {
      job,
      state: false,
      loadingStatus: true,
      fullView: null,
      profileData: null
    };
  },
  computed: {
    ...mapGetters({
      theme: "shared/getTheme",
      // getCompanyById: "companies/getCompanyById",
      getJobFullById: "jobs/getJobFullById",
      getProfileById: "companies/getProfileById"
    }),
    getFullViewData() {
      return this.getJobFullById(this.job.id);
    },
    backgroundColor() {
      if (this.theme === "theme-default") {
        return this.job.colour;
      } else {
        if (this.job.colour === "#ffffff") {
          return "var(--jobs-block-background-color)";
        } else {
          return this.job.colour;
        }
      }
    },
    // company() {
    //   return this.getCompanyById(this.job.profile);
    // },
    // profile() {
    //   return this.getProfileById(this.job.profile);
    // },
    tags() {
      let tags = this.job.tags;
      let tagsArr = tags.split(",").map(function(item) {
        return item.trim();
      });

      return tagsArr;
    },
    posted() {
      if (this.job.datePosted) {
        return Date.parse(this.job.datePosted);
      }
    }
  },
  methods: {
    lightOrDark(hex) {
      //https://stackoverflow.com/a/35970186
      if (hex && hex !== null) {
        if (hex.indexOf("#") === 0) {
          hex = hex.slice(1);
        }
        // convert 3-digit hex to 6-digits.
        if (hex.length === 3) {
          hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        }
        if (hex.length !== 6) {
          throw new Error("Invalid HEX color.");
        }
        var r = parseInt(hex.slice(0, 2), 16),
          g = parseInt(hex.slice(2, 4), 16),
          b = parseInt(hex.slice(4, 6), 16);

        return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? "light" : "dark";
      }
    },
    tagsPreview(tags) {
      let tagsArr = tags.split(",").map(function(item) {
        if (item.trim() && item !== "null" && item.trim().length) {
          return item.trim();
        }
      });

      return tagsArr;
    },
    openLowerSection(event) {
      if (
        event.srcElement &&
        (event.srcElement.className != "title" ||
          event.srcElement.className != "company")
      ) {
        this.state = !this.state;
      }
    },
    getCompanyInitial(value) {
      if (value) {
        return value.substring(0, 2);
      }
    },
    getFullView() {
      if (!this.fullView) {
        this.$store
          .dispatch("jobs/getJobFromApi", {
            value: this.job.id || this.jobCompanyData.id
          })
          .then(response => {
            this.fullView = response;
            this.loadingStatus = false; // Set loading to false after data is obtained
          })
          .catch(error => {
            console.log(error);
            this.loadingStatus = true;
          });
      } else {
        this.fullView = this.getFullViewData;
      }
    },
    getProfile(id) {
      if (typeof this.profile === "undefined") {
        this.$store
          .dispatch("companies/getProfileByIdFromApi", {
            value: id
          })
          .then(response => {
            this.profileData = response;
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        this.profileData = this.profile;
      }
    }
  },
  beforeMount() {},
  watch: {
    state(val) {
      if (val === true && this.isPreview === false) {
        this.getFullView();
      }
    },
    jobData: {
      handler(val) {
        if (val.profile !== null && this.isPreview === false) {
          this.getProfile(this.job.profile);
        }
      },
      deep: true,
      immediate: true
    },
    profile: {
      handler(val) {
        if (val !== null) {
          this.getProfile(this.profile);
        }
      },
      deep: true,
      immediate: true
    }
  }
};
</script>


<style lang="scss" scoped>
.job__block {
  background: var(--jobs-block-background-color);
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.2);
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease-in-out;
  position: relative;

  --color-primary: var(--color-dark);
  --color-secondary: var(--color-light);

  --color-tag: var(--color-blue);
  --color-tag-background: transparent;

  --color-tag-hover: var(--color-white);
  --color-tag-background-hover: var(--color-blue);

  &[data-featured="true"] {
    .upper__section {
      position: relative;

      &:before {
        position: absolute;
        content: "";
        width: 10px;
        background: var(--color-yellow);
        height: 100%;
        left: 0;
        top: 0;
      }
    }
  }

  &[data-palette="dark"] {
    --color-primary: rgba(255, 255, 255, 1);
    --color-secondary: rgba(255, 255, 255, 0.9);

    --color-tag: var(--color-white);
    --color-tag-background: transparent;

    --color-tag-hover: var(--color-dark);
    --color-tag-background-hover: var(--color-white);

    .upper__section {
      .logo {
        img {
          // filter: invert(100%);
        }
      }
    }
  }

  &:hover {
    cursor: pointer;
    .upper__section {
      .apply__button {
        .apply__job__button {
          opacity: 1;
        }
      }
    }
  }

  &:last-child {
    border-bottom: none;
  }

  .upper__section {
    padding: calc(var(--gutter) / 1) calc(var(--gutter) / 1)
      calc(var(--gutter) / 1) var(--gutter);
    display: grid;
    grid-column-gap: calc(var(--gutter) / 2);
    grid-template-columns: 0.7fr 3fr 2.4fr 1fr 1fr;
    align-items: center;

    .logo {
      display: flex;
      align-items: center;
      justify-content: center;

      a {
        text-decoration: none;
        text-transform: uppercase;
      }

      .logo__outer {
        height: 70px;
        width: 70px;
        background: var(--color-white);
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
          max-width: 97%;
        }

        .company__initial {
          background: var(--color-gray-light);
          border-radius: 35px;
          height: 60px;
          width: 60px;

          color: var(--color-light);
          text-decoration: none;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 25px;

          span {
            text-decoration: none;
          }
        }
      }
    }

    .title__company {
      a {
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }
      }

      .title {
        font-family: var(--font-Poppins);
        font-style: normal;
        font-weight: 600;
        font-size: 17px;
        line-height: normal;
        display: inline-block;
        color: var(--color-primary);
      }

      .company {
        display: inline-block;
        color: var(--color-secondary);
        font-family: var(--font-Roboto);
        font-weight: 300;
      }
    }

    .time {
      color: var(--color-secondary);
      font-family: var(--font-Roboto);
      font-weight: 300;
    }

    .apply__button {
      .apply__job__button {
        opacity: 0;
        transition: all 0.3s ease-in-out;
      }
    }
  }

  .lower__section {
    background: var(--color-white);
    padding: 0 calc(var(--gutter) / 1);

    max-height: 0px;
    overflow: hidden;
    transition: all 0.2s ease-in-out;

    &.active {
      max-height: 1000px;
      padding: calc(var(--gutter) / 1) calc(var(--gutter) / 1)
        calc(var(--gutter) / 1) var(--gutter);
    }

    label {
      color: var(--color-light);
      text-transform: uppercase;
      font-weight: 500;
      font-size: 11px;
      margin-bottom: 5px;
    }

    .data__content {
      font-family: var(--font-Roboto);
      font-weight: 300;
    }

    .row-1 {
      display: grid;
      grid-template-columns: 1fr 1.5fr 1fr 3fr;
      margin-bottom: 10px;
    }

    .row-2 {
      .data__cell {
        .apply__button,
        .tags {
          display: none;
        }
      }
    }
  }
}

@media (max-width: 1024px) {
  .job__block {
    .upper__section {
      padding: calc(var(--gutter) / 1.5) calc(var(--gutter) / 1.5)
        calc(var(--gutter) / 1.5) var(--gutter);

      .logo {
        .logo__outer {
          height: 60px;
          width: 60px;

          img {
            width: 85%;
          }
        }
      }

      .apply__button {
        .apply__job__button {
          opacity: 1;
        }
      }

      .title__company {
        .title {
          font-size: 16px;
        }

        .company {
          font-size: 12px;
        }
      }

      .time {
        font-size: 13px;
      }
    }
  }
}

@media (max-width: 600px) {
  .job__block {
    .upper__section {
      grid-template-columns: 65px 1fr 150px;

      .logo {
      }

      .apply__button {
        text-align: right;
      }

      .title__company {
      }

      .tags {
        display: none;
      }

      .time {
        display: none;
      }
    }

    .lower__section {
      .data__content {
        font-size: 14px;
      }

      .row-1 {
        grid-template-columns: 1fr 1fr;
      }
    }
  }
}

@media (max-width: 450px) {
  .job__block {
    .upper__section {
      grid-template-columns: 65px 1fr;

      .apply__button {
        display: none;
      }
    }

    .lower__section {
      .row-2 {
        .data__cell {
          .apply__button,
          .tags {
            display: block;
          }
          .tags {
            margin: calc(var(--gutter) / 2) 0;
          }
        }
      }
    }
  }
}

.showLower-enter-active,
.showLower-leave-active {
  max-height: 1000px;
}
.showLower-enter, .showLower-leave-to
/* .showLower-leave-active below version 2.1.8 */ {
  max-height: 0px;
  overflow: hidden;
  transition: max-height 0.4s ease-in-out;
}
</style>
