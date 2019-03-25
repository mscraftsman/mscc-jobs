<template>
  <div class="body__container job-single__view">
    <transition name="fade" mode="out-in">
      <LoaderComponent v-if="loading"/>
      <div v-else>
        <section class="job__single">
          <div class="container__fw">
            <div class="job__sidebar">
              <!-- JOB -->
              <div class="job__block">
                <div class="block__content">
                  <div class="body__content job__details__logo">
                    <div class="job__details">
                      <h2>{{jobData.job.name}}</h2>

                      <div class="row-1">
                        <div class="data__cell">
                          <label>Type</label>
                          <div class="data__content">{{jobData.job.type}}</div>
                        </div>
                        <div class="data__cell">
                          <label>Pay (Monthly)</label>
                          <div class="data__content">{{jobData.job.pay}}</div>
                        </div>
                        <div class="data__cell">
                          <label>Seniority Level</label>
                          <div class="data__content">{{jobData.job.seniority_level}}</div>
                        </div>
                        <div class="data__cell">
                          <label>Job Functions</label>
                          <div class="data__content">{{jobData.job.functions}}</div>
                        </div>
                        <div class="data__cell">
                          <label>Start</label>
                          <div class="data__content">{{jobData.job.startDesc}}</div>
                        </div>
                        <div class="data__cell">
                          <label>Duration</label>
                          <div class="data__content">{{jobData.job.durationDesc}}</div>
                        </div>
                      </div>

                      <div class="row-2">
                        <div class="tags white__bg">
                          <ul>
                            <li v-for="(tag, index) in jobData.tags" :key="index">
                              <router-link :to="{ name: 'jobs', query: {tag: tag.url}}">{{tag.name}}</router-link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div class="company__logo">
                      <router-link
                        class="logo"
                        :to="{name: 'companySingle', params: { id: jobData.company.id}}"
                      >
                        <img :src="'/img/jobs/companies/' + jobData.company.logo" alt>
                      </router-link>
                    </div>
                  </div>
                </div>

                <div class="block__content">
                  <h3>Description</h3>
                  <div class="body__content" v-html="jobData.job.jobDesc"></div>
                </div>

                <div class="block__content">
                  <h3>Responsibilities</h3>
                  <div class="body__content" v-html="jobData.job.responsibilities"></div>
                </div>

                <div class="block__content">
                  <h3>Requirements</h3>
                  <div class="body__content" v-html="jobData.job.requirements"></div>
                </div>

                <div class="block__content">
                  <h3>Benefits</h3>
                  <div class="body__content" v-html="jobData.job.benefits"></div>
                </div>

                <div class="block__content">
                  <h3>Apply for this job</h3>
                  <form @submit.prevent="validateJobApplication" autocomplete="off">
                    <div class="body__content apply__grid__layout">
                      <InputText
                        label="First Name"
                        name="firstName"
                        v-model="applicationData.firstName"
                        v-validate="'required'"
                        :message="errors.first('firstName')"
                      />
                      <InputText
                        label="Last Name"
                        name="lastName"
                        v-model="applicationData.lastName"
                        v-validate="'required'"
                        :message="errors.first('lastName')"
                      />

                      <InputTel
                        label="Telephone number"
                        name="telephone"
                        v-model="applicationData.telephone"
                        v-validate="'required|numeric|min:7'"
                        :message="errors.first('telephone')"
                      />

                      <InputTel
                        label="Mobile number"
                        name="mobile"
                        v-model="applicationData.mobile"
                        v-validate="'required|numeric|min:7'"
                        :message="errors.first('mobile')"
                      />

                      <InputTextarea
                        label="Residential address"
                        :full="true"
                        name="address"
                        v-model="applicationData.address"
                        v-validate="'required'"
                        :message="errors.first('address')"
                      />

                      <InputNumeric
                        label="Postal Code"
                        name="postalcode"
                        v-model="applicationData.postal_code"
                        v-validate="'required|numeric'"
                        :message="errors.first('postalcode')"
                      />

                      <InputSelect
                        label="Country"
                        name="country"
                        v-model="applicationData.country"
                        :values="countries"
                        optionValue="name"
                        optionText="name"
                        v-validate="'required'"
                        :message="errors.first('country')"
                      />

                      <InputSelect
                        label="Nationality"
                        name="nationality"
                        v-model="applicationData.nationality"
                        :values="nationality"
                        optionValue="nationality"
                        optionText="nationality"
                        v-validate="'required'"
                        :message="errors.first('nationality')"
                      />

                      <InputEmail
                        label="Email"
                        name="email"
                        v-model="applicationData.email"
                        v-validate="'required|email'"
                        :message="errors.first('email')"
                      />

                      <InputEditor
                        label="Cover Letter"
                        name="coverLetter"
                        :full="true"
                        v-model="applicationData.cover_letter"
                        v-validate="'required'"
                        :message="errors.first('coverLetter')"
                      />

                      <!-- CV upload -->
                      <div :class="['input__block', 'full']">
                        <label>Upload your curriculum vitae (.doc, .docx, .pdf or .rtf )</label>

                        <div class="upload__options">
                          <button
                            type="button"
                            class="upload__pc__button button__global blue override__visbility"
                          >
                            <img src="@/assets/img/pc.svg" class="icon">
                            <span class="text">From Device</span>
                          </button>
                          
                          <button
                            type="button"
                            class="upload__pc__button button__global blue override__visbility"
                          >
                            <img src="@/assets/img/drive.svg" class="icon">
                            <span class="text">Google Drive</span>
                          </button>
                          
                          <button
                            type="button"
                            class="upload__pc__button button__global blue override__visbility"
                          >
                            <img src="@/assets/img/dropbox.svg" class="icon">
                            <span class="text">Dropbox</span>
                          </button>
                        </div>

                        <div class="file__name">
                          File name:
                          <span>SomeFileName.pdf</span>
                        </div>
                      </div>
                      <!-- CV upload -->
                      <div :class="['input__block', 'full']">
                        <div class="acceptance__submit">
                          <div class="checkbox__accept">
                            <input
                              type="checkbox"
                              required
                              id="accept__job__conditions"
                              v-model="applicationData.agree"
                            >
                            <label for="accept__job__conditions">
                              <span></span>
                            </label>
                          </div>
                          <label
                            class="checkbox__text"
                            for="accept__job__conditions"
                          >I accept that my data is being transmitted etc..</label>
                        </div>
                      </div>

                      <div :class="['input__block', 'full', 'submit__buttons']">
                        <button
                          type="button"
                          class="submit__application__button button__global green override__visbility"
                          @click="validateJobApplication()"
                        >
                          <div class="icon">
                            <div class="loading"></div>
                          </div>
                          <span class="text">Submit Application</span>
                        </button>
                        
                        <button
                          type="reset"
                          class="reset__application__button button__global yellow override__visbility"
                        >
                          <span class="text">Reset</span>
                        </button>
                      </div>

                      <div :class="['input__block', 'full', 'response__message', 'success']">
                        <div class="icon__wrapper">
                          <div class="icon">
                            <img src="@/assets/img/success.svg" alt>
                          </div>
                        </div>
                        <div class="message">
                          <h4>Success !</h4>
                          <p>Your application has been sent !</p>
                        </div>
                      </div>

                      <div :class="['input__block', 'full', 'response__message', 'error']">
                        <div class="icon__wrapper">
                          <div class="icon">
                            <img src="@/assets/img/success.svg" alt>
                          </div>
                        </div>
                        <div class="message">
                          <h4>Error !</h4>
                          <p>There is an error in your application</p>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>

                <div class="block__content">
                  <h3>Apply for this job</h3>
                  <div class="body__content">
                    <a href="/" class="submit__job__button button__global blue override__visbility">
                      <img class="icon" src="@/assets/img/external-link-light.svg" alt>
                      <div class="text">Apply on website</div>
                    </a>
                  </div>
                </div>
              </div>
              <!-- JOB -->
              <!-- SIDEBAR -->
              <div class="sidebar__block">
                <div class="block__content">
                  <h3>Tech Stack</h3>
                  <div class="body__content"></div>
                </div>
              </div>
              <!-- SIDEBAR -->
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
import { VueEditor } from "vue2-editor";
import ButtonComponent from "@/components/shared/ButtonComponent";

