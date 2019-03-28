<template>
  <div class="body__container submit__a__job__view">
    <section class="submit__a__job">
      <HeadingBreadcrumbs :breadcrumbs="breadcrumbs" pageTitle="Submit a job" :alertStatus="false"/>

      <div class="container__fw">
        <div class="submit_job__sidebar">
          <!-- SUBMIT JOB -->
          <div class="content__block">
            <form @submit.prevent="validateSubmission">
              <div class="block__content submit__job__block">
                <h3>Job information</h3>
                <div class="body__content submit__grid__layout">
                  <InputText
                    label="Position"
                    name="position"
                    v-model="submitJobData.position"
                    v-validate="'required'"
                    :full="true"
                    :message="errors.first('position')"
                  />

                  <InputText
                    label="Company Name"
                    name="companyName"
                    v-model="submitJobData.companyName"
                    v-validate="'required'"
                    :full="true"
                    :message="errors.first('companyName')"
                  />

                  <div class="if__remote__job">
                    <div class="checkbox__styled">
                      <div class="checkbox__accept">
                        <input
                          type="checkbox"
                          required
                          id="is__remote__job"
                          v-model="submitJobData.isRemote"
                          ref="isRemote"
                        >
                        <label for="is__remote__job">
                          <span></span>
                        </label>
                      </div>
                      <label class="checkbox__text small__heading" for="is__remote__job">
                        <InputText
                          label="This job is remote, but for applications in the region of:"
                          name="remoteRegions"
                          v-model="submitJobData.remoteRegion"
                          v-validate="(submitJobData.isRemote === true) ? 'required' : ''"
                          :message="errors.first('remoteRegions')"
                          :disabled="(submitJobData.isRemote === true) ? false : true"
                        />
                      </label>
                    </div>
                  </div>

                  <InputSelect
                    label="Type"
                    name="type"
                    v-model="submitJobData.type"
                    :values="jobTypes"
                    optionValue="name"
                    optionText="name"
                    :full="true"
                    v-validate="'required'"
                    :message="errors.first('type')"
                  />

                  <InputText
                    label="Seniority Level"
                    name="seniorityLevel"
                    v-model="submitJobData.seniorityLevel"
                    v-validate="'required'"
                    :full="true"
                    :message="errors.first('seniorityLevel')"
                  />

                  <InputText
                    label="Functions"
                    name="functions"
                    v-model="submitJobData.functions"
                    v-validate
                    :full="true"
                    :message="errors.first('functions')"
                    helpText="Use comma to separate the job functions"
                  />

                  <InputSelect
                    label="Primary tag"
                    name="primaryTag"
                    v-model="submitJobData.primaryTag"
                    :values="primaryTags"
                    optionValue="name"
                    optionText="name"
                    :full="true"
                    v-validate="'required'"
                    :message="errors.first('primaryTag')"
                    helpText="This primary tag shows first and increases visibility in the main sections"
                  />

                  <InputText
                    label="Extra tags"
                    name="extraTags"
                    v-model="submitJobData.extraTags"
                    v-validate
                    :full="true"
                    :message="errors.first('extraTags')"
                    helpText="Use tags like industry and tech stack, and separate multiple tags by comma"
                  />

                  <InputMultiSelect
                    label="Tech Stack"
                    name="techStack"
                    v-model="submitJobData.techStack"
                    :values="getTechStack"
                    optionValue="text"
                    optionText="text"
                    :full="true"
                    v-validate="'required'"
                    :message="errors.first('techStack')"
                    helpText="The Tech Stack"
                  />

                  <InputEditor
                    label="Job Summary"
                    name="summary"
                    :full="true"
                    v-model="submitJobData.summary"
                    v-validate="'required'"
                    :message="errors.first('summary')"
                  />

                  <InputEditor
                    label="Job Description"
                    name="description"
                    :full="true"
                    v-model="submitJobData.description"
                    v-validate="'required'"
                    :message="errors.first('description')"
                  />

                  <InputEditor
                    label="Job Responsibilities"
                    name="responsibilities"
                    :full="true"
                    v-model="submitJobData.responsibilities"
                    v-validate="'required'"
                    :message="errors.first('responsibilities')"
                  />

                  <InputEditor
                    label="Job Requirements"
                    name="requirements"
                    :full="true"
                    v-model="submitJobData.requirements"
                    v-validate="'required'"
                    :message="errors.first('requirements')"
                  />

                  <InputText
                    label="Salary"
                    name="salary"
                    v-model="submitJobData.salary"
                    v-validate="'required'"
                    :full="true"
                    :message="errors.first('salary')"
                  />

                  <InputEditor
                    label="How to apply?"
                    name="howToApply"
                    :full="true"
                    v-model="submitJobData.howToApply"
                    v-validate="'required'"
                    :message="errors.first('howToApply')"
                  />

                  <div class="apply__instructions">
                    <InputUrl
                      label="Apply URL"
                      name="applyUrl"
                      v-model="submitJobData.applyUrl"
                      v-validate="submitJobData.applyMode === 'applyUrl' ? {url: {require_protocol: true }} : ''"
                      :full="true"
                      :message="errors.first('applyUrl')"
                      @isFocused="applyUrlIsFocused"
                    />

                    <div class="or__text">
                      <span>Or</span>
                    </div>

                    <InputEmail
                      label="Apply Email"
                      name="applyEmail"
                      v-model="submitJobData.applyEmail"
                      v-validate="submitJobData.applyMode === 'applyEmail' ? 'required|email' : ''"
                      :full="true"
                      :message="errors.first('applyEmail')"
                      @isFocused="applyEmailIsFocused"
                      helpText="This email is public, the Apply button links to it if you do not supply an Apply URL above"
                    />

                    <div
                      :class="['input__block', 'full', 'response__message', 'error__apply__wrapper']"
                      v-if="submitStatus.submitted && !submitJobData.applyEmail && !submitJobData.applyUrl"
                    >
                      <div class="icon__wrapper">
                        <div class="icon">
                          <img src="@/assets/img/error_white.svg" alt>
                        </div>
                      </div>
                      <div class="message">
                        <h4>Error</h4>
                        <p>Choose either between</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="block__content submit__job__block">
                <h3>Company information</h3>
                <div class="body__content submit__grid__layout">
                  <div class="company__logo">
                    <div class="input__block full">
                      <div class="dropzone__company__logo">
                        <div class="upload__wrapper">
                          <label>Company Logo</label>
                          <vue-dropzone
                            ref="companyLogo"
                            id="companyLogo"
                            :options="CompanyLogoDropzoneOptions"
                            :useCustomSlot="true"
                            @vdropzone-success="companyLogoUploadSuccess"
                          >
                            <div class="dropzone__content">
                              <img src="/img/utils/upload.svg" class="icon">
                              <div class="text">Upload your logo</div>
                            </div>
                          </vue-dropzone>
                        </div>

                        <div class="preview__wrapper">
                          <label>Preview</label>
                          <img class="logo" :src="companyInformation.logoSrc" alt>
                        </div>
                      </div>
                    </div>
                  </div>

                  <InputUrl
                    label="Company Twitter"
                    name="socialTwitter"
                    v-model="submitJobData.socialTwitter"
                    v-validate="{url: {require_protocol: true }}"
                    :full="true"
                    :message="errors.first('socialTwitter')"
                  />

                  <InputUrl
                    label="Company Facebook"
                    name="socialFacebook"
                    v-model="submitJobData.socialFacebook"
                    v-validate="{url: {require_protocol: true }}"
                    :full="true"
                    :message="errors.first('socialFacebook')"
                  />

                  <InputUrl
                    label="Company LinkedIn"
                    name="socialLinkedIn"
                    v-model="submitJobData.socialLinkedIn"
                    v-validate="{url: {require_protocol: true }}"
                    :full="true"
                    :message="errors.first('socialLinkedIn')"
                  />

                  <InputEmail
                    label="Company Email"
                    name="email"
                    v-model="submitJobData.email"
                    v-validate="'required|email'"
                    :full="true"
                    :message="errors.first('email')"
                    helpText="Make sure this email is accessible by you! We use this to send the invoice and edit link. We can not and do not manually resend it!"
                  />

                  <div class="payment__card__info">
                    <div class="card__number">
                      <InputCreditCard
                        label="Company Card"
                        name="cardNumber"
                        v-model="submitJobData.cardNumber"
                        v-validate="'required|credit_card'"
                        :full="true"
                        :message="errors.first('cardNumber')"
                      />
                    </div>
                    <div class="card__expiry">
                      <InputCreditCardExpiry
                        label="Card Expiry"
                        name="cardExpiry"
                        v-model="submitJobData.cardExpiry"
                        v-validate="'required|date_format:MM/yy'"
                        :full="true"
                        :message="errors.first('cardExpiry')"
                      />
                    </div>
                    <div class="card__CVV">
                      <InputCreditCardCVC
                        label="Card CVC"
                        name="cardCVC"
                        v-model="submitJobData.cardCVC"
                        v-validate="'required|numeric|min:3|max:4'"
                        :full="true"
                        :message="errors.first('cardCVC')"
                      />
                    </div>

                    <div class="card__notes">
                      <div class="note">
                        <div class="icon">
                          <img src="@/assets/img/payment-lock.svg" alt>
                        </div>
                        <div class="text">Secure payment guaranteed by XXXXXX over HTTPS</div>
                      </div>

                      <div class="note">
                        <div class="icon">
                          <img class="small" src="@/assets/img/payment-card.svg" alt>
                        </div>
                        <div class="text">Card is only charged when you press "Submit your Job"</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="block__content submit__job__block">
                <h3>Get more leads</h3>
                <div class="body__content submit__grid__layout">
                  <!-- Show company logo -->
                  <div :class="['input__block', 'full']">
                    <div class="checkbox__styled">
                      <div class="checkbox__accept">
                        <input
                          type="checkbox"
                          id="company__show__logo"
                          v-model="submitJobData.showCompanyLogo"
                        >
                        <label for="company__show__logo">
                          <span></span>
                        </label>
                      </div>
                      <label
                        class="checkbox__text"
                        for="company__show__logo"
                      >Show my company logo besides my post (+$99)</label>
                    </div>
                  </div>

                  <!-- Featured yellow bar or background colour -->
                  <div :class="['input__block', 'full']">
                    <div class="checkbox__styled">
                      <div class="checkbox__accept">
                        <input
                          type="checkbox"
                          id="company__is__featured"
                          v-model="submitJobData.featured"
                        >
                        <label for="company__is__featured">
                          <span></span>
                        </label>
                      </div>
                      <label
                        class="checkbox__text"
                        for="company__is__featured"
                      >Highlight my post in️ yellow (+$99)</label>
                    </div>
                  </div>

                  <div :class="['input__block', 'full']">
                    <div class="checkbox__styled">
                      <div class="checkbox__accept">
                        <input
                          type="checkbox"
                          id="company__has__colour"
                          v-model="submitJobData.hasBrandColour"
                        >
                        <label for="company__has__colour">
                          <span></span>
                        </label>
                      </div>
                      <label class="checkbox__text" for="company__has__colour">
                        Highlight with my company's brand color (+$50)
                        <input
                          type="color"
                          :disabled="(submitJobData.hasBrandColour === true) ? false : true"
                          v-model="submitJobData.colour"
                        >
                      </label>
                    </div>
                  </div>

                  <div :class="['input__block', 'full']">
                    <div class="checkbox__styled">
                      <div class="checkbox__accept">
                        <input
                          type="checkbox"
                          id="company__stays_on_top_1_week"
                          v-model="submitJobData.staysOnTopFor1Week"
                        >
                        <label for="company__stays_on_top_1_week">
                          <span></span>
                        </label>
                      </div>
                      <label
                        class="checkbox__text"
                        for="company__stays_on_top_1_week"
                      >Sticky my post so it stays on top of the frontpage for 1 entire week (+$XX)</label>
                    </div>
                  </div>

                  <div :class="['input__block', 'full']">
                    <div class="checkbox__styled">
                      <div class="checkbox__accept">
                        <input
                          type="checkbox"
                          id="company__stays_on_top_1_month"
                          v-model="submitJobData.staysOnTopFor1Month"
                        >
                        <label for="company__stays_on_top_1_month">
                          <span></span>
                        </label>
                      </div>
                      <label
                        class="checkbox__text"
                        for="company__stays_on_top_1_month"
                      >Sticky my post so it stays on top of the frontpage for 🗓1 entire month (+$XX)</label>
                    </div>
                  </div>
                </div>
              </div>

              <div class="block__content submit__job__block">
                <h3>Save money & buy a package</h3>
                <div class="body__content submit__grid__layout">
                  <!-- Show company logo -->
                  <div
                    :class="['input__block', 'full']"
                    v-for="(item, index) in packageInformation"
                    :key="index"
                  >
                    <div class="checkbox__styled">
                      <div class="checkbox__accept">
                        <input
                          type="radio"
                          name="packageInfo"
                          :id="'company__package__' + index"
                          :value="item.value"
                          v-model="submitJobData.packageInfo"
                          @click="uncheck(item.value)"
                        >
                        <label :for="'company__package__' + index" @click="uncheck(item.value)">
                          <span></span>
                        </label>
                      </div>
                      <label
                        class="checkbox__text"
                        :for="'company__package__' + index"
                        @click="uncheck(item.value)"
                      >{{item.name}}</label>
                    </div>
                  </div>
                </div>
              </div>

              <div :class="['input__block', 'full', 'submit__buttons']">
                <button
                  type="button"
                  class="submit__job__button button__global green override__visbility"
                  @click="validateSubmission()"
                >
                  <div class="icon">
                    <div class="loading"></div>
                  </div>
                  <span class="text">Submit job</span>
                </button>

                <button
                  type="reset"
                  class="reset__submission__button button__global yellow override__visbility"
                  @click="resetForm()"
                >
                  <span class="text">Reset</span>
                </button>
              </div>

              <div
                :class="['input__block', 'full', 'response__message', 'success']"
                v-if="submitStatus.success"
              >
                <div class="icon__wrapper">
                  <div class="icon">
                    <img src="@/assets/img/success.svg" alt>
                  </div>
                </div>
                <div class="message">
                  <h4>Success !</h4>
                  <p>Thanks for submitting a job!</p>
                </div>
              </div>

              <div
                :class="['input__block', 'full', 'response__message', 'error']"
                v-if="submitStatus.error"
              >
                <div class="icon__wrapper">
                  <div class="icon">
                    <img src="@/assets/img/error_white.svg" alt>
                  </div>
                </div>
                <div class="message">
                  <h4>Error !</h4>
                  <p>There is an error in your data</p>
                </div>
              </div>
            </form>
          </div>
          <!-- SUBMIT JOB -->
          <!-- SIDEBAR -->
          <div class="sidebar__block">
            <div class="block__content">
              <div class="body__content"></div>
            </div>
          </div>
          <!-- SIDEBAR -->
        </div>
      </div>

      <modal name="job-preview" :adaptive="true" height="auto" :scrollable="true" width="1400px">
        <div class="job__preview__modal">
          <h3>Here's a preview of how your job will look like</h3>

          <JobBlock :jobData="job" :isPreview="true"/>
        </div>
      </modal>

      <div class="preview__button">
        <button
          type="button"
          class="submit__job__button button__global green override__visbility"
          @click="showPreview()"
        >
          <span class="text">Preview</span>
        </button>
      </div>
    </section>
  </div>
