let addCompany = (state, payload) => {
  let company = payload.value;
  let IdCompany = company.customerId;

  if (typeof state.companies[IdCompany] === "undefined") {
    state.companies[IdCompany] = company;
  }
};

let addCustomer = (state, payload) => {
  let customer = payload.value;
  let IdCustomer = customer.customerId;

  if (typeof state.customers[IdCustomer] === "undefined") {
    state.customers[IdCustomer] = customer;
  }
};

let addProfile = (state, payload) => {
  let profileData = payload.value;
  let profileId = profileData.profile.id;

  if (typeof state.profiles[profileId] === "undefined") {
    state.profiles[profileId] = profileData;
  }
};

export default {
  addCompany,
  addProfile,
  addCustomer
};
