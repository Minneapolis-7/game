import { CONTROL } from '../utils/constants.js';

export default class Game {
  constructor({ world, view, control }) {
    this.world = world;
    this.view = view;
    this.control = control;
    this.loop = this.loop.bind(this);
    this.requestAnimationId = 0;
  }

  async init() {
    // Клавиши управления игрой (код клавиши, ключ состояния клавиши)
    this.control.addKey('ArrowLeft', CONTROL.LEFT);
    this.control.addKey('ArrowRight', CONTROL.RIGHT);
    this.control.addKey('Space', CONTROL.SPACE);

    await this.view.init();
    this.start();
  }

  start() {
    this.loop();
  }

  stop() {
    window.cancelAnimationFrame(this.requestAnimationId);
  }

  loop() {
    // Обновляется мир, в мир передаётся текущее состояние клавиш
    this.world.update(this.control.keys);
    this.view.update(this.world);
    this.requestAnimationId = window.requestAnimationFrame(this.loop);
  }
}
