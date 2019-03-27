<template>
  <div
    class="job__block"
    :data-featured="jobData.featured"
    :data-palette="lightOrDark(jobData.colour)"
  >
    <div
      class="upper__section"
      :style="'background-color:' + backgroundColor + ';'"
      @click="openLowerSection()"
    >
      <div class="logo">
        <router-link
          :to="{ name: 'companySingle', params: { id: jobData.company.id } }"
        >
          <div class="logo__outer">
            <img
              :src="'/img/jobs/companies/' + jobData.company.logo"
              alt
              v-if="jobData.hasLogo && jobData.company.id"
            />
            <div class="company__initial" v-else>
              <span>{{ getCompanyInitial(jobData.company.name) }}</span>
            </div>
          </div>
        </router-link>
      </div>
      <div class="title__company">
        <div>
          <router-link
            :to="{ name: 'jobsSingle', params: { id: jobData.id } }"
            class="title"
            >{{ jobData.job.name }}</router-link
          >
        </div>
        <div>
          <router-link
            :to="{ name: 'companySingle', params: { id: jobData.company.id } }"
            class="company"
            >{{ jobData.company.name }}</router-link
          >
        </div>
      </div>
      <div class="tags">
        <ul>
          <li v-for="(tag, index) in jobData.tags" :key="index">
            <router-link :to="{ name: 'jobs', query: { tag: tag.url } }">{{
              tag.name
            }}</router-link>
          </li>
        </ul>
      </div>
      <div class="time">20 hours ago</div>
      <div class="apply__button">
        <ButtonComponent
          :url="{ name: 'jobsSingle', params: { id: jobData.id } }"
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
    <div :class="['lower__section', { active: state }]">
      <div class="row-1">
        <div class="data__cell">
          <label>Type</label>
          <div class="data__content">{{ jobData.job.type }}</div>
        </div>
        <div class="data__cell">
          <label>Pay (Monthly)</label>
          <div class="data__content">{{ jobData.job.pay }}</div>
        </div>
        <div class="data__cell">
          <label>Seniority Level</label>
          <div class="data__content">{{ jobData.job.seniority_level }}</div>
        </div>
        <div class="data__cell">
          <label>Job Functions</label>
          <div class="data__content">{{ jobData.job.functions }}</div>
        </div>
      </div>
      <div class="row-2">
        <div class="data__cell">
          <label>About this job</label>
          <div class="data__content">{{ jobData.job.summary }}</div>
        </div>
        <div class="data__cell">
          <div class="tags white__bg">
            <ul>
              <li v-for="(tag, index) in jobData.tags" :key="index">
                <router-link :to="{ name: 'jobs', query: { tag: tag.url } }">{{
                  tag.name
                }}</router-link>
              </li>
            </ul>
          </div>
        </div>
        <div class="data__cell">
          <div class="apply__button">
            <ButtonComponent
              :to="{ name: 'jobsSingle', params: { id: jobData.id } }"
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
    </div>
  </div>
</template>

<script>
import ButtonComponent from "@/components/shared/ButtonComponent";
import { mapGetters } from 'vuex';
export default {
  components: {
    ButtonComponent
  },
  props: {
    jobData: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      state: false
    };
  },
  computed: {
    ...mapGetters({ theme: 'shared/getTheme' }),
    backgroundColor() {
      if (this.theme === 'theme-default') {
        return this.jobData.colour
      } else {
        if (this.jobData.colour === '#ffffff') {
          return 'var(--jobs-block-background-color)'
        } else {
          return this.jobData.colour
        }
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
    openLowerSection() {
      this.state = !this.state;
    },
    getCompanyInitial(value) {
      if (value) {
        return value.substring(0, 2);
      }
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
