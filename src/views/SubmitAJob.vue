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
                          >
                            <div class="dropzone__content">
                              <img src="/img/utils/upload.svg" class="icon">
                              <div class="text">Upload your logo</div>
                            </div>
                          </vue-dropzone>
                        </div>

                        <div class="preview__wrapper">
                          <label>Preview</label>
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
                </div>
              </div>

              <button @click="validateSubmission()">Submit</button>
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
import InputUrl from "@/components/forms/InputUrl";

import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";

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
    JobBlock,
    InputText,
    InputTel,
    InputTextarea,
    InputEmail,
    InputEditor,
    InputNumeric,
    InputSelect,
    InputUrl,
    HeadingBreadcrumbs,
    vueDropzone: vue2Dropzone
  },
  computed: {},
  data: () => ({
    breadcrumbs: [
      {
        name: "Submit a job",
        path: "submit-job"
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
      logoFileName: null
    },
    companyImageStatus: {
      success: false,
      error: null,
      uploading: false
    },
    submitJobData: {
      position: null,
      companyName: null,
      isRemote: false,
      remoteRegion: null,
      primaryTag: null,
      extraTags: null,
      description: null,
      responsibilities: null,
      requirements: null,
      salary: null,
      howToApply: null,
      applyUrl: null,
      applyEmail: null,
      applyMode: "applyUrl",
      socialTwitter: null,
      socialFacebook: null,
      socialLinkedIn: null,
      email: null
    },
    CompanyLogoDropzoneOptions: {
      url: "https://httpbin.org/post",
      thumbnailWidth: 150,
      maxFilesize: 0.5,
      headers: { "My-Awesome-Header": "header value" },
      uploadMultiple: false,
      acceptedFiles: ".jpeg,.jpg,.png,.gif",
      maxFilesize: 1
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

          console.log(this.applicationData);

          // Set submit status
          this.submitStatus.success = true;
          return;
        }

        alert("Correct the errors!");
        this.submitStatus.error = true;
      });
    },
    handleCVUpload(file) {
      console.log("file upload triggered");

      // Resets alerts
      this.CVUploadStatus.error = null;
      this.CVUploadStatus.success = false;

      console.log(this.$refs);

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
          console.log(data);
          console.log(fileName);
          console.log(fileSize);
          console.log(fileType);

          let allowedUploadSize = 5242880;
          let allowedTypes = ["application/pdf"];

          if (!allowedTypes.includes(fileType)) {
            this.CVUploadStatus.error = "Incorrect file type.";
            return;
          }

          if (fileSize > allowedUploadSize) {
            this.CVUploadStatus.error = "File size is above 5 Mb.";
            return;
          }

          // TODO: Upload goes here and set status to true below
          if (fileSize < allowedUploadSize && allowedTypes.includes(fileType)) {
            // Set uploading information true
            this.CVUploadStatus.uploading = true;

            // TODO upload logic here
          }
        })
        .catch(e => {
          console.log(e);
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
    checkUrl() {
      if (
        this.submitJobData.socialTwitter &&
        this.submitJobData.socialTwitter.length
      ) {
        console.log({ url: { require_protocol: true } });

        return { url: { require_protocol: true } };
      } else {
        return "";
      }
    }
  },
  watch: {},
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
  }
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

