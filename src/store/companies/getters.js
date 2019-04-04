let getCompanyById = state => id => {
  return state.companies[id];
};

let getProfileById = state => id => {
  return state.profiles[id];
};

let getCustomerById = state => id => {
  return state.customers[id];
};

export default {
  getCompanyById,
  getProfileById,
  getCustomerById
};
