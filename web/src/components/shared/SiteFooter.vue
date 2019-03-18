<template>
  <footer>
    <div class="container__fw">
      <div class="upper__section">
        <div class="logo__wrapper">
          <img src="@/assets/img/logo-white.svg" alt>
        </div>
        <div class="logo">
          <h3>Mauritius Software Craftsmanship Community</h3>
          <h4>Jobs In Tech</h4>
        </div>

        <div class="social__media">
          <a href="#" class="icon">
            <img src="@/assets/img/social/twitter.svg" alt>
          </a>
          <a href="#" class="icon">
            <img src="@/assets/img/social/facebook.svg" alt>
          </a>
          <a href="#" class="icon">
            <img src="@/assets/img/social/linkedin.svg" alt>
          </a>
          <a href="#" class="icon">
            <img src="@/assets/img/social/github.svg" alt>
          </a>
          <a href="#" class="icon">
            <img src="@/assets/img/social/googleplus.svg" alt>
          </a>
          <a href="#" class="icon">
            <img src="@/assets/img/social/yt.svg" alt>
          </a>
        </div>
      </div>

      <div class="lower__section">
        <nav class="footer__nav">
          <ul>
            <li v-for="(item, index) in items" :key="index">
              <router-link :to="item.path">{{item.text}}</router-link>
            </li>
          </ul>
        </nav>

        <div class="signature">
          Crafted with
          <span>
            <img src="@/assets/img/heart.svg" alt>
          </span> in Mauritius
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          path: { name: "about" },
          text: "About"
        },
        {
          path: { name: "jobs" },
          text: "Jobs"
        },
        {
          path: { name: "privacyPolicy" },
          text: "Privacy Policy"
        },
        {
          path: { name: "termsOfUse" },
          text: "Terms of Use"
        },
        {
          path: { name: "contact" },
          text: "Contact"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
footer {
  background: var(--color-black);
  padding: calc(var(--gutter) * 2) 0;

  .upper__section {
    text-align: center;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    padding-bottom: var(--gutter);

    .logo__wrapper {
      img {
        width: 60px;
        margin-bottom: 10px;
      }
    }

    .logo {
      margin-bottom: var(--gutter);

      h3 {
        text-transform: uppercase;
        color: var(--color-white);
        font-size: 16px;
        margin: 0;
      }

      h4 {
        color: rgba(255, 255, 255, 0.5);
        text-transform: uppercase;
        font-style: normal;
        font-weight: 300;
        font-size: 12px;
        line-height: normal;
        text-align: center;
        letter-spacing: 0.38em;
        margin: 0;
      }
    }

    .social__media {
      .icon {
        margin-right: 15px;

        img {
          height: 20px;
          transition: all 0.1s ease-in-out;
        }

        &:hover {
          img {
            transform: scale(1.3);
          }
        }
      }
    }
  }

  .lower__section {
    display: grid;
    grid-template-columns: 1fr 0.5fr;
    padding-top: var(--gutter);

    .footer__nav {
      ul {
        padding: 0;
        margin: 0;

        li {
          list-style-type: none;
          display: inline;
          padding: 0;
          margin: 0;

          a {
            margin-right: var(--gutter);
            color: var(--color-white);
            font-style: normal;
            font-weight: 300;
            font-size: 13px;
            line-height: normal;
            text-decoration: none;
          }
        }
      }
    }

    .signature {
      text-align: right;
      color: var(--color-white);
      font-size: 13px;
    }
  }
}

@media (max-width: 768px) {
  footer {
    .lower__section {
      grid-template-columns: 1fr;
      .footer__nav {
        margin-bottom: var(--gutter);

        ul {
          li {
            display: block;
            text-align: center;

            a {
              display: block;
            }
          }
        }
      }

      .signature {
        text-align: center;
      }
    }
  }
}
</style>
