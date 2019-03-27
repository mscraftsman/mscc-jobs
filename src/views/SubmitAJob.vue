<template>
  <div class="body__container submit__a__job__view">
    <section class="submit__a__job">
      <HeadingBreadcrumbs :breadcrumbs="breadcrumbs" pageTitle="Submit a job" :alertStatus="false"/>

      <div class="container__fw">
        <div class="submit_job__sidebar">
          <!-- SUBMIT JOB -->
          <div class="content__block">
            <div class="block__content submit__job__block">
              <h3>Job information</h3>
              <div class="body__content submit__grid__layout">
                <InputText
                  label="Position"
                  name="position"
                  v-model="submitJobData.position"
                  v-validate="'required'"
                  :message="errors.first('position')"
                />

                <InputText
                  label="Company Name"
                  name="companyName"
                  v-model="submitJobData.companyName"
                  v-validate="'required'"
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
                      >
                      <label for="is__remote__job">
                        <span></span>
                      </label>
                    </div>
                    <label class="checkbox__text small__heading" for="is__remote__job">
                      <InputText
                        label="This job is remote, but for applications in the region of:"
                        name="remoteRegions"
                        v-model="submitJobData.remoteRegions"
                        v-validate="(submitJobData.isRemote === true) ? 'required' : ''"
                        :message="errors.first('remoteRegions')"
                        :disabled="(submitJobData.isRemote === true) ? false : true"
                      />
                    </label>
                  </div>
                </div>
              </div>
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
    submitStatus: {
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
      companyName: null
    }
  }),
  beforeMount() {},
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

.submit__grid__layout {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: var(--gutter);
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

@media (max-width: 1024px) {
}

@media (max-width: 768px) {
}

@media (max-width: 600px) {
}

@media (max-width: 450px) {
}
</style>

