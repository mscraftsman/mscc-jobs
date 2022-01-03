<template>
  <div class="breadcrumbs__title__container">
    <div class="container__fw">
      <div class="breadcrumbs__alert__grid">
        <div class="breadcrumbs__title">
          <nav class="breadcrumbs">
            <ul>
              <li>
                <router-link :to="{ name: 'home' }">Home</router-link>
              </li>
              <li v-for="(item, index) in breadcrumbs" :key="index">
                <router-link v-if="item" :to="{ name: item.path }">
                  {{ item.name }}
                </router-link>
              </li>
            </ul>
          </nav>
          <div class="page__title">
            <h2 v-if="pageTitle">{{ pageTitle }}</h2>
          </div>
        </div>
        <div class="alert__wrapper" v-if="alertStatus">
          <div class="icon">
            <img src="@/assets/img/enveloppe.svg" alt />
          </div>
          <div class="text">
            <h3>Do you want to be notified?</h3>
            <button
              class="submit__job__button button__global blue"
              aria-label="Submit your email address to receive job offers"
              @click="showSubscribeModal()"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <modal
        name="subscribe"
        :adaptive="true"
        height="auto"
        :scrollable="true"
        width="600px"
        :clickToClose="false"
      >
        <div class="subscribe__modal modal">
          <h3>
            <img src="@/assets/img/enveloppe.svg" class="subcribe__icon" />
            Subscribe to this job alert
          </h3>
          <button
            class="close__modal"
            aria-label="Close the dialog"
            @click="hideSubscribeModal()"
          >
            <img
              src="/img/utils/close.svg"
              alt="Close the dialog"
              title="Close the dialog"
            />
          </button>

          <p>
            To receive email notifications whenever a new job opportunity
            becomes availailable, please fill in the form below and hit
            subscribe.
          </p>

          <form @submit.prevent="subscribeUser()">
            <div class="form__field">
              <InputText
                label="First Name"
                name="firstName"
                v-model="subscribeData.firstName"
                v-validate="'required'"
                :message="errors.first('firstName')"
              />
              <InputText
                label="Last Name"
                name="lastName"
                v-model="subscribeData.lastName"
                v-validate="'required'"
                :message="errors.first('lastName')"
              />

              <InputEmail
                label="Email"
                name="email"
                v-model="subscribeData.email"
                :full="true"
                v-validate="'required|email'"
                :message="errors.first('email')"
              />
              <div :class="['input__block', 'full']">
                <div class="checkbox__styled">
                  <div class="checkbox__accept">
                    <input
                      type="checkbox"
                      required
                      id="accept__job__conditions"
                      v-model="subscribeData.agree"
                    />
                    <label for="accept__job__conditions">
                      <span />
                    </label>
                  </div>
                  <label class="checkbox__text" for="accept__job__conditions"
                    >I agree to receive notifications through the email address
                    provided above.</label
                  >
                </div>
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
                    <img src="@/assets/img/success.svg" alt="Success" />
                  </div>
                </div>
                <div class="message">
                  <h4>Success !</h4>
                  <p>Your application has been sent !</p>
                </div>
              </div>

              <div
                :class="['input__block', 'full', 'response__message', 'error']"
                v-if="submitStatus.error"
              >
                <div class="icon__wrapper">
                  <div class="icon">
                    <img src="@/assets/img/error_white.svg" alt="Error" />
                  </div>
                </div>
                <div class="message">
                  <h4>Error !</h4>
                  <p>There is an error in your subscription</p>
                </div>
              </div>

              <div :class="['input__block', 'full', 'submit__buttons']">
                <button
                  type="reset"
                  class="reset__subscription__button button__global yellow override__visbility"
                  @click="resetForm()"
                >
                  <span class="text">Reset</span>
                </button>

                <button
                  type="button"
                  class="submit__subscription__button button__global green override__visbility"
                  @click="subscribeUser()"
                  :disabled="subscribeData.agree === false"
                >
                  <div class="icon">
                    <div class="loading" />
                  </div>
                  <span class="text">Subscribe</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </modal>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import InputText from "@/components/forms/InputText";
