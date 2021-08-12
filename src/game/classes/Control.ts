import { ControlKeysState, RegisteredKeys } from '../types';

export default class Control {
  public registeredKeys: RegisteredKeys;

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

  addKey(keyCode: string, key: string, cb?: () => void): void {
    this.registeredKeys[keyCode] = {
      key,
      state: false,
      cb,
    };
  }

  get keys(): ControlKeysState {
    const acc: ControlKeysState = {};
    Object.entries(this.registeredKeys).forEach(([key, value]) => {
      acc[this.registeredKeys[key].key] = value.state;
    });
    return acc;
  }
}
