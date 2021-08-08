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
    const { x, y, top, right, bottom, left } = this.player.position

    let collision = {
      top: 0,
      right: 640,
      bottom: 480,
      left: 0,
    }

    // Просчёт коллизии
    if (this.level.tiles[y][left] === 1) {
      collision.left = (left + 1) * 32;
    }

    if (this.level.tiles[y][right] === 1) {
      collision.right = right * 32;
    }

    if (this.level.tiles[top][x] === 1) {
      collision.top = (top + 1) * 32;
    }

    if (this.level.tiles[bottom][x] === 1) {
      collision.bottom = bottom * 32;
    }

    // Реакция на прыгалку
    if (this.level.tiles[bottom][x] === 4) {
      this.player.velocityY *= 1.2;
    }

    this.player.setCollision(collision);
    this.player.update();
  }
}
