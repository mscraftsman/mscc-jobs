import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

const state = {
  menuState: false,
  currentTheme: 0,
  contentFull: {},
  themes: ["theme-default", "theme-dark", "theme-terminal"]
};

const namespaced = true;

export default {
  namespaced,
  state,
  actions,
  getters,
  mutations
};
