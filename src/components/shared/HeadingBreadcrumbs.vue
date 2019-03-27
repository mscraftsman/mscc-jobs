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
                <router-link v-if="item" :to="{ name: item.path }">{{
                  item.name
                }}</router-link>
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
            <button class="submit__job__button button__global blue">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
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
