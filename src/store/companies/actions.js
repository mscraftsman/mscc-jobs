import axios from "axios";
import { PROFILE_ENDPOINT, CUSTOMER_ENDPOINT } from "../constants";

// let getCompaniesFromApi = ({ state, commit }, payload) => {
//   axios
//     .get(PROFILE_ENDPOINT + "Get_Response_Site_SiteId_Employers.json")
//     .then(function(response) {
//       let companies = response.data;
//       if (companies && companies.length) {
//         companies.map(company => {
//           commit("addCompany", {
//             value: company
//           });
//         });
//       }
//     })
//     .catch(function(error) {
//       console.log(error);
//     })
//     .then(function() {
//       // always executed
//     });
// };

let getCustomerByIdFromApi = ({ state, commit }, payload) => {
  let customerId = payload.value;

  return new Promise((resolve, reject) => {
    axios
      .get(CUSTOMER_ENDPOINT + "/" + customerId)
      .then(function(response) {
        let customer = response.data;

        commit("addCustomer", {
          value: customer
        });

        resolve(customer);
      })
      .catch(function(error) {
        console.log(error);
        reject(error);
      })
      .then(function() {});
  });
};

let getProfileByIdFromApi = ({ state, commit }, payload) => {
  let profile = payload.value;

  return new Promise((resolve, reject) => {
    axios
      .get(PROFILE_ENDPOINT + "/" + profile)
      .then(function(response) {
        let profile = response.data;

        commit("addProfile", {
          value: profile
        });

        resolve(profile);
      })
      .catch(function(error) {
        console.log(error);
        reject(error);
      })
      .then(function() {});
  });
};

let getProfileByPostRequest = ({ state, commit }, payload) => {
  let profile = payload.value;

  return new Promise((resolve, reject) => {
    axios
      .post(PROFILE_ENDPOINT, {
        Profile: profile,
        Customer: "0"
      })
      .then(function(response) {
        let profile = response.data;

        commit("addProfile", {
          value: profile
        });

        resolve(profile);
      })
      .catch(function(error) {
        console.log(error);
        reject(error);
      })
      .then(function() {});
  });
};

export default {
  // getCompaniesFromApi,
  // getCompanyFromApi,
  getProfileByIdFromApi,
  getCustomerByIdFromApi,
  getProfileByPostRequest
};
