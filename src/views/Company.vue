<template>
  <div class="body__container company-profile__view">
    <transition name="fade" mode="out-in">
      <LoaderComponent v-if="loading"/>
      <div v-else>
        <div
          class="header__section"
          :style="
            'background: url(' +
              company.profile.backgroundImage +
              ')'
          "
        >
          <div class="container__fw">
            <h2 v-if="company.employerName">{{ company.employerName }}</h2>
          </div>
        </div>
        <section class="company__information">
          <div class="container__fw">
            <div class="block__content">
              <div class="company__logo">
                <img :src="company.profile.image" alt class="logo">
              </div>
              <div class="company__details">
                <!-- <div class="data">
                  <label>Founded</label>
                  <div
                    class="data__content"
                    v-if="company.profile.founded"
                  >{{ company.profile.founded }}</div>
                </div>-->

                <div class="data">
                  <label>Phone</label>
                  <div
                    class="data__content"
                    v-if="company.profile.phone"
                  >{{ company.profile.phone }}</div>
                </div>

                <!-- <div class="data">
                  <label>Company Size</label>
                  <div class="data__content" v-if="company.profile.size">{{ company.profile.size }}</div>
                </div>-->

                <div class="data">
                  <label>Industry</label>
                  <div
                    class="data__content"
                    v-if="company.profile.industry"
                  >{{ company.profile.industry }}</div>
                </div>

                <div class="data">
                  <label>Website</label>
                  <div class="data__content">
                    <a
                      v-if="company.profile.website"
                      :href="company.profile.website"
                      target="_blank"
                    >
                      {{ company.profile.website }}
                      <img
                        src="@/assets/img/external-link.svg"
                        alt
                        class="logo"
                      >
                    </a>
                  </div>
                </div>

                <div class="data">
                  <label>Address</label>
                  <div
                    class="data__content"
                    v-if="company.profile.address"
                  >{{ company.profile.address }}</div>
                </div>

                <div class="data" v-if="company.profile.facebook || company.profile.twitter || company.profile.linkedin">
                  <label>Social</label>
                  <div class="data__content">
                    <SocialComponent
                      :facebook="company.profile.facebook"
                      :twitter="company.profile.twitter"
                      :linkedin="company.profile.linkedin"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section class="about__location">
          <div class="container__fw">
            <div class="about__location__block">
              <div class="about">
                <div class="block__content company__description">
                  <h3>About Company</h3>
                  <div
                    class="body__content"
                    v-if="company.profile.content"
                    v-html="company.profile.content"
                  ></div>
                </div>
              </div>

              <div class="location">
                <div class="block__content">
                  <h3>Location</h3>
                  <div class="body__content">
                    <GmapMap
                      v-if="
                        this.lat && this.lng
                      "
                      :center="{lat: this.lat, lng: this.lng}"
                      :zoom="15"
                      map-type-id="roadmap"
                      style="width: 100%; height: 300px"
                    ></GmapMap>
                    <a
                      class="open__maps"
                      :href="getMapsURL(company.profile.location)"
                      target="_blank"
                    >
                      Open in Google Maps
                      <img
                        class="icon"
                        src="@/assets/img/external-link-dark.svg"
                        alt
                      >
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section class="open__positions">
          <div class="container__fw">
            <h2 class="sub__heading">Open positions</h2>

            <div
              class="jobs__by-company"
              v-if="
                company && company.listings.length
              "
            >
              <template v-for="(job, index) in company.listings">
                <JobBlock
                  :jobData="job"
                  :jobCompanyData="job"
                  :isProfilePage="true"
                  :profileId="profileId"
                  :key="index"
                />
              </template>
            </div>

            <div class="jobs__by-company no__vacancies" v-else>
              <h4>No vacancies available at the moment</h4>
            </div>
          </div>
        </section>
      </div>
    </transition>
  </div>
</template>


<script>
import SocialComponent from "@/components/shared/SocialComponent";
import JobBlock from "@/components/jobs/JobBlock";
import { mapGetters } from "vuex";
import LoaderComponent from "@/components/shared/LoaderComponent";

