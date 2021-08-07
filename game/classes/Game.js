export default class Game {
  constructor({ world, view }) {
    this.world = world;
    this.view = view;
    this.loop = this.loop.bind(this);
    this.requestAnimationId = 0;
  }

  async init() {
    await this.view.init();

    const { player } = this.world;

    document.addEventListener('keydown', (evt) => {
      evt.preventDefault();
      switch (evt.code) {
        case 'ArrowLeft':
          player.moveLeft();
          break;
        case 'ArrowRight':
          player.moveRight();
          break;
      }
    });

    document.addEventListener('keyup', (evt) => {
      evt.preventDefault();
      switch (evt.code) {
        case 'ArrowLeft':
          player.stop();
          break;
        case 'ArrowRight':
          player.stop();
          break;
      }
    });

    this.start();
  }

  start() {
    this.loop();
  }

  stop() {
    window.cancelAnimationFrame(this.requestAnimationId);
  }

  loop() {
    this.world.update();
    this.view.update(this.world);
    this.requestAnimationId = window.requestAnimationFrame(this.loop);
  }
}
