let addJob = ({ state, commit }, payload) => {
  commit("addJob", {
    value: payload
  });
};

let executeGrouping = val => {};

let getJobsFromApi = ({ state, commit }, payload) => {
  // Do some magic here
  // After getting jobs, group by company ID
};

export default {
  addJob
};
