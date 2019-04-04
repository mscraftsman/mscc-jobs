let addJob = (state, payload) => {
  state.jobs = [...state.jobs, ...[payload.value]];
};

let setGroupedJobsByCompany = (state, payload) => {
  let job = payload.value;
  let IdCompanyOfJob = job.profileId;

  // Add to jobs
  // state.jobs = [...state.jobs, ...[job]];

  // Grouping by ID
  if (typeof state.jobsGroupedByCompanyId[IdCompanyOfJob] === "undefined") {
    state.jobsGroupedByCompanyId[IdCompanyOfJob] = [];
    state.jobsGroupedByCompanyId[IdCompanyOfJob].push(job);
  } else {
    state.jobsGroupedByCompanyId[IdCompanyOfJob].push(job);
  }
};

export default {
  addJob,
  setGroupedJobsByCompany
};
