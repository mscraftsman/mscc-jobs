<template>
  <div class="views job-listing__view">
    <HeadingBreadcrumbs
      :breadcrumbs="breadcrumbs"
      :pageTitle="pageTitle"
      :alertStatus="alertStatus"
    />

    <div class="container__fw">
      <div class="jobs__listing">
        <div class="jobs">
          <JobBlock v-for="(job, index) in jobs" :jobData="job" :key="index"/>

          <div class="load__more-jobs">
            <button class="load_more__button button__global outline blue">Load more</button>
          </div>
        </div>
        <div class="sidebar">
          <div class="sidebar__block">
            <div class="sidebar__wrapper"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import HeadingBreadcrumbs from "@/components/shared/HeadingBreadcrumbs";
import JobBlock from "@/components/jobs/JobBlock";

export default {
  components: {
    HeadingBreadcrumbs,
    JobBlock
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
      jobs: [
        {
          colour: "#004a8f",
          featured: false,
          hasLogo: true,
          job: {
            name: "Service Delivery Manager",
            salary: "Rs 50, 000 - 60, 000",
            url: "service-delivery-manager-lsl-2019",
            type: "Full time",
            pay: "Rs 18 000 to Rs 30 000",
            seniority_level: "Entry",
            functions: "Project Management, Information Technology",
            summary:
              "Codelitt is looking for a Senior .NET Developer with experience in building and maintaining web applications. You will be responsible for designing, developing and coordinating the work with the team. While this is a remote position, there are often meetings at 9 a.m. ET. Something to take into consideration. Mountain Time, Central Time, or Eastern Time preferred."
          },
          company: {
            name: "Mauritius Commercial Bank",
            url: "lsl-digital",
            logo: "lsldigital.svg"
          },
          tags: [
            {
              name: "GoLang",
              url: "golang"
            },
            {
              name: "Front End",
              url: "front-end"
            },
            {
              name: "UX",
              url: "ux"
            },
            {
              name: "UI",
              url: "ui"
            }
          ]
        },
        {
          colour: "#fd5f00",
          featured: false,
          hasLogo: true,
          job: {
            name: "Front End Software Engineer",
            salary: "Rs 50, 000 - 60, 000",
            url: "service-delivery-manager-lsl-2019"
          },
          company: {
            name: "Mauritius Commercial Bank",
            url: "lsl-digital",
            logo: "lsldigital.svg"
          },
          tags: [
            {
              name: "GoLang",
              url: "golang"
            },
            {
              name: "Front End",
              url: "front-end"
            },
            {
              name: "UX",
              url: "ux"
            },
            {
              name: "UI",
              url: "ui"
            }
          ]
        },
        {
          colour: "#EEEEEE",
          featured: true,
          hasLogo: true,
          job: {
            name: "Service Delivery Manager",
            salary: "Rs 50, 000 - 60, 000",
            url: "service-delivery-manager-lsl-2019"
          },
          company: {
            name: "Mauritius Commercial Bank",
            url: "lsl-digital",
            logo: "lsldigital.svg"
          },
          tags: [
            {
              name: "GoLang",
              url: "golang"
            },
            {
              name: "Front End",
              url: "front-end"
            },
            {
              name: "UX",
              url: "ux"
            },
            {
              name: "UI",
              url: "ui"
            }
          ]
        },
        {
          featured: false,
          hasLogo: true,
          job: {
            name: "Service Delivery Manager",
            salary: "Rs 50, 000 - 60, 000",
            url: "service-delivery-manager-lsl-2019"
          },
          company: {
            name: "Mauritius Commercial Bank",
            url: "lsl-digital",
            logo: "lsldigital.svg"
          },
          tags: [
            {
              name: "GoLang",
              url: "golang"
            },
            {
              name: "Front End",
              url: "front-end"
            },
            {
              name: "UX",
              url: "ux"
            },
            {
              name: "UI",
              url: "ui"
            }
          ]
        },
        {
          featured: false,
          hasLogo: false,
          job: {
            name: "Senior Automation Engineer",
            salary: "Rs 50, 000 - 60, 000",
            url: "service-delivery-manager-lsl-2019"
          },
          company: {
            name: "Mauritius Commercial Bank",
            url: "lsl-digital",
            logo: "lsldigital.svg"
          },
          tags: [
            {
              name: "GoLang",
              url: "golang"
            },
            {
              name: "Front End",
              url: "front-end"
            },
            {
              name: "UX",
              url: "ux"
            },
            {
              name: "UI",
              url: "ui"
            }
          ]
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.job-listing__view {
  background: var(--color-bg);
  padding-bottom: calc(var(--gutter) * 2);
}

.jobs__listing {
  display: grid;
  grid-template-columns: 1fr 350px;
  grid-gap: calc(var(--gutter) + 10px);

  .jobs {
    .load__more-jobs {
      margin-top: calc(var(--gutter) * 2);
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .sidebar__block {
    .sidebar__wrapper {
      background: var(--color-white);
      box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.1);
      padding: var(--gutter);
    }
  }
}

@media (max-width: 1024px) {
  .jobs__listing {
    grid-template-columns: 1fr;
  }
}
</style>

