import axios from "axios";
import { GET_ARTICLE_ENDPOINT, ARTICLE_ENDPOINT, SITE_ID } from "../constants";

let setMenuStatus = ({ state, commit }) => {
  commit("setMenuStatus", {
    value: !state.menuState
  });
};

let switchTheme = ({ state, commit }) => {
  commit("switchTheme");
};

let getContentFromApi = ({ state, commit }, payload) => {
  // Get single content article from API
  let url = payload.value;
  let site = payload.site ? payload.site : SITE_ID;
  return new Promise((resolve, reject) => {
    axios
      // .get(GET_ARTICLE_ENDPOINT + "/" + this.pageId)
      // .get(GET_ARTICLE_ENDPOINT + "/" + this.url)
      .post(ARTICLE_ENDPOINT, {
        alias: url,
        site: site,
        type: "article"
      })
      .then(function(response) {
        let content = response.data[0];

        if (content) {
          commit("setContentFull", {
            value: content
          });

          resolve(content);
        } else {
          reject("Content not found");
        }
      })
      .catch(function(error) {
        console.error(error);
        reject(error);
      })
      .then(function() {
        // always executed
      });
  });
};

export default {
  setMenuStatus,
  switchTheme,
  getContentFromApi
};
