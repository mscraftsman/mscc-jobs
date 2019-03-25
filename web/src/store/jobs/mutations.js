let addJob = (state, payload) => {
  state.jobs.push(payload.value);
};

let setGroupedJobsByCompany = (state, payload) => {
  let job = payload.value;
  let IdCompanyOfJob = job.company.id;

  // Add to jobs
  state.jobs = [...state.jobs, ...[job]];

  // Grouping by ID
  if (typeof state.jobsGroupedByCompanyId[IdCompanyOfJob] === "undefined") {
    console.log("undefined");
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
