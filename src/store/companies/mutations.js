let addCompany = (state, payload) => {
  let company = payload.value;
  let IdCompany = company.id;

  // Add to jobs
  if (typeof state.companies[IdCompany] !== "undefined") {
    state.companies[IdCompany] = company;
  }
};

export default {
  addCompany
};