import InputText from "@/components/forms/InputText";
import InputTel from "@/components/forms/InputTel";
import InputTextarea from "@/components/forms/InputTextarea";
import InputEmail from "@/components/forms/InputEmail";
import InputEditor from "@/components/forms/InputEditor";
import InputNumeric from "@/components/forms/InputNumeric";
import InputSelect from "@/components/forms/InputSelect";

import countries from "@/components/forms/countries.js";
import nationality from "@/components/forms/nationality.js";

export default {
  components: {
    SocialComponent,
    JobBlock,
    LoaderComponent,
    InputText,
    InputTel,
    InputTextarea,
    InputEmail,
    InputEditor,
    InputNumeric,
    InputSelect
  },
  computed: {
    ...mapGetters({
      getJobById: "jobs/getJobById"
    }),
    getJobData() {
      return this.getJobById(this.jobId);
    }
  },
  data: () => ({
    jobData: {},
    jobId: null,
    loading: false,
    submitStatus: false,
    applicationData: {
      firstName: null,
      lastName: null,
      telephone: null,
      mobile: null,
      address: null,
      postal_code: null,
      country: null,
      nationality: null,
      email: null,
      cover_letter: null,
      agree: false
    },
    nationality: nationality,
    countries: countries
  }),
  beforeMount() {
    this.jobId = this.$route.params.id;

    //Get company data
    this.fetchJobData();
  },
  methods: {
    fetchJobData() {
      if (typeof this.getJobData === "undefined") {
        this.$store.dispatch("jobs/getJobFromAPI", {
          value: this.jobId
        });
      } else {
        this.jobData = this.getJobData;
        //Set loading status
        this.loading = false;
      }
    },
    validateJobApplication() {
      this.$validator.validateAll().then(result => {
        if (result) {
          // eslint-disable-next-line
          alert("Form Submitted!");
          return;
        }

        alert("Correct them errors!");
      });
    }
  },
  watch: {
    getCompanyById: {
      handler(val) {
        this.fetchJobData();
      },
      deep: true,
      immediate: true
    }
  }
};
</script>

