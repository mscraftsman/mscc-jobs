let setMenuStatus = ({ state, commit }) => {
  commit("setMenuStatus", {
    value: !state.menuState
  });
};

export default {
  setMenuStatus
};
