<template>
  <div class="body__container generic__view">
    <transition name="fade" mode="out-in">
      <LoaderComponent v-if="loading" />
      <div v-else>
        <HeadingBreadcrumbs
          :breadcrumbs="breadcrumbs"
          :pageTitle="contentData.title"
          :alertStatus="false"
        />

        <div class="container__fw">
          <div class="block__content styled__content">
            <div class="body__content">
              <div
                v-if="contentData.introText"
                v-html="contentData.introText"
              />
              <div v-if="contentData.article" v-html="contentData.article" />
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import HeadingBreadcrumbs from "@/components/shared/HeadingBreadcrumbs";
import LoaderComponent from "@/components/shared/LoaderComponent";
import { mapGetters } from "vuex";

import axios from "axios";
import {
  GET_ARTICLE_ENDPOINT,
  ARTICLES_ENDPOINT,
  ARTICLE_ENDPOINT,
  SITE_ID
} from "@/store/constants.js";

export default {
  components: {
    HeadingBreadcrumbs,
    LoaderComponent
  },
  computed: {
    ...mapGetters({
      getContentFullById: "shared/getContentFullById"
    }),
    getContent() {
      return this.getContentFullById(this.$route.path);
    }
  },
  data: () => ({
    contentData: {},
    breadcrumbs: [],
    pageId: null,
    url: null,
    loading: true
  }),
  beforeMount() {
    this.pageId = this.$route.params.id;
    this.url = this.$route.path;

    // Get generic content
    this.fetchContentData();
  },
  methods: {
    fetchContentData() {
      // FYR https://stackoverflow.com/questions/40165766/returning-promises-from-vuex-actions

      if (typeof this.getContent === "undefined") {
        this.$store
          .dispatch("shared/getContentFromApi", {
            value: this.$route.path,
            site: SITE_ID
          })
          .then(response => {
            this.contentData = response;
            this.prepareBreadcrumbs(response);
            this.loading = false;
          })
          .catch(error => {
            // console.error(error);
            this.$router.push({ name: "notFound" });
          });
      } else {
        this.contentData = this.getContent;
        this.prepareBreadcrumbs(this.getContent);
        this.loading = false;
      }
    },
    prepareBreadcrumbs(data) {
      // console.log(data);
      this.breadcrumbs = [{ path: data.slug, name: data.title }];
    }
  },
  metaInfo() {
    let title =
      this.contentData && this.contentData.title
        ? this.contentData.title
        : "Generic";
    return {
      title: title
    };
  }
};
</script>

<style lang="scss" scoped></style>