<style lang="scss" scoped>
.job__single {
  .job__sidebar {
    display: grid;
    grid-template-columns: 1fr 0.4fr;
    grid-column-gap: var(--gutter);
  }
}

.job__details__logo {
  display: grid;
  grid-template-columns: 2fr 0.8fr;

  .job__details {
    h2 {
      font-style: normal;
      font-weight: bold;
      font-size: 36px;
      line-height: normal;
      margin-top: 0;
      color: var(--color-dark);
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
      grid-template-columns: repeat(3, 1fr);
      margin-bottom: calc(var(--gutter) * 2);
      grid-gap: 10px;
    }
  }

  .company__logo {
    .logo {
      text-align: center;
      display: block;

      img {
        width: 80%;
      }
    }
  }
}

.apply__grid__layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: var(--gutter);
}

.upload__options {
  button {
    margin-right: calc(var(--gutter) / 2);
  }
}

.file__name {
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: normal;
  text-transform: uppercase;
  color: var(--color-dark);
  display: block;
  margin-bottom: 5px;
  margin-top: var(--gutter);

  span {
    text-transform: initial;
    font-weight: 300;
  }
}

.acceptance__submit {
  display: flex;
  align-items: center;
  border-top: 1px solid var(--color-gray-light);
  padding-top: var(--gutter);

  @keyframes shrink-bounce {
    0% {
      transform: scale(1);
    }
    33% {
      transform: scale(0.85);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes checkbox-check {
    0% {
      width: 0;
      height: 0;
      border-color: white;
      transform: translate3d(0, 0, 0) rotate(45deg);
    }
    33% {
      width: 7px;
      height: 0;
      transform: translate3d(0, 0, 0) rotate(45deg);
    }
    100% {
      width: 7px;
      height: 16px;
      border-color: white;
      transform: translate3d(0, -16px, 0) rotate(45deg);
    }
  }

  @keyframes checkbox-check-submit {
    0% {
      width: 0;
      height: 0;
      border-color: white;
      transform: translate3d(0, 0, 0) rotate(45deg);
    }
    33% {
      width: 20px;
      height: 0;
      transform: translate3d(0, 0, 0) rotate(45deg);
    }
    100% {
      width: 20px;
      height: 45px;
      border-color: white;
      transform: translate3d(0, -45px, 0) rotate(45deg);
    }
  }

  .checkbox__text {
    text-transform: initial;
    font-weight: 300;
  }

  .checkbox__accept {
    margin-right: 10px;
    text-align: center;
    width: 50px;

    input[type="checkbox"] {
      display: none;
    }

    input[type="checkbox"] + label {
      position: relative;
      display: flex;
      margin: 0;
      align-items: center;
      color: #9e9e9e;
      transition: color 250ms cubic-bezier(0.4, 0, 0.23, 1);
    }

    input[type="checkbox"] + label > span {
      margin-right: 10px;
      width: 40px;
      height: 40px;
      border-radius: 40px;
      background: transparent;
      border: 2px solid #9e9e9e;
      cursor: pointer;
      transition: all 250ms cubic-bezier(0.4, 0, 0.23, 1);
    }

    input[type="checkbox"] + label:hover,
    input[type="checkbox"]:focus + label {
      color: #fff;
    }
    input[type="checkbox"] + label:hover > span,
    input[type="checkbox"]:focus + label > span {
      background: rgba(255, 255, 255, 0.1);
    }

    input[type="checkbox"]:checked + label > span {
      border: 20px solid var(--color-green);
      animation: shrink-bounce 200ms cubic-bezier(0.4, 0, 0.23, 1);
    }
    input[type="checkbox"]:checked + label > span:before {
      content: "";
      position: absolute;
      top: 18px;
      left: 10px;
      border-right: 3px solid transparent;
      border-bottom: 3px solid transparent;
      transform: rotate(45deg);
      transform-origin: 0% 100%;
      animation: checkbox-check 125ms 250ms cubic-bezier(0.4, 0, 0.23, 1)
        forwards;
    }
  }
}

.submit__buttons {
  .submit__application__button {
    margin-right: 10px;
  }
}

.response__message {
  width: 100%;
  display: grid;
  grid-template-columns: 70px 1fr;
  grid-gap: var(--gutter);
  border-radius: 5px;
  padding: var(--gutter);
  align-items: center;
  margin-bottom: var(--gutter);

  &.success {
    background-color: var(--response-background-success);

    .icon__wrapper {
      .icon {
        background: var(--color-green);
        box-shadow: 0 10px 20px var(--response-background-success-icon-shadow);
      }
    }
  }

  &.error {
    background-color: var(--response-background-error);

    .icon__wrapper {
      .icon {
        background: var(--color-red);
        box-shadow: 0 10px 20px var(--response-background-error-icon-shadow);
      }
    }
  }

  .icon__wrapper {
    .icon {
      width: 70px;
      height: 70px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50px;

      img {
        width: 50%;
      }
    }
  }

  .message {
    h4 {
      width: 100%;
      display: block;
      font-size: 25px;
      line-height: 25px;
      margin: 0;
    }
    p {
      display: block;
      margin: 0;
    }
  }
}

@media (max-width: 1024px) {
  .job__single {
    .job__sidebar {
      grid-template-columns: 1fr;
    }
  }
}

@media (max-width: 768px) {
}

@media (max-width: 450px) {
}
</style>

