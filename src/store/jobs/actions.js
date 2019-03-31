import axios from "axios";

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

let getJobFromApi = ({ state, commit }, payload) => {
  // Get single job from API
  let jobId = payload.value;
  console.log(jobId);

  return new Promise((resolve, reject) => {
    // Do something here... lets say, a http call

    axios
      .get("/job", {
        params: {
          ID: jobId
        }
      })
      .then(function(response) {
        console.log(response);

        // Add job to state
        commit("addJob", response.data.data);

        // http success, call the mutator and change something in state
        resolve(response); // Let the calling function know that http is done. You may send some data back
      })
      .catch(function(error) {
        console.log(error);

        // http failed, let the calling function know that action did not work out
        reject(error);
      })
      .then(function() {
        // always executed
      });
  });
};

export default {
  addJob,
  getJobsFromApi,
  getJobFromApi
};
