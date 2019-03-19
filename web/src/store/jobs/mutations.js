let addJob = (state, payload) => {
  state.jobs.push(payload.value);
};

let setGroupedJobsByCompany = (state, payload) => {
  let job = payload.value;
  let IdCompanyOfJob = job[company].url;

  if (typeof state.jobsGroupedByCompanyId[IdCompanyOfJob] === "undefined") {
    state.jobsGroupedByCompanyId[IdCompanyOfJob] = new Array();
    state.jobsGroupedByCompanyId[IdCompanyOfJob].push(job);
  } else {
    state.jobsGroupedByCompanyId[IdCompanyOfJob].push(job);
  }
};

export default {
  addJob,
  setGroupedJobsByCompany
};
