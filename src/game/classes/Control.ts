import { ControlKeysState, RegisteredKeys } from '../types';

export default class Control {
  public registeredKeys: RegisteredKeys;

  constructor() {
    this.registeredKeys = {};

    document.addEventListener('keydown', this.handleKeyPressed);
    document.addEventListener('keyup', this.handleKeyReleased);
  }

  handleKeyPressed = (evt: KeyboardEvent): void => {
    evt.preventDefault();

    if (this.registeredKeys[evt.code]) {
      this.registeredKeys[evt.code].state = true;
    }
  };

  handleKeyReleased = (evt: KeyboardEvent): void => {
    evt.preventDefault();

    if (this.registeredKeys[evt.code]) {
      this.registeredKeys[evt.code].state = false;
    }
  };

  addKey(keyCode: string, key: string): void {
    this.registeredKeys[keyCode] = {
      key,
      state: false,
    };
  }

  get keys(): ControlKeysState {
    return Object.entries(this.registeredKeys).reduce((acc, [key, value]) => {
      acc[this.registeredKeys[key].key] = value.state;
      return acc;
    }, {} as ControlKeysState);
  }

  destroy(): void {
    document.removeEventListener('keydown', this.handleKeyPressed);
    document.removeEventListener('keyup', this.handleKeyReleased);
  }
}
