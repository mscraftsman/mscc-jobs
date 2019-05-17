<template>
  <div class="body__container generic__view">
    <transition name="fade" mode="out-in">
      <LoaderComponent v-if="loading"/>
      <template v-else>
        <HeadingBreadcrumbs :breadcrumbs="breadcrumbs" pageTitle="Generic" :alertStatus="false"/>
        <div class="container__fw">
          <div class="block__content styled__content">
            <div class="body__content">
              <h2>Generic page content title</h2>

              <p>content goes here</p>
            </div>
          </div>
        </div>
      </template>
    </transition>
  </div>
</template>

<script>
import HeadingBreadcrumbs from "@/components/shared/HeadingBreadcrumbs";
import LoaderComponent from "@/components/shared/LoaderComponent";

import { CONTENT_ENDPOINT, GET_ARTICLE_ENDPOINT } from "@/store/constants.js";
import axios from "axios";

export default {
  components: {
    HeadingBreadcrumbs,
    LoaderComponent
  },
  data() {
    return {
      breadcrumbs: [
        {
          name: "Generic",
          path: "about"
        }
      ],
      pageId: null,
      loading: true,
      content: null
    };
  },
  methods: {
    getData() {
      return new Promise((resolve, reject) => {
        axios
          .get(GET_ARTICLE_ENDPOINT + "/" + this.pageId)
          .then(function(response) {
            let data = response.data;
            console.log(data);
            resolve(data);
          })
          .catch(function(error) {
            console.error(error);
            reject(error);
          });
      });
    }
  },
  beforeMount() {
    this.pageId = this.$route.params.id;
    this.url = this.$route.params.pathMatch;

    this.getData()
      .then(function(response) {
        console.log(response);
        this.loading = false; // Set loading to false

        // Todo: Set content
        this.content = response; // TBC
      })
      .catch(function(error) {
        console.error(error);

        if (error) {
          this.$router.push({ name: "notFound" });
        }
      });
  },
  metaInfo: {
    title: "Generic"
  }
};
</script>

<style lang="scss" scoped>
</style>
