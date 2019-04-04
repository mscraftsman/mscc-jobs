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
  let companyId = payload.value;

  return new Promise((resolve, reject) => {
    axios
      .get(JOBS_ENDPOINT + "companies/" + companyId + ".json")
      .then(function(response) {
        let company = response.data;

        console.log(company);

        commit("addCompany", {
          value: company
        });

        resolve(company);
      })
      .catch(function(error) {
        console.log(error);
        reject(error);
      })
      .then(function() {});
  });
};

export default {
  getCompaniesFromApi,
  getCompanyFromApi
};
