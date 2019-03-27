let getMenuState = state => {
  return state.menuState;
};

let getTheme = state => {
  return state.themes[state.currentTheme];
};

export default {
  getMenuState,
  getTheme
};
