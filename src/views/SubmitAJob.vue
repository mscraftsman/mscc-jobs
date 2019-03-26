<template>
  <div class="body__container submit__a__job__view">
    <section class="submit__a__job">
      <HeadingBreadcrumbs :breadcrumbs="breadcrumbs" pageTitle="Submit a job" :alertStatus="false"/>

      <div class="container__fw">
        <div class="submit_job__sidebar">
          <!-- SUBMIT JOB -->
          <div class="job__block">
            <div class="block__content">
              <div class="body__content"></div>
            </div>
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
import SocialSharingComponent from "@/components/shared/SocialSharingComponent";
import JobBlock from "@/components/jobs/JobBlock";
import LoaderComponent from "@/components/shared/LoaderComponent";
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
    HeadingBreadcrumbs
  },
  computed: {},
  data: () => ({
    breadcrumbs: [
      {
        name: "Submit a job",
        path: "submit-job"
      }
    ],
    url: null,
    jobId: null,
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
      agree: false
    }
  }),
  beforeMount() {
    this.url = window.location.pathname;
  },
  methods: {
    validateJobApplication() {
      // TODO: Check if file has been uploaded

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
    resetForm() {}
  },
  watch: {}
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

  &.error__upload__wrapper {
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

