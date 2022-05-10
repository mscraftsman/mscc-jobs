<template>
  <div class="body__container job-single__view">
    <transition name="fade" mode="out-in">
      <LoaderComponent v-if="loading" />
      <div v-else>
        <section class="job__single">
          <div class="container__fw">
            <div class="job__sidebar">
              <!-- JOB -->
              <div class="job__block">
                <div class="block__content">
                  <div class="body__content job__details__logo">
                    <div class="job__details">
                      <h2 v-if="jobData.jobTitle">{{ jobData.jobTitle }}</h2>

                      <div class="data__cell">
                        <div class="title__company">
                          <template v-if="jobData.employerName">
                            <router-link
                              v-if="jobData && jobData.profileId"
                              :to="{
                                name: 'profileSingle',
                                params: { id: jobData.profileId }
                              }"
                              class="company"
                            >
                              {{ jobData.employerName }}
                            </router-link>
                          </template>
                        </div>
                      </div>

                      <div class="row-1">
                        <div class="data__cell">
                          <label>Location</label>
                          <div class="data__content" v-if="jobData.locationText">
                            {{ jobData.locationText }}
                          </div>
                        </div>
                        <div class="data__cell">
                          <label>Type</label>
                          <div class="data__content" v-if="jobData.type">
                            {{ jobData.type }}
                          </div>
                        </div>
                        <div class="data__cell">
                          <label>Pay (Monthly)</label>
                          <div class="data__content" v-if="jobData.salary">
                            {{ jobData.salary }}
                          </div>
                        </div>
                        <!-- <div class="data__cell">
                          <label>Seniority Level</label>
                          <div
                            class="data__content"
                            v-if="jobData.seniority_level"
                          >
                            {{ jobData.seniority_level }}
                          </div>
                        </div> -->
                        <!-- <div class="data__cell">
                          <label>Job Functions</label>
                          <div class="data__content" v-if="jobData.functions">{{ jobData.functions }}</div>
                        </div>-->
                        <div class="data__cell">
                          <label>Start</label>
                          <div class="data__content" v-if="jobData.startDesc">
                            {{ jobData.startDesc }}
                          </div>
                        </div>
                        <div class="data__cell">
                          <label>Duration</label>
                          <div
                            class="data__content"
                            v-if="jobData.durationDesc"
                          >
                            {{ jobData.durationDesc }}
                          </div>
                        </div>
                      </div>

                      <div class="row-2">
                        <div class="tags white__bg">
                          <ul v-if="tags">
                            <li v-for="(tag, index) in tags" :key="index">
                              <router-link
                                class="tag"
                                :to="{ name: 'jobs', query: { tag: tag } }"
                              >
                                {{ tag }}
                              </router-link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div class="company__logo" v-if="jobData.customerId">
                      <div v-if="jobData.logo">
                        <router-link
                          :to="{
                            name: 'profileSingle',
                            params: { id: this.jobData.profileId }
                          }"
                        >
                          <div class="logo__outer">
                            <img
                              v-if="jobData && jobData.logo"
                              :src="jobData.logo"
                              :alt="
                                'Company profile of ' + jobData.employerName
                              "
                            />
                            <div class="company__initial" v-else>
                              <span v-if="jobData && job.employerName">
                                {{ getCompanyInitial(job.employerName) }}
                              </span>
                            </div>
                          </div>
                        </router-link>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="block__content">
                  <h3>Description</h3>
                  <div
                    class="body__content styled__content"
                    v-if="jobData.jobDesc"
                    v-html="jobData.jobDesc"
                  />
                </div>

                <!-- <div class="block__content">
                  <h3>Responsibilities</h3>
                  <div
                    class="body__content styled__content"
                    v-if="jobData.responsibilities"
                    v-html="jobData.responsibilities"
                  ></div>
                </div>-->

                <div class="block__content">
                  <h3>Requirements</h3>
                  <div
                    class="body__content styled__content"
                    v-if="jobData.requirements"
                    v-html="jobData.requirements"
                  />
                </div>

                <div class="block__content">
                  <h3>Benefits</h3>
                  <div
                    class="body__content styled__content"
                    v-if="jobData.benefits"
                    v-html="jobData.benefits"
                  />
                </div>

                <!-- <div v-if="jobData.applyStatus"> -->
                <div>
                  <div
                    class="block__content"
                    v-if="jobData.applyOnUrl === false"
                  >
                    <h3 id="apply">
                      Apply for this job - {{ jobData.jobTitle }}
                    </h3>
                    <form
                      @submit.prevent="validateJobApplication"
                      autocomplete="off"
                    >
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

                        <InputEmail
                          label="Email"
                          name="email"
                          v-model="applicationData.email"
                          v-validate="'required|email'"
                          :message="errors.first('email')"
                        />

                        <InputTel
                          label="Telephone/Mobile number"
                          name="telephone"
                          v-model="applicationData.telephone"
                          v-validate="'required|numeric|min:7'"
                          :message="errors.first('telephone')"
                        />

                        <!-- <InputTel
                        label="Mobile number"
                        name="mobile"
                        v-model="applicationData.mobile"
                        v-validate="'required|numeric|min:7'"
                        :message="errors.first('mobile')"
                        />-->

                        <InputTextarea
                          label="Residential address"
                          :full="true"
                          name="address"
                          v-model="applicationData.address"
                          v-validate="'required'"
                          :message="errors.first('address')"
                        />

                        <InputText
                          label="Postal Code"
                          name="postalcode"
                          v-model="applicationData.postal_code"
                          v-validate="'required|numeric'"
                          :message="errors.first('postalcode')"
                        />
                        <br />

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
                          <label
                            >Upload your curriculum vitae (.doc, .docx, .pdf or
                            .rtf )</label
                          >

                          <div class="upload__options">
                            <div class="upload__cv__button">
                              <input
                                id="cv_upload"
                                type="file"
                                ref="cv_upload"
                                @change="handleCVUpload()"
                              />
                              <label
                                for="cv_upload"
                                class="upload__pc__button button__global blue override__visbility not__block"
                              >
                                <img
                                  src="@/assets/img/pc.svg"
                                  class="icon"
                                  alt="Choose a document from your machine"
                                  title="Choose a document from your machine"
                                />
                                <span class="text">From Device</span>
                              </label>
                            </div>

                            <!-- <button
                            type="button"
                            class="upload__pc__button button__global blue override__visbility"
                          >
                            <img src="@/assets/img/drive.svg" class="icon">
                            <span class="text">Google Drive</span>
                            </button>-->

                            <button
                              type="button"
                              class="upload__pc__button button__global blue override__visbility"
                              aria-label="Choose a document from OneDrive"
                              @click="openOneDrivePicker()"
                            >
                              <img
                                src="@/assets/img/onedrive.svg"
                                class="icon"
                                alt="Choose a document from OneDrive"
                                title="Choose a document from OneDrive"
                              />
                              <span class="text">OneDrive</span>
                            </button>

                            <button
                              type="button"
                              class="upload__pc__button button__global blue override__visbility"
                              aria-label="Choose a document from Dropbox"
                              @click="openDropboxChooser()"
                            >
                              <img
                                src="@/assets/img/dropbox.svg"
                                class="icon"
                                alt="Choose a document from Dropbox"
                                title="Choose a document from Dropbox"
                              />
                              <span class="text">Dropbox</span>
                            </button>
                          </div>

                          <div
                            class="file__name"
                            v-if="CVInformation.fileName !== null"
                          >
                            File name:
                            <span>{{ CVInformation.fileName }}</span>
                          </div>

                          <div
                            class="upload__in__progress"
                            v-if="CVUploadStatus.uploading"
                          >
                            <div class="icon">
                              <div class="loading" />
                            </div>
                            <div class="text">Upload in progress</div>
                          </div>

                          <div
                            :class="[
                              'input__block',
                              'full',
                              'response__message',
                              'error__upload__wrapper'
                            ]"
                            v-if="this.CVUploadStatus.error"
                          >
                            <div class="icon__wrapper">
                              <div class="icon">
                                <img src="@/assets/img/error_white.svg" alt />
                              </div>
                            </div>
                            <div class="message">
                              <h4>Upload Error</h4>
                              <p>{{ this.CVUploadStatus.error }}</p>
                            </div>
                          </div>
                        </div>
                        <!-- CV upload -->
                        <div :class="['input__block', 'full']">
                          <div class="checkbox__styled border__top">
                            <div class="checkbox__accept">
                              <input
                                type="checkbox"
                                required
                                id="accept__job__conditions"
                                v-model="applicationData.agree"
                              />
                              <label for="accept__job__conditions">
                                <span />
                              </label>
                            </div>
                            <label
                              class="checkbox__text"
                              for="accept__job__conditions"
                            >
                              By pressing <i>Submit Application</i>, you consent
                              to your application being transmitted to
                              {{ jobData.employerName }} and being processed in
                              accordance with {{ jobData.employerName }}'s
                              privacy practices and Jobs In Tech's
                              <router-link to="/privacy">
                                Privacy Policy</router-link
                              >.
                            </label>
                          </div>
                        </div>

                        <div
                          :class="['input__block', 'full', 'submit__buttons']"
                        >
                          <button
                            type="button"
                            class="submit__application__button button__global green override__visbility"
                            aria-label="Submit your application"
                            @click="validateJobApplication()"
                            :disabled="applicationData.agree === false"
                          >
                            <div class="icon">
                              <div class="loading" />
                            </div>
                            <span class="text">Submit Application</span>
                          </button>

                          <button
                            type="reset"
                            class="reset__application__button button__global yellow override__visbility"
                            aria-label="Reset the application form"
                            @click="resetForm()"
                          >
                            <span class="text">Reset</span>
                          </button>
                        </div>

                        <div
                          :class="[
                            'input__block',
                            'full',
                            'response__message',
                            'success'
                          ]"
                          v-if="submitStatus.success"
                        >
                          <div class="icon__wrapper">
                            <div class="icon">
                              <img
                                src="@/assets/img/success.svg"
                                alt="Success"
                              />
                            </div>
                          </div>
                          <div class="message">
                            <h4>Success !</h4>
                            <p>Your application has been sent !</p>
                          </div>
                        </div>

                        <div
                          :class="[
                            'input__block',
                            'full',
                            'response__message',
                            'error'
                          ]"
                          v-if="submitStatus.error"
                        >
                          <div class="icon__wrapper">
                            <div class="icon">
                              <img
                                src="@/assets/img/error_white.svg"
                                alt="Error"
                              />
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

                  <div
                    v-if="jobData.applyOnUrl === true"
                    class="block__content"
                  >
                    <h3 id="apply">
                      Apply for this job - {{ jobData.jobTitle }}
                    </h3>
                    <div class="body__content">
                      <a
                        :href="jobData.applyUrl"
                        target="_blank"
                        rel="noopener"
                        class="submit__job__button button__global blue override__visbility"
                      >
                        <img
                          class="icon"
                          src="@/assets/img/external-link-light.svg"
                          alt="Apply on our website"
                          title="Apply on our website"
                        />
                        <div class="text">Apply on website</div>
                      </a>
                    </div>
                  </div>

                  <div v-if="jobData.expired === true" class="block__content">
                    <h3 id="apply">
                      Application closed
                    </h3>
                    <div class="body__content styled__content">
                      <p>
                        Applications for this job listing are now closed. We
                        thank you for your interest and invite you to look up
                        other job opportunities.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <!-- JOB -->
              <!-- SIDEBAR -->
              <div class="sidebar__block">
                <div class="block__content" v-if="jobData.techStack">
                  <h3>Tech Stack</h3>
                  <div class="body__content">
                    <div class="tech__stack__icons">
                      <div
                        class="tech__block"
                        v-for="(tech, index) in jobData.techStack"
                        :key="index"
                      >
                        <img
                          :src="'/img/techstack/' + tech.logo"
                          class="icon"
                          :alt="tech.text"
                          :title="tech.text"
                        />
                        <div class="text">{{ tech.text }}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="block__content" v-if="this.jobByProfile.length > 0">
                  <h3>More Jobs by {{ jobData.employerName }}</h3>
                  <div class="body__content">
                    <div class="recent__jobs">
                      <div
                        class="job__block"
                        v-for="(job, index) in this.jobByProfile"
                        :key="index"
                      >
                        <router-link
                          :to="{ name: 'jobsSingle', params: { id: job.id } }"
                          class="title"
                          >{{ job.name }}</router-link
                        >
                      </div>
                    </div>
                  </div>
                </div>

                <div class="block__content" v-if="this.jobByProfile.length > 0">
                  <h3>Share this opening</h3>
                  <div class="body__content">
                    <SocialSharingComponent
                      :url="url"
                      :title="jobData.jobTitle"
                    />
                  </div>
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
import SocialSharingComponent from "@/components/shared/SocialSharingComponent";
import JobBlock from "@/components/jobs/JobBlock";
import { mapGetters } from "vuex";
import LoaderComponent from "@/components/shared/LoaderComponent";
import RecentJobs from "@/components/jobs/RecentJobs.vue";

