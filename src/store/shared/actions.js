let setMenuStatus = ({ state, commit }) => {
  commit("setMenuStatus", {
    value: !state.menuState
  });
};

let switchTheme = ({ state, commit }) => {
  commit("switchTheme");
};

export default {
  setMenuStatus,
  switchTheme
};