</template>


<script>
import JobBlock from "@/components/jobs/JobBlock";
import { VueEditor } from "vue2-editor";
import ButtonComponent from "@/components/shared/ButtonComponent";
import HeadingBreadcrumbs from "@/components/shared/HeadingBreadcrumbs";

import InputText from "@/components/forms/InputText";
import InputTel from "@/components/forms/InputTel";
import InputTextarea from "@/components/forms/InputTextarea";
import InputEmail from "@/components/forms/InputEmail";
import InputEditor from "@/components/forms/InputEditor";
import InputNumeric from "@/components/forms/InputNumeric";
import InputSelect from "@/components/forms/InputSelect";
import InputMultiSelect from "@/components/forms/InputMultiSelect";
import InputUrl from "@/components/forms/InputUrl";
import InputCreditCard from "@/components/forms/InputCreditCard";
import InputCreditCardExpiry from "@/components/forms/InputCreditCardExpiry";
import InputCreditCardCVC from "@/components/forms/InputCreditCardCVC";
import InputDate from "@/components/forms/InputDate";

import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";

import { mapGetters } from "vuex";

export default {
  components: {
    JobBlock,
    InputText,
    InputTel,
    InputTextarea,
    InputEmail,
    InputEditor,
    InputNumeric,
    InputSelect,
    InputUrl,
    InputCreditCard,
    InputCreditCardExpiry,
    InputCreditCardCVC,
    InputDate,
    HeadingBreadcrumbs,
    vueDropzone: vue2Dropzone,
    InputMultiSelect
  },
  computed: {
    ...mapGetters({
      getTechStack: "jobs/getTechStack"
    })
  },
  data: () => ({
    breadcrumbs: [
      {
        name: "Submit a job",
        path: "submit-job"
      }
    ],
    jobTypes: [
      {
        name: "Full Time",
        value: "Full Time"
      },
      {
        name: "Part Time",
        value: "Part Time"
      },
      {
        name: "Freelance",
        value: "Freelance"
      }
    ],
    primaryTags: [
      {
        name: "Software Development",
        value: "Software Development"
      },
      {
        name: "Customer Support",
        value: "Customer Support"
      },
      {
        name: "Marketing",
        value: "Marketing"
      },
      {
        name: "Design",
        value: "Design"
      },
      {
        name: "Front End",
        value: "Front End"
      },
      {
        name: "Back End",
        value: "Back End"
      },
      {
        name: "Non Tech",
        value: "Non Tech"
      }
    ],
    submitStatus: {
      submitted: false,
      error: false,
      success: false
    },
    companyInformation: {
      logoFileName: null,
      logoSrc: null
    },
    submitJobData: {
      colour: "#ffffff",
      type: null,
      seniorityLevel: null,
      functions: null,
      position: null,
      companyName: null,
      isRemote: false,
      remoteRegion: null,
      primaryTag: null,
      extraTags: null,
      description: null,
      responsibilities: null,
      requirements: null,
      summary: null,
      salary: null,
      howToApply: null,
      applyUrl: null,
      applyEmail: null,
      applyMode: "applyUrl",
      socialTwitter: null,
      socialFacebook: null,
      socialLinkedIn: null,
      email: null,
      cardNumber: null,
      cardExpiry: null,
      cardCVC: null,
      techStack: [],
      showCompanyLogo: false,
      featured: false,
      hasBrandColour: false,
      staysOnTopFor1Week: false,
      staysOnTopFor1Month: false,
      packageInfo: null
    },
    CompanyLogoDropzoneOptions: {
      url: "https://httpbin.org/post",
      thumbnailWidth: 150,
      maxFilesize: 0.5,
      headers: { "My-Awesome-Header": "header value" },
      uploadMultiple: false,
      acceptedFiles: ".jpeg, .jpg, .png, .gif, .svg",
      maxFilesize: 1
    },
    packageInformation: [
      {
        name: "Package 1",
        value: 1
      },
      {
        name: "Package 2",
        value: 2
      },
      {
        name: "Package 3",
        value: 3
      },
      {
        name: "Package 4",
        value: 4
      }
    ],
    previouslySelectedPackage: null,
    job: {
      colour: "#ffffff",
      featured: true,
      hasLogo: true,
      id: "",
      job: {
        name: "",
        salary: "",
        type: "",
        pay: "",
        seniority_level: "",
        functions: "",
        summary: ""
      },
      company: {
        name: "",
        id: "",
        logo: ""
      },
      tags: []
    }
  }),
  beforeMount() {},
  methods: {
    validateSubmission() {
      // TODO: Check if file has been uploaded

      this.submitStatus.submitted = true;

      this.$validator.validateAll().then(result => {
        if (result) {
          alert("TODO: send data");

          // TODO: send data

          console.log(this.submitJobData);

          // Set submit status
          this.submitStatus.success = true;
          return;
        }

        alert("Correct the errors!");
        this.submitStatus.error = true;
      });
    },
    resetForm() {},
    applyUrlIsFocused(val) {
      this.submitJobData.applyEmail = null;
      this.submitJobData.applyMode = "applyUrl";
    },
    applyEmailIsFocused(val) {
      this.submitJobData.applyUrl = null;
      this.submitJobData.applyMode = "applyEmail";
    },
    companyLogoUploadSuccess(file, response) {
      console.log(file);
      console.log(response);

      let fileSrc = file.dataURL;
      this.companyInformation.logoSrc = fileSrc;
    },
    uncheck(val) {
      if (val === this.previouslySelectedPackage) {
        this.submitJobData.packageInfo = false;
      }
      this.previouslySelectedPackage = this.submitJobData.packageInfo;
    },
    showPreview() {
      this.$modal.show("job-preview");
    },
    hidePreview() {
      this.$modal.hide("job-preview");
    }
  },
  watch: {
    "submitJobData.featured"(val) {
      if (val === true && this.submitJobData.hasBrandColour) {
        this.submitJobData.hasBrandColour = false;
      }
    },
    "submitJobData.hasBrandColour"(val) {
      if (val === true && this.submitJobData.featured) {
        this.submitJobData.featured = false;
      }
    },
    "submitJobData.staysOnTopFor1Week"(val) {
      if (val === true && this.submitJobData.staysOnTopFor1Month) {
        this.submitJobData.staysOnTopFor1Month = false;
      }
    },
    "submitJobData.staysOnTopFor1Month"(val) {
      if (val === true && this.submitJobData.staysOnTopFor1Week) {
        this.submitJobData.staysOnTopFor1Week = false;
      }
    },
    submitJobData: {
      handler(val) {
        let backgroundColour = !val.hasBrandColour ? "#ffffff" : val.colour;

        this.job = {
          colour: backgroundColour,
          featured: val.featured,
          hasLogo: val.showCompanyLogo,
          job: {
            name: val.position,
            pay: val.salary,
            type: val.type,
            seniority_level: val.seniorityLevel,
            functions: val.functions,
            summary: val.summary
          },
          company: {
            name: val.companyName,
            logo: this.companyInformation.logoSrc
          },
          tags: []
        };
      },
      deep: true,
      immediate: true
    }
  },
  $_veeValidate: {
    // value getter
    value() {
      return this.$el.value;
    },
    // name getter
    name() {
      return this.name;
    }
  }
};
</script>

