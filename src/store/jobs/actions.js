import axios from "axios";
import { LATEST_JOBS_ENDPOINT, GET_JOB_ENDPOINT } from "../constants";

let addJob = ({ state, commit }, payload) => {
  commit("addJob", {
    value: payload
  });
};

let getLatestJobsFromApi = ({ state, commit }, payload) => {
  // Get latest jobs array only if not fetched
  if (state.getLatestJobsStatus === false) {
    axios
      .get(LATEST_JOBS_ENDPOINT)
      .then(function(response) {
        let jobs = response.data;

        // console.log(jobs);

        if (jobs && jobs.length) {
          jobs.map(job => {
            commit("addJob", {
              value: job
            });

            commit("setGroupedJobsByProfile", {
              value: job
            });
          });
        }
      })
      .catch(function(error) {
        console.log(error);
      })
      .then(function() {
        // always executed
        commit("setLatestJobsStatus", {
          value: true
        });
      });
  }
};

let getJobFromApi = ({ state, commit }, payload) => {
  // Get single job from API
  let jobId = payload.value;
  return new Promise((resolve, reject) => {
    axios
      .get(GET_JOB_ENDPOINT + "/" + jobId)
      .then(function(response) {
        let job = response.data;

        // console.log(job);

        // Add job to state
        commit("addJobFull", {
          value: job
        });

        // http success, call the mutator and change something in state
        resolve(job); // Let the calling function know that http is done. You may send some data back
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

let executeJobsSearch = ({ state, commit }, payload) => {
  // Get jobs based on search

  console.log(payload);

  axios
    .get(LATEST_JOBS_ENDPOINT, payload)
    .then(function(response) {
      let jobs = response.data;

      console.log(jobs);

      if (jobs && jobs.length) {
        jobs.map(job => {
          commit("addJobSearched", {
            value: job
          });

          // commit("setGroupedJobsByProfile", {
          //   value: job
          // });
        });
      }
    })
    .catch(function(error) {
      console.log(error);
    })
    .then(function() {
      // always executed
    });
};

export default {
  addJob,
  getLatestJobsFromApi,
  getJobFromApi,
  executeJobsSearch
};
