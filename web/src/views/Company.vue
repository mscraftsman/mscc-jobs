<template>
  <div class="body__container">
    <div class="header__section" style="background: url('/img/jobs/companies/lsldigital-bg.jpg')">
      <div class="container__fw">
        <h2>Mauritius Commercial Bank</h2>
      </div>
    </div>
    <section class="company__information">
      <div class="container__fw">
        <div class="block__content">
          <div class="company__logo">
            <img src="/img/jobs/companies/lsldigital.svg" alt class="logo">
          </div>
          <div class="company__details">
            <div class="data">
              <label>Founded</label>
              <div class="data__content">Baie Du Tombeau</div>
            </div>

            <div class="data">
              <label>Phone</label>
              <div class="data__content">Baie Du Tombeau</div>
            </div>

            <div class="data">
              <label>Company Size</label>
              <div class="data__content">Baie Du Tombeau</div>
            </div>

            <div class="data">
              <label>Type</label>
              <div class="data__content">Baie Du Tombeau</div>
            </div>

            <div class="data">
              <label>Industry</label>
              <div class="data__content">Baie Du Tombeau</div>
            </div>

            <div class="data">
              <label>Website</label>
              <div class="data__content">Baie Du Tombeau</div>
            </div>

            <div class="data">
              <label>Address</label>
              <div class="data__content">Baie Du Tombeau</div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="about__location">
      <div class="container__fw">
        <div class="about__location__block">
          <div class="about">
            <div class="block__content">
              <h3>About Company</h3>
              <div class="body__content">
                <p>LSL Digital was created out of need to fulfill the growing demand of La Sentinelle for development and infrastructure support.</p>
                <p>Since 2018, LSL Digital has started serving customers beyond the walls of La Sentinelle Group. Today, LSL Digital positions itself as a solutions provider and assists businesses towards their digital transformation.</p>
                <p>We started operations in 2015 and we're today a 17-members staff team; comprising of sales, development & operations. The main objectives of the division being to develop and sustain digital services & products for the group, while also cond.</p>
              </div>
            </div>
          </div>

          <div class="location">
            <div class="block__content">
              <h3>Location</h3>
              <div class="body__content">some location</div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="open__position">
      <div class="container__fw">
        <h2>Open positions</h2>
      </div>
    </section>
  </div>
</template>


<script>
export default {};
</script>

<style lang="scss" scoped>
.header__section {
  padding: calc(var(--gutter) * 6) 0 calc(var(--gutter) * 10);
  background: var(--color-dark);
  background-position: center center !important;
  background-size: cover !important;
  text-align: center;
  position: relative;

  &:before {
    content: "";
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    position: absolute;
    left: 0;
    top: 0;
  }

  h2 {
    color: var(--color-white);
    margin: 0;
    font-style: normal;
    font-weight: 500;
    font-size: 60px;
    line-height: normal;
    z-index: 10;
    position: relative;
  }
}

.company__information {
  margin-top: calc(var(--gutter) * 6 * -1);
  position: relative;

  .block__content {
    padding: calc(var(--gutter) * 2);
    display: grid;
    grid-template-columns: 0.8fr 3fr;
    grid-gap: var(--gutter);

    .company__logo {
      .logo {
        width: 90%;
      }
    }

    .company__details {
      display: grid;
      grid-template-columns: repeat(4, 1fr);

      .data {
        label {
          color: var(--color-light);
          text-transform: uppercase;
          font-weight: 500;
          font-size: 11px;
          margin-bottom: 5px;
        }

        .data__content {
          font-family: var(--font-Roboto);
          font-weight: 300;
        }
      }
    }
  }
}
</style>
