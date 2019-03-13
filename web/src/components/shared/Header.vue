<template>
  <header class="header">
    <div class="container__fw grid__layout">
      <nav class="side__menu">
        <ul>
          <li>
            <router-link to="/" class="home">Jobs In Tech</router-link>
          </li>
          <li>
            <router-link :to="{name: 'about'}">About</router-link>
          </li>
          <li>
            <router-link :to="{name: 'jobs'}">Jobs</router-link>
          </li>
        </ul>
      </nav>
      <div class="logo">
        <router-link to="/" class="logo-img">
          <img src="@/assets/img/logo.svg" alt="Jobs In Tech logo">
        </router-link>
      </div>
      <div class="submit__job">
        <router-link
          class="submit__job__button button__global yellow"
          :to="{name: 'submitJob'}"
        >Submit A Job</router-link>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Navigation"
};
</script>


<style lang="scss" scoped>
.header {
  background: var(--color-white);
  box-shadow: 0px 5px 20px rgba(31, 32, 65, 0.05);
  position: fixed;
  top: 0;
  width: 100%;

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
          color: var(--color-light);
          text-transform: uppercase;
          text-decoration: none;

          &.home {
            font-weight: 700;
            color: var(--color-dark);
          }
        }
      }
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
  }
}
</style>
