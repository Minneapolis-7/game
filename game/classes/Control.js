export default class Control {
  constructor() {
    this.registeredKeys = {};

    document.addEventListener('keydown', (evt) => {
      evt.preventDefault();
      if (this.registeredKeys[evt.code]) {
        this.registeredKeys[evt.code].state = true;
      }
    });

    document.addEventListener('keyup', (evt) => {
      evt.preventDefault();
      if (this.registeredKeys[evt.code]) {
        this.registeredKeys[evt.code].state = false;
      }
    });
  }

  addKey(keyCode, key, cb = () => {}) {
    this.registeredKeys[keyCode] = {
      key, state: false, cb,
    }
  }

  get keys() {
    const acc = {};
    for (const i in this.registeredKeys) {
      acc[this.registeredKeys[i].key] = this.registeredKeys[i].state;
    }
    return acc;
  }
}