import axios from "axios";
import {
  UPLOAD_ENDPOINT,
  ONEDRIVE_CLIENT_ID,
  APPLY_ENDPOINT,
  SITE_ID
} from "../store/constants";

import InputText from "@/components/forms/InputText";
import InputTel from "@/components/forms/InputTel";
import InputTextarea from "@/components/forms/InputTextarea";
import InputEmail from "@/components/forms/InputEmail";
import InputEditor from "@/components/forms/InputEditor";
import InputNumeric from "@/components/forms/InputNumeric";
import InputSelect from "@/components/forms/InputSelect";

import countries from "@/components/forms/countries.js";
import nationality from "@/components/forms/nationality.js";

function convertFileToBinary(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = () => {
      let array = new Uint8Array(reader.result);
      resolve(array);
    };
    reader.onerror = error => reject(error);
  });
}

export default {
  components: {
    SocialSharingComponent,
    JobBlock,
    LoaderComponent,
    InputText,
    InputTel,
    InputTextarea,
    InputEmail,
    InputEditor,
    InputNumeric,
    InputSelect,
    RecentJobs
  },
  computed: {
    ...mapGetters({
      getJobById: "jobs/getJobById",
      getCustomerById: "companies/getCustomerById",
      getProfileById: "companies/getProfileById"
    }),
    getJobData() {
      return this.getJobById(this.jobId);
    },
    getProfileData() {
      return this.getProfileById(this.jobData.profileId);
    },
    // company() {
    //   let companyData = this.getCompanyById(this.jobId);
    //   this.companyData = companyData;

    //   return companyData;
    // },
    customer() {
      let customerData = this.getCustomerById(this.jobData.customerId);
      this.customerData = customerData;

      return customerData;
    },
    tags() {
      if (this.jobData && this.jobData.tags) {
        let tags = this.jobData.tags;
        let tagsArr = tags.split(",").map(function(item) {
          return item.trim();
        });

        return tagsArr;
      }
    }
  },
  data: () => ({
    jobData: {},
    company: {},
    jobByProfile: [],
    listingByProfile: [],
    companyData: {},
    customerData: {},
    url: null,
    jobId: null,
    loading: true,
    allowedTypes: [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/rtf"
    ],
    allowedUploadSize: 5242880,
    allowedExtensions: [".pdf", ".doc", ".docx", ".rtf"],
    submitStatus: {
      error: false,
      success: false
    },
    CVInformation: {
      fileName: null
    },
    CVUploadStatus: {
      success: false,
      error: null,
      uploading: false
    },
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
      agree: false,
      cvFileName: null,
      cloudFileUrl: null,
      hasCloudFile: false,
      advertId: 0,
      siteId: SITE_ID
    },
    nationality: nationality,
    countries: countries
  }),
  beforeMount() {
    this.jobId = this.$route.params.id;
    this.url = window.location.href;

    //Get company data
    this.fetchJobData();
  },
  methods: {
    getCompanyInitial(value) {
      if (value) {
        return value.substring(0, 2);
      }
    },
    fetchJobData() {
      if (typeof this.getJobData === "undefined") {
        // FYR https://stackoverflow.com/questions/40165766/returning-promises-from-vuex-actions
        this.$store
          .dispatch("jobs/getJobFromApi", {
            value: this.$route.params.id
          })
          .then(response => {
            this.jobData = response;
            if (this.jobData !== "undefined") {
              if (typeof this.getProfileData === "undefined") {
                var profileId = this.jobData.profileId;
                this.$store
                  .dispatch("companies/getProfileByPostRequest", {
                    value: profileId
                  })
                  .then(response => {
                    this.company = response;
                    if (this.company.listings.length > 0) {
                      var listings = this.company.listings;

                      for (let i = 0; i < listings.length; i++) {
                        var list = {
                          id: 0,
                          name: null
                        };

                        list.id = listings[i].id;
                        list.name = listings[i].jobTitle;

                        this.jobByProfile.push(list);
                      }
                    }
                  })
                  .catch(error => {
                    // console.error(error);
                  });
              } else {
                this.company = this.getProfileData;
              }
            }

            this.loading = false;
            return response.customerId;
          })
          // .then(customerId => {
          //   // GET COMPANY DATA
          //   if (typeof this.customer === "undefined") {
          //     this.$store
          //       .dispatch("companies/getCustomerByIdFromApi", {
          //         value: customerId
          //       })
          //       .then(response => {
          //         this.customerData = response;
          //       })
          //       .catch(error => {
          //         console.error(error);
          //       });
          //   }
          // })
          .catch(error => {
            // console.error(error);
            this.$router.push({ name: "notFound" });
          });
      } else {
        this.jobData = this.getJobData;
        //Set loading status
        this.loading = false;
      }
    },
    validateJobApplication() {
      // TODO: Check if file has been uploaded

      this.$validator.validateAll().then(result => {
        if (result) {
          this.applicationData.advertId = this.jobId;
          this.applicationData.siteId = SITE_ID.replace("/sites/", "");
          axios
            .post(APPLY_ENDPOINT, this.applicationData)
            .then(response => {
              if (response.status === 200) {
                this.submitStatus.success = true;
                this.submitStatus.error = false;
              }
            })
            .catch(e => {
              // console.error(e);
              alert("Correct the errors!");
              this.submitStatus.error = true;
              this.submitStatus.success = false;
            });

          return;
        }
      });
    },
    handleCVUpload(file) {
      // Resets alerts
      this.CVUploadStatus.error = null;
      this.CVUploadStatus.success = false;

      convertFileToBinary(this.$refs.cv_upload.files[0])
        .then(data => {
          // fileName is file upload name
          let fileName = this.$refs.cv_upload.files[0].name;
          let fileSize = this.$refs.cv_upload.files[0].size;
          let fileType = this.$refs.cv_upload.files[0].type;

          // Set filename
          this.CVInformation.fileName = fileName;
          this.CVInformation.fileSize = fileSize;

          // Data contains file data
          if (!this.allowedTypes.includes(fileType)) {
            this.CVUploadStatus.error = "Incorrect file type.";
            return;
          }

          if (fileSize > this.allowedUploadSize) {
            this.CVUploadStatus.error = "File size is above 5 Mb.";
            return;
          }

          // TODO: Upload goes here and set status to true below
          if (
            fileSize < this.allowedUploadSize &&
            this.allowedTypes.includes(fileType)
          ) {
            // Set uploading information true
            this.CVUploadStatus.uploading = true;

            // TODO upload logic here
            let formData = new FormData();
            formData.append("file", this.$refs.cv_upload.files[0]);
            axios
              .post(UPLOAD_ENDPOINT, formData, {
                headers: {
                  "Content-Type": "multipart/form-data"
                }
              })
              .then(response => {
                if (response.status === 200) {
                  this.applicationData.cvFileName = response.data.fileName;
                  this.CVUploadStatus.uploading = false;
                  this.CVUploadStatus.success = true;
                }
              })
              .catch(error => {
                this.CVUploadStatus.uploading = false;
                this.CVUploadStatus.error =
                  "Uploading file failed. Please try again.";
              });
          }
        })
        .catch(e => {
          // console.log(e);
        });
    },
    resetForm() {
      this.CVUploadStatus.error = null;
      this.CVUploadStatus.success = false;
      this.CVUploadStatus.uploading = false;

      this.submitStatus.error = false;
      this.submitStatus.success = false;
      this.CVInformation.fileName = null;

      this.applicationData = {
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
        agree: false,
        cvFileName: null,
        cloudFileUrl: null,
        hasCloudFile: false
      };
    },
    openDropboxChooser() {
      let options = {
        success: response => {
          if (response && response.length > 0) {
            if (response[0].bytes > this.allowedUploadSize) {
              this.CVUploadStatus.error = "File size is above 5 Mb.";
              return;
            } else {
              this.CVInformation.fileName = response[0].name;
              this.applicationData.cloudFileUrl = response[0].link;
              this.applicationData.hasCloudFile = true;
            }
          }
        },
        cancel: () => {
          this.CVInformation.fileName = null;
        },
        linkType: "direct",
        multiselect: false,
        extensions: this.allowedExtensions
      };
      Dropbox.choose(options);
    },
    openOneDrivePicker() {
      let odOptions = {
        clientId: ONEDRIVE_CLIENT_ID,
        action: "download",
        multiSelect: false,
        openInNewWindow: true,
        advanced: {
          redirectUri: window.location.origin
        },
        success: response => {
          if (response && response.value.length > 0) {
            let file = response.value[0];
            let name = file["name"];
            let size = file["size"];
            let downloadUrl = file["@microsoft.graph.downloadUrl"];
            let extension = name.substring(name.lastIndexOf("."));

            if (!this.allowedExtensions.includes(extension)) {
              this.CVUploadStatus.error = "Incorrect file type.";
              return;
            }

            if (size > this.allowedUploadSize) {
              this.CVUploadStatus.error = "File size is above 5 Mb.";
              return;
            }

            if (
              size <= this.allowedUploadSize &&
              this.allowedExtensions.includes(extension)
            ) {
              this.CVInformation.fileName = name;
              this.applicationData.cloudFileUrl = downloadUrl;
              this.applicationData.hasCloudFile = true;
            }
          }
        },
        cancel: () => {
          this.CVInformation.fileName = null;
        },
        error: e => {
          this.CVUploadStatus.uploading = false;
          this.CVUploadStatus.error =
            "Fetching file from OneDrive failed. Please try again.";
        }
      };
      OneDrive.open(odOptions);
    }
  },
  watch: {
    // getCompanyById: {
    //   handler(val) {
    //     this.fetchJobData();
    //   },
    //   deep: true,
    //   immediate: true
    // }
  },
  metaInfo() {
    let title =
      this.jobData && this.jobData.jobTitle
        ? this.jobData.jobTitle + " at " + this.jobData.employerName
        : "";
    return {
      title: title
    };
  }
};
</script>

