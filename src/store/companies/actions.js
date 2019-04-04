import axios from "axios";
import { JOBS_ENDPOINT } from "../constants";

let getCompaniesFromApi = ({ state, commit }, payload) => {
  axios
    .get(JOBS_ENDPOINT + "Get_Response_Site_SiteId_Employers.json")
    .then(function(response) {
      let companies = response.data;
      if (companies && companies.length) {
        companies.map(company => {
          commit("addCompany", {
            value: company
          });
        });
      }
    })
    .catch(function(error) {
      console.log(error);
    })
    .then(function() {
      // always executed
    });
};

let getCompanyFromApi = ({ state, commit }, payload) => {
  // get company data
  console.log(payload);

  // Add company to state
  commit("addCompany", {
    value: payload
  });
};

export default {
  getCompaniesFromApi,
  getCompanyFromApi
};
