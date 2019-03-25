<template>
  <div :class="['mobile__menu', { active: menu } ]">
    <div class="close__button">
      <button class="close" @click="setMenu">
        <img src="@/assets/img/close.svg" alt>
      </button>
    </div>
    <div class="menu">
      <nav>
        <ul>
          <li v-for="(item, index) in items" :key="index">
            <router-link :class="item.class" :to="{ name: item.path }">{{item.name}}</router-link>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    items: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  computed: {
    ...mapGetters({
      menu: "shared/getMenuState"
    })
  },
  methods: {
    setMenu() {
      this.$store.dispatch("shared/setMenuStatus");
    }
  }
};
</script>

<style lang="scss" scoped>
.mobile__menu {
  min-height: 100vh;
  width: 230px;
  position: fixed;
  left: 0;
  top: 0;
  background: var(--color-white);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
  transform: translateX(-230px);
  transition: all 0.2s ease-in-out;
  z-index: 10;

  &.active {
    transform: translateX(0px);
  }

  .close__button {
    top: 15px;
    right: 15px;
    position: absolute;

    .close {
      height: 60px;
      width: 60px;
      background: var(--color-yellow);
      border: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 35px;
      box-shadow: 0px 4px 18px rgba(255, 228, 0, 0.7);

      img {
        width: 20px;
      }
    }
  }

  .menu {
    top: 80px;
    position: relative;

    nav {
      ul {
        &,
        li {
          padding: 0;
          margin: 0;
          list-style-type: none;
          text-indent: 0;
          display: block;

          a {
            color: var(--color-light);
            text-transform: uppercase;
            text-decoration: none;
            padding: 20px var(--gutter);
            border-bottom: 1px solid var(--color-gray-light);
            display: block;

            &.home {
              font-weight: 700;
              color: var(--color-dark);
            }
          }
        }
      }
    }
  }
}
</style>

