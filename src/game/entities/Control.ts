import { ControlKeysState, RegisteredKeys } from '@/game/types';

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
    return Object.values(this.registeredKeys).reduce(
      (acc, value) => ({ ...acc, [value.key]: value.state }),
      {} as ControlKeysState
    );
  }

  destroy(): void {
    document.removeEventListener('keydown', this.handleKeyPressed);
    document.removeEventListener('keyup', this.handleKeyReleased);
  }
}
