<template>
  <div class="body__container generic__view">
    <HeadingBreadcrumbs :breadcrumbs="breadcrumbs" pageTitle="Not Found" :alertStatus="false"/>

    <div class="container__fw">
      <div class="block__content styled__content">
        <div class="body__content">
          <router-link :to="{name: 'home'}" class="button__global blue override__visbility">
            <div class="text">Return to home</div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import HeadingBreadcrumbs from "@/components/shared/HeadingBreadcrumbs";

export default {
  components: {
    HeadingBreadcrumbs
  },
  data() {
    return {
      breadcrumbs: [
        {
          name: "Not Found",
          path: "notFound"
        }
      ]
    };
  },
  metaInfo: {
    title: "Not Found"
  }
};
</script>

<style lang="scss" scoped>
</style>
