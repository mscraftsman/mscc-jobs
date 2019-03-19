import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

const state = {
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
  ],
  jobsGroupedByCompany: []
};

const namespaced = true;

export default {
  namespaced,
  state,
  actions,
  getters,
  mutations
};
