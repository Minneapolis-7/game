import { ControlKeysState, RegisteredKeys } from '@/game/types';

export default class Control {
  public registeredKeys: RegisteredKeys;
  public registeredGamepadButtons: Record<number, string>;
  public gamepad: Gamepad | null;
  public isActiveGamepad: boolean;

  constructor() {
    this.registeredKeys = {};
    this.registeredGamepadButtons = {};
    this.gamepad = null;
    this.isActiveGamepad = false;
  }

  handleKeyPressed = (evt: KeyboardEvent): void => {
    evt.preventDefault();
    this.isActiveGamepad = false;

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

  handleGamepadConnected = ({ gamepad }: GamepadEvent): void => {
    this.gamepad = gamepad;
  };

  handleGamepadDisconnected = (): void => {
    this.gamepad = null;
  };

  registerKey(keyCode: string, key: string, gamepadButton: number): void {
    this.registeredKeys[keyCode] = { key, state: false };
    this.registeredGamepadButtons[gamepadButton] = keyCode;
  }

  get keys(): ControlKeysState {
    return Object.values(this.registeredKeys).reduce(
      (acc, value) => ({ ...acc, [value.key]: value.state }),
      {} as ControlKeysState
    );
  }

  init(): void {
    document.addEventListener('keydown', this.handleKeyPressed);
    document.addEventListener('keyup', this.handleKeyReleased);
    window.addEventListener('gamepadconnected', this.handleGamepadConnected);
    window.addEventListener('gamepaddisconnected', this.handleGamepadDisconnected);
  }

  update(): void {
    if (!this.gamepad) {
      return;
    }

    Object.keys(this.registeredGamepadButtons).forEach((button) => {
      const key = this.registeredGamepadButtons[+button];

      if (navigator.getGamepads()[this.gamepad?.index || 0]?.buttons[+button].pressed) {
        this.isActiveGamepad = true;
        this.registeredKeys[key].state = true;
      } else if (this.isActiveGamepad) {
        this.registeredKeys[key].state = false;
      }
    });
  }

  destroy(): void {
    Object.keys(this.registeredKeys).forEach((key) => {
      this.registeredKeys[key].state = false;
    });
    document.removeEventListener('keydown', this.handleKeyPressed);
    document.removeEventListener('keyup', this.handleKeyReleased);
    window.removeEventListener('gamepadconnected', this.handleGamepadConnected);
    window.removeEventListener('gamepaddisconnected', this.handleGamepadDisconnected);
  }
}
