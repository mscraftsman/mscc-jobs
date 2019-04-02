import axios from "axios";
import { JOBS_ENDPOINT } from "../constants";

let addJob = ({ state, commit }, payload) => {
  commit("addJob", {
    value: payload
  });
};

let getJobsFromApi = ({ state, commit }, payload) => {
  axios
    .get(JOBS_ENDPOINT + "Get_Response_Sites_SiteId_Listings.json")
    .then(function(response) {
      let jobs = response.data;

      console.log(jobs);

      if (jobs && jobs.length) {
        jobs.map(job => {
          commit("addJob", {
            value: job
          });

          commit("setGroupedJobsByCompany", {
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
    });
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
        let job = response.data;

        console.log(job);

        // Add job to state
        commit("addJob", {
          value: job
        });

        commit("setGroupedJobsByCompany", {
          value: job
        });

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
