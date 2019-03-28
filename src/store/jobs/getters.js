let getJobs = state => {
  return state.jobs;
};

let getJobById = state => id => {
  return state.jobs.find(job => job.id == id);
};

let getJobsByCompanyId = state => id => {
  return state.jobsGroupedByCompanyId[id];
};

let getTechStack = state => {
  return state.tech_stack;
};

export default {
  getJobs,
  getJobsByCompanyId,
  getJobById,
  getTechStack
};