<style lang="scss" scoped>
.submit__a__job {
  .submit_job__sidebar {
    display: grid;
    grid-template-columns: 1fr 0.4fr;
    grid-column-gap: var(--gutter);
  }
}

.submit__grid__layout {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: var(--gutter);
}

.apply__instructions {
  border-radius: 5px;
  padding: var(--gutter);
  background: rgba(0, 0, 0, 0.03);
  width: 100%;
  grid-column: 1 / 3;

  .or__text {
    margin: var(--gutter) auto;
    width: 40px;
    height: 40px;
    background: var(--color-dark);
    color: var(--color-white);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    font-weight: 700;
    text-transform: uppercase;
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
  margin: var(--gutter) 0;

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

  &.error__apply__wrapper {
    background-color: var(--response-background-error);
    grid-template-columns: 50px 1fr;

    .icon__wrapper {
      .icon {
        width: 50px;
        height: 50px;
        background: var(--color-red);
        box-shadow: 0 10px 20px var(--response-background-error-icon-shadow);
      }
    }

    .message {
      h4 {
        font-size: 20px;
        color: var(--color-red);
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

.company__logo {
  grid-column: 1/3;
}

.dropzone__company__logo {
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-gap: var(--gutter);

  .dropzone {
    background: var(--color-gray-light);
    border-radius: 5px;
    border: 3px dashed var(--color-light);

    &:hover {
      background: var(--color-gray);
    }

    .dropzone__content {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 36px;

      .icon {
        margin-right: 10px;
      }

      .text {
        font-family: var(--font-Poppins);
        font-weight: 500;
        text-transform: uppercase;
      }
    }
  }

  .preview__wrapper {
    .logo {
      max-width: 90%;
    }
  }
}

.payment__card__info {
  display: grid;
  grid-gap: var(--gutter);
  grid-template-columns: 1fr 0.5fr 0.5fr;

  .card__notes {
    grid-column: 1 / 5;

    .note {
      width: 100;
      display: flex;
      align-items: center;

      .icon {
        width: 40px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 10px;

        img {
          height: 30px;

          &.small {
            height: 18px;
          }
        }
      }

      .text {
        font-size: 12px;
        color: var(--color-light);
      }
    }
  }
}

.submit__buttons {
  .submit__job__button {
    margin-right: 10px;
  }
}

.preview__button {
  position: fixed;
  right: 50px;
  bottom: 50px;
}

.job__preview__modal {
  padding: var(--gutter);
  min-height: 300px;
}

@media (max-width: 1024px) {
}

@media (max-width: 768px) {
}

@media (max-width: 600px) {
}

@media (max-width: 450px) {
}
</style>

