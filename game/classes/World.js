import Player from './Player.js';

export default class World {
  constructor(levels) {
    this.player = new Player();
    this.levels = levels;
    this.levelNumber = 0;
    this.level = levels[this.levelNumber];
  }

  nextLevel() {
    this.levelNumber++
    this.level = this.levels[this.levelNumber];
  }

  update() {
    this.player.update();
  }
}