export default {
  components: {
    SocialComponent,
    JobBlock,
    LoaderComponent
  },
  computed: {
    ...mapGetters({
      // getJobsByCompanyId: "jobs/getJobsByCompanyId",
      getProfileById: "companies/getProfileById"
    }),
    getProfileData() {
      return this.getProfileById(this.profileId);
    }
  },
  data() {
    return {
      company: {},
      profileId: 0,
      loading: true,
      lat: 0.0,
      lng: 0.0
    };
  },
  beforeMount() {
    this.profileId = this.$route.params.id;

    //Get company data
    this.fetchCompanyData();
  },
  methods: {
    fetchCompanyData() {
      if (typeof this.getProfileData === "undefined") {
        this.$store
          .dispatch("companies/getProfileByPostRequest", {
            value: this.profileId
          })
          .then(response => {
            // console.log(response);

            this.company = response;
            if(this.company.listings.length > 0){
                var listing = this.company.listings[0];
                if(listing.markers.length > 0){
                  var marker = listing.markers[0];
                  this.lat = marker.latitude;
                  this.lng = marker.longitude;
                }
            }
            // console.log(this.company);
            this.loading = false;
          })
          .catch(error => {
            // console.error(error);
            this.$router.push({ name: "notFound" });
          });
      } else {
        this.company = this.getProfileData;

        //Set loading status
        this.loading = false;
      }
    },
    getMapsURL(position) {
      if (typeof position !== "undefined") {
        return "http://maps.google.com/?q=" + this.lat + "," + this.lng;
      }
    }
  },
  watch: {},
  metaInfo() {
    let title =
      this.company && this.company.employerName
        ? this.company.employerName
        : "";
    return {
      title: title
    };
  }
};
</script>

<style lang="scss" scoped>
.header__section {
  padding: calc(var(--gutter) * 5) 0 calc(var(--gutter) * 11);
  background: var(--company-background-color);
  background-position: center center !important;
  background-size: cover !important;
  text-align: center;
  position: relative;

  &:before {
    content: "";
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    position: absolute;
    left: 0;
    top: 0;
  }

  h2 {
    color: var(--color-white);
    margin: 0;
    font-style: normal;
    font-weight: 500;
    font-size: 60px;
    line-height: normal;
    z-index: 10;
    position: relative;
  }
}

.company__information {
  margin-top: calc(var(--gutter) * 6 * -1);
  position: relative;

  .block__content {
    padding: calc(var(--gutter) * 2);
    display: grid;
    grid-template-columns: 0.8fr 3fr;
    grid-gap: var(--gutter);

    .company__logo {
      .logo {
        width: 80%;
      }
    }

    .company__details {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-auto-rows: 75px;
      grid-column-gap: var(--gutter);

      .data {
        label {
          color: var(--color-light);
          text-transform: uppercase;
          font-weight: 500;
          font-size: 14px;
          margin-bottom: 5px;
        }

        .data__content {
          font-family: var(--font-Roboto);
          font-weight: 500;

          a {
            color: var(--color-blue);
            text-decoration: none;
            border-bottom: 1px solid var(--color-blue);
            padding-bottom: 4px;

            img {
              position: relative;
              top: 3px;
            }
          }
        }
      }
    }
  }
}

.open__positions {
  .jobs__by-company {
    &.no__vacancies {
      h4 {
        font-family: Poppins;
        font-style: normal;
        font-weight: 300;
        font-size: 36px;
        line-height: normal;
        text-align: center;
        color: var((--color-dark));
      }
    }
  }
}

.about__location {
  .about__location__block {
    display: grid;
    grid-template-columns: 1fr 0.5fr;
    grid-column-gap: var(--gutter);
  }
}

@media (max-width: 1024px) {
  .header__section {
    padding: calc(var(--gutter) * 3) 0 calc(var(--gutter) * 9);

    h2 {
      font-size: 40px;
    }
  }

  .company__information {
    .block__content {
      .company__details {
        grid-template-columns: repeat(3, 1fr);
      }
    }
  }

  .about__location {
    .about__location__block {
      grid-template-columns: 1fr;
    }
  }
}

@media (max-width: 768px) {
  .header__section {
    padding: calc(var(--gutter) * 3) 0 calc(var(--gutter) * 9);

    h2 {
      font-size: 30px;
    }
  }

  .company__information {
    .block__content {
      grid-template-columns: 1fr;

      .company__logo {
        text-align: center;

        .logo {
          width: 200px;
          margin: 0 auto;
        }
      }

      .company__details {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  }
}

@media (max-width: 450px) {
  .company__information {
    .block__content {
      padding: calc(var(--gutter) * 1.5);
    }
  }
}
</style>
</style>

