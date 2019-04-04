import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

const state = {
  companies: {},
  customers: {},
  profiles: {}
};

const namespaced = true;

export default {
  namespaced,
  state,
  actions,
  getters,
  mutations
};
