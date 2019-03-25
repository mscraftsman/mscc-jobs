let addJob = ({ state, commit }, payload) => {
  commit("addJob", {
    value: payload
  });
};

let getJobsFromApi = ({ state, commit }, payload) => {
  // Do some magic here

  // After getting jobs, group by company ID
  if (state.jobsRaw && state.jobsRaw.length) {
    state.jobsRaw.map(job => {
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
