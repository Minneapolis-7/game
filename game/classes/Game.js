export default class Game {
  constructor({ world, view }) {
    this.world = world;
    this.view = view;
    this.loop = this.loop.bind(this);
    this.requestAnimationId = 0;
    this.control = {
      left: false,
      right: false,
      space: false,
    }
  }

  async init() {
    document.addEventListener('keydown', (evt) => {
      evt.preventDefault();
      switch (evt.code) {
        case 'ArrowLeft':
          this.control.left = true;
          break;
        case 'ArrowRight':
          this.control.right = true;
          break;
        case 'Space':
          this.control.space = true;
          break;
      }
    });

    document.addEventListener('keyup', (evt) => {
      evt.preventDefault();
      switch (evt.code) {
        case 'ArrowLeft':
          this.control.left = false;
          break;
        case 'ArrowRight':
          this.control.right = false;
          break;
        case 'Space':
          this.control.space = false;
          break;
      }
    });

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
    this.world.update(this.control);
    this.view.update(this.world);
    this.requestAnimationId = window.requestAnimationFrame(this.loop);
  }
}
