import _ from "lodash";

let addJob = ({ state, commit }, payload) => {
  commit("addJob", {
    value: payload
  });
};

let getJobsFromApi = ({ state, commit }, payload) => {
  // Do some magic here

  // After getting jobs, group by company ID
  if (state.jobs && state.jobs.length) {
    state.jobs.map(job => {
      commit("setGroupedJobsByCompany", {
        value: job
      });
    });
  }
};

export default {
  addJob,
  getJobsFromApi
};
