<template>
  <header class="header">
    <div class="container__fw grid__layout">
      <nav class="side__menu">
        <ul>
          <li v-for="(item, index) in items" :key="index">
            <router-link :class="item.class" :to="{ name: item.path }">{{
              item.name
            }}</router-link>
          </li>
        </ul>
        <button class="mobile__menu__button" @click="activateMobileMenu">
          <img src="@/assets/img/menu.svg" alt />
        </button>
      </nav>
      <div class="logo">
        <router-link to="/" class="logo-img">
          <LogoComponent />
          <!-- <img src="@/assets/img/logo.svg" alt="Jobs In Tech logo" /> -->
        </router-link>
      </div>
      <div class="submit__job">
        <router-link
          class="submit__job__button button__global yellow"
          :to="{ name: 'submitJob' }"
          >Submit A Job</router-link
        >
      </div>
    </div>
    <MobileMenu :items="items" />
  </header>
</template>

<script>
import MobileMenu from "@/components/shared/MobileMenu";
import LogoComponent from "@/components/shared/LogoComponent.vue";
export default {
  name: "Navigation",
  components: {
    MobileMenu,
    LogoComponent
  },
  data() {
    return {
      items: [
        {
          name: "Jobs In Tech",
          path: "home",
          class: "home"
        },
        {
          name: "About",
          path: "about"
        },
        {
          name: "Jobs",
          path: "jobs"
        }
      ]
    };
  },
  methods: {
    activateMobileMenu() {
      this.$store.dispatch("shared/setMenuStatus");
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  background: var(--header-background-color);
  box-shadow: 0px 5px 20px var(--header-box-shadow-color);
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 20;

  .grid__layout {
    display: grid;
    grid-template-columns: 1fr 0.2fr 1fr;
    grid-template-rows: 60px;
  }

  .side__menu {
    display: flex;
    align-items: center;

    ul {
      &,
      li {
        padding: 0;
        margin: 0;
        list-style-type: none;
        text-indent: 0;
        display: inline-block;
        margin-right: calc(var(--gutter) + 10px);

        a {
          color: var(--header-text-color);
          text-transform: uppercase;
          text-decoration: none;

          &.home {
            font-weight: 700;
            color: var(--header-text-color-dark);
          }

          &.router-link-active {
            font-weight: 700;
            color: var(--header-text-color-active);

            &.home {
              font-weight: 700;
              color: var(--header-text-color-dark);
            }
          }
        }
      }
    }

    .mobile__menu__button {
      height: 60px;
      border: 0;
      background: transparent;
      padding-top: 10px;
      width: 60px;
      display: none;
    }
  }

  .logo {
    text-align: center;

    .logo-img {
      margin: 0 auto;
      display: inline-block;
      padding-top: 8px;

      img {
        height: 45px;
      }
    }
  }

  .submit__job {
    text-align: right;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    .submit__job__button {
    }
  }
}

@media (max-width: 1024px) {
  .header {
    .submit__job {
      .button__global {
        padding-left: 15px;
        padding-right: 15px;
      }
    }

    .side__menu {
      ul {
        display: none;
      }
      .mobile__menu__button {
        display: block;
      }
    }
  }
}
</style>
