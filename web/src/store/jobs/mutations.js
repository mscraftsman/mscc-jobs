let addJob = (state, payload) => {
  state.jobs.push(payload.value);
};

export default {
  addJob
};
