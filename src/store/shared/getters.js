let getMenuState = state => {
  return state.menuState;
};

let getTheme = state => {
  return state.themes[state.currentTheme];
};

let getContentFullById = state => id => {
  let newId = id.replace("/", "");
  return state.contentFull[newId];
};

export default {
  getMenuState,
  getTheme,
  getContentFullById
};
