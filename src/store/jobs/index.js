import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

const state = {
  jobs: [],
  jobsFull: {},
  getLatestJobsStatus: false,
  jobsGroupedByCompanyId: {},
  jobsGroupedByProfileId: {},
  tech_stack: [
    {
      logo: "vuejs.png",
      text: "Vue.js",
      value: "Vue.js"
    },
    {
      logo: "golang.png",
      text: "GoLang",
      value: "GoLang"
    },
    {
      logo: "grpc.png",
      text: "GRPC",
      value: "GRPC"
    },
    {
      logo: "docker.png",
      text: "Docker",
      value: "Docker"
    },
    {
      logo: "aws.png",
      text: "AWS",
      value: "AWS"
    },
    {
      logo: "aws.png",
      text: "Technology X",
      value: "Technology X"
    },
    {
      logo: "aws.png",
      text: "Technology Y",
      value: "Technology Y"
    },
    {
      logo: "aws.png",
      text: "Technology A",
      value: "Technology A"
    },
    {
      logo: "aws.png",
      text: "Technology B",
      value: "Technology B"
    },
    {
      logo: "aws.png",
      text: "Technology C",
      value: "Technology C"
    },
    {
      logo: "aws.png",
      text: "Technology D",
      value: "Technology D"
    },
    {
      logo: "aws.png",
      text: "Technology E",
      value: "Technology E"
    }
  ]
};

const namespaced = true;

export default {
  namespaced,
  state,
  actions,
  getters,
  mutations
};
