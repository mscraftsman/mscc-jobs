let addJob = (state, payload) => {
  // state.jobs = [...state.jobs, ...[payload.value]];

  let job = state.jobs.find(job => job.id == payload.value.advertId);

  if (typeof job === "undefined") {
    state.jobs = [...state.jobs, ...[payload.value]];
  }
};

let setGroupedJobsByCompany = (state, payload) => {
  let job = payload.value;
  let IdCompanyOfJob = job.profileId;

  // Grouping by ID
  if (typeof state.jobsGroupedByCompanyId[IdCompanyOfJob] === "undefined") {
    state.jobsGroupedByCompanyId[IdCompanyOfJob] = [];
    state.jobsGroupedByCompanyId[IdCompanyOfJob].push(job);
  } else {
    state.jobsGroupedByCompanyId[IdCompanyOfJob].push(job);
  }
};

let setGroupedJobsByProfile = (state, payload) => {
  let job = payload.value;
  let IdProfileOfJob = job.profileId;

  // Grouping by ID
  if (typeof state.jobsGroupedByProfileId[IdProfileOfJob] === "undefined") {
    state.jobsGroupedByProfileId[IdProfileOfJob] = [];
    state.jobsGroupedByProfileId[IdProfileOfJob].push(job);
  } else {
    state.jobsGroupedByProfileId[IdProfileOfJob].push(job);
  }
};

let addJobFull = (state, payload) => {
  let job = payload.value;
  let jobId = job.id;

  if (typeof state.jobsFull[jobId] === "undefined") {
    state.jobsFull[jobId] = job;
  }
};

export default {
  addJob,
  setGroupedJobsByCompany,
  addJobFull,
  setGroupedJobsByProfile
};
