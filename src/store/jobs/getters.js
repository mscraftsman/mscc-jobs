let getJobs = state => {
  return state.jobs;
};

let getJobById = state => id => {
  return state.jobsFull[id];
};

let getJobsByCompanyId = state => id => {
  return state.jobsGroupedByCompanyId[id];
};

let getTechStack = state => {
  return state.tech_stack;
};

let getJobFullById = state => id => {
  let job = state.jobsFull[id];
  return job;
};

export default {
  getJobs,
  getJobsByCompanyId,
  getJobById,
  getTechStack,
  getJobFullById
};
