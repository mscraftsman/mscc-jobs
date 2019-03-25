let getCompaniesFromAPI = ({ state, commit }, payload) => {
  // todo
};

let getCompanyFromAPI = ({ state, commit }, payload) => {
  // get company data
  console.log(payload);

  // Add company to state
  commit("addCompany", {
    value: payload
  });
};

export default {
  getCompaniesFromAPI,
  getCompanyFromAPI
};