import InputEmail from "@/components/forms/InputEmail";
import { SITE_ID, SUBSCRIBE_ENDPOINT } from "@/store/constants";

export default {
  components: {
    InputText,
    InputEmail
  },
  props: {
    breadcrumbs: {
      type: Array,
      default: () => {
        return [];
      }
    },
    pageTitle: {
      type: String,
      default: "Jobs In Tech"
    },
    alertStatus: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      submitStatus: {
        error: false,
        success: false
      },
      subscribeData: {
        firstName: null,
        lastName: null,
        email: null,
        agree: false
      }
    };
  },
  methods: {
    showSubscribeModal() {
      this.$modal.show("subscribe");
    },
    hideSubscribeModal() {
      this.$modal.hide("subscribe");
    },
    subscribeUser() {
      let self = this;
      this.$validator.validateAll().then(result => {
        if (result) {
          axios
            .post(SUBSCRIBE_ENDPOINT, {
              name:
                this.subscribeData.firstName +
                " " +
                this.subscribeData.lastName,
              emailAddress: this.subscribeData.email,
              password: null,
              live: 0,
              jobtype: 3,
              contracttype: 2,
              radius: 50,
              siteid: SITE_ID.replace("/sites/", ""),
              keywords:
                "Dev, Engineer, Javascript, React, Full Stack, Senior, Backend, Python, Web Dev, PHP, Front End, Angular, Architecture",
              Locations: [
                {
                  name: "Mauritius",
                  Latitude: -20.348404,
                  Longitude: 57.55215200000001,
                  iscountry: true
                }
              ]
            })
            .then(function(response) {
              self.submitStatus.success = true;
              self.submitStatus.error = false;
            })
            .catch(function(error) {
              self.submitStatus.success = false;
              self.submitStatus.error = true;
            })
            .then(function() {
              // console.log(self.responseCode);
            });

          return;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.breadcrumbs__title__container {
  padding: calc(var(--gutter) * 2) 0;
  padding-bottom: calc(var(--gutter) * 2);

  .breadcrumbs__alert__grid {
    display: grid;
    grid-template-columns: 1fr 350px;
  }

  .breadcrumbs {
    ul {
      &,
      li {
        padding: 0;
        margin: 0;
        list-style-type: none;
        text-indent: 0;
        display: inline-block;
        margin-right: calc(var(--gutter) + 10px);
        position: relative;

        a {
          color: var(--color-light);
          text-transform: capitalize;
          text-decoration: none;
          font-family: var(--font-Roboto);
          font-weight: 300;
          font-size: 16px;
        }
      }

      li {
        &:after {
          content: url("/img/utils/arrow.svg");
          position: absolute;
          padding-left: 13px;
        }

        &:last-child {
          &:after {
            display: none;
          }
        }
      }
    }
  }

  .page__title {
    h2 {
      font-family: var(--font-Poppins);
      font-style: normal;
      font-weight: 500;
      font-size: 36px;
      line-height: normal;
      margin: 0 0 10px 0;
      color: var(--site-text-color);
    }
  }

  .alert__wrapper {
    display: grid;
    grid-template-columns: 100px 1fr;
    grid-gap: var(--gutter);

    .icon {
      img {
        width: 100%;
      }
    }

    .text {
      h3 {
        font-style: normal;
        font-weight: bold;
        font-size: 13px;
        line-height: normal;
        text-transform: uppercase;
        margin-top: 0;
        color: var(--color-light);
      }
    }
  }
}

.form__field {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: var(--gutter);
}

.submit__buttons {
  text-align: right;
}

.reset__subscription__button {
  margin-right: 10px;
}

@media (max-width: 1024px) {
  .breadcrumbs__title__container {
    padding-bottom: calc(var(--gutter) * 1);

    .breadcrumbs__alert__grid {
      grid-template-columns: 1fr;
    }

    .page__title {
      h2 {
        font-size: 32px;
      }
    }

    .alert__wrapper {
      display: none;
    }
  }
}
</style>
