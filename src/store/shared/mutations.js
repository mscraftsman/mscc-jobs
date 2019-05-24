let setMenuStatus = (state, payload) => {
  state.menuState = payload.value;
};

let switchTheme = (state, payload) => {
  let total = state.themes.length - 1;
  if (state.currentTheme === total) {
    state.currentTheme = 0;
  } else {
    state.currentTheme++;
  }
};

let setContentFull = (state, payload) => {
  if (typeof state.contentFull[payload.value.slug] === "undefined") {
    state.contentFull[payload.value.slug] = payload.value;
  }
};

export default {
  setMenuStatus,
  switchTheme,
  setContentFull
};
