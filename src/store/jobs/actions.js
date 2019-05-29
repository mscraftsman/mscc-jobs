import axios from "axios";
import {
  LATEST_JOBS_ENDPOINT,
  GET_JOB_ENDPOINT,
  SEARCH_ENDPOINT
} from "../constants";

let addJob = ({ state, commit }, payload) => {
  commit("addJob", {
    value: payload
  });
};

let getLatestJobsFromApi = ({ state, commit }, payload) => {
  // Get latest jobs array only if not fetched
  if (state.getLatestJobsStatus === false) {
    return new Promise((resolve, reject) => {
      axios
        .get(LATEST_JOBS_ENDPOINT)
        .then(function(response) {
          let jobs = response.data;

          // console.log(jobs);

          if (jobs && jobs.length) {
            commit("clearJobs", {
              value: []
            });

            jobs.map(job => {
              commit("addJob", {
                value: job
              });

              commit("setGroupedJobsByProfile", {
                value: job
              });
            });
          }

          resolve(jobs);
        })
        .catch(function(error) {
          console.log(error);
          reject(error);
        })
        .then(function() {
          // always executed
          commit("setLatestJobsStatus", {
            value: true
          });
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
  let searchObj = {
    id: payload.value.id,
    keyword: payload.value.keyword,
    searchid: payload.value.Seed,
    offset: payload.value.Offset,
    limit: payload.value.Limit,
    inhouse: payload.value.Live,
    employment: payload.value.JobType,
    contract: payload.value.ContractType,
    latitude: payload.value.latitude,
    longitude: payload.value.longitude,
    radius: payload.value.Radius,
    startdate: payload.value.StartDate,
    enddate: payload.value.EndDate,
    hasstartdate: payload.value.HasStartDate,
    hasenddate: payload.value.HasEndDate,
    startmonth: payload.value.StartMonth,
    endmonth: payload.value.EndMonth,
    location: payload.value.locationValue
  };

  return new Promise((resolve, reject) => {
    axios
      .post(SEARCH_ENDPOINT, searchObj)
      .then(function(response) {
        let jobs = response.data;
        if (jobs.listings && jobs.listings.length) {
          jobs.listings.map(job => {
            commit("addJobSearched", {
              value: job
            });
          });
        }

        resolve(jobs.listings);
      })
      .catch(function(error) {
        console.error(error);
        reject(error);
      })
      .then(function() {
        // always executed
      });
  });
};

export default {
  addJob,
  getLatestJobsFromApi,
  getJobFromApi,
  executeJobsSearch
};
