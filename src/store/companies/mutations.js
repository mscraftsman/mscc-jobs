let addCompany = (state, payload) => {
  let company = payload.value;
  let IdCompany = company.customerId;

  if (typeof state.companies[IdCompany] === "undefined") {
    state.companies[IdCompany] = company;
  }
};

export default {
  addCompany
};
