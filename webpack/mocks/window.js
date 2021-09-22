// eslint-disable-next-line no-undef
const win = (window && window.getComputedStyle && window) || {
  getComputedStyle() {
    return {
      getPropertyValue() {},
    };
  },
  addEventListener() {},
};

export default win;