<style lang="scss" scoped>
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
    margin-bottom: 30px;
  }
}

h2 {
  color: var(--site-text-color);
}

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
      color: var(--site-text-color);
      margin-bottom: auto;
    }

    label {
      color: var(--color-dark);
      text-transform: uppercase;
      font-weight: 900;
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

.recent__jobs {
  .job__block {
    padding-bottom: 10px;
    border-bottom: 1px solid var(--color-gray-light);
    margin-bottom: 10px;

    &:last-child {
      border-bottom: 0;
    }

    .title {
      text-decoration: none;
      color: var(--color-light);
      font-style: normal;
      font-weight: bold;
      font-size: 18px;
      display: block;
    }
    .company {
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: normal;
      font-weight: 100;
      text-decoration: none;
      color: var(--color-light);
      display: block;
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

  .upload__cv__button {
    display: inline-flex;
    margin-right: 10px;

    input[type="file"] {
      display: none;
    }
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

.upload__in__progress {
  display: flex;
  align-items: center;
  margin-bottom: var(--gutter);

  .icon {
    margin-right: 10px;

    .loading {
      display: block;
      margin: 0;
      font-size: 10px;
      position: relative;
      text-indent: -9999em;
      border-top: 5px solid rgba(0, 0, 0, 0.2);
      border-right: 5px solid rgba(0, 0, 0, 0.2);
      border-bottom: 5px solid rgba(0, 0, 0, 0.2);
      border-left: 5px solid var(--color-blue);
      transform: translateZ(0);
      animation: in-progress-loader 0.5s infinite linear;
    }

    .loading {
      &,
      &:after {
        border-radius: 50%;
        width: 20px;
        height: 20px;
      }
    }
  }

  .text {
    font-weight: 300;
  }
}

.submit__buttons {
  .submit__application__button {
    margin-right: 10px;
  }
}

.tech__stack__icons {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  grid-row-gap: var(--gutter);

  .tech__block {
    text-align: center;

    .text {
      color: var(--color-light);
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

@media (max-width: 600px) {
  .job__details__logo {
    display: grid;
    grid-template-columns: 2fr 0.5fr;

    .job__details {
      h2 {
        font-size: 27px;
      }

      .row-1 {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  }

  .upload__options {
    .upload__cv__button {
      width: 100%;
      margin-right: 0;
      margin-bottom: 5px;
    }

    button {
      margin-right: 0;
      width: 100%;
      margin-bottom: 10px;
    }

    .upload__pc__button {
      width: 100%;
    }
  }
}

@media (max-width: 450px) {
  .job__details__logo {
    .job__details {
      h2 {
        font-size: 23px;
      }

      .row-1 {
        grid-template-columns: 1fr;
      }
    }
  }
}
</style>
