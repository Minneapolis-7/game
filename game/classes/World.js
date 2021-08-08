import Player from './Player.js';
import {
  CANVAS_SIZE_X,
  CANVAS_SIZE_Y,
  SPRITE_SIZE_X,
  SPRITE_SIZE_Y
} from '../utils/constants.js';

export default class World {
  constructor(levels) {
    this.player = new Player();
    this.levels = levels;
    this.levelNumber = 0;
    this.level = this.levels[this.levelNumber];
  }

  update() {
    const { x, y } = this.player.position;
    console.log(`x: ${x}, y: ${y} | x: ${this.player.x} | y: ${this.player.y}`)

    let collision = {
      top: 0,
      right: CANVAS_SIZE_X,
      bottom: CANVAS_SIZE_Y,
      left: 0,
    };

    // Взаимодействие с кирпичом
    if (this.level.tiles[y][x - 1] === 1) {
      collision.left = (x) * SPRITE_SIZE_X;
    }

    if (this.level.tiles[y][x + 1] === 1) {
      collision.right = (x + 1) * SPRITE_SIZE_X;
    }

    if (this.level.tiles[y - 1][x] === 1) {
      collision.top = (y) * SPRITE_SIZE_Y;
    }

    if (this.level.tiles[y + 1][x] === 1) {
      collision.bottom = (y + 1) * SPRITE_SIZE_Y;
    }

    // Взаимодействие с прыгалкой
    if (this.level.tiles[y + 1][x] === 4) {
      this.player.velocityY *= 1.2;
    }

    this.player.setCollision(collision);
    this.player.update();
  }
}
