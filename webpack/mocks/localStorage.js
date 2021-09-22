// eslint-disable-next-line no-undef
const localStorage = (window && window.getComputedStyle && window.localStorage) || {
  setItem() {},
  getItem() {},
};

export default localStorage;
