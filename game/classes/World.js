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
    const {
      x,
      y,
      top,
      right,
      bottom,
      left
    } = this.player.position;

    let collision = {
      top: 0,
      right: CANVAS_SIZE_X,
      bottom: CANVAS_SIZE_Y,
      left: 0,
    };

    // Взаимодействие с кирпичом
    if (this.level.tiles[y][left] === 1) {
      collision.left = (left + 1) * SPRITE_SIZE_X;
    }

    if (this.level.tiles[y][right] === 1) {
      collision.right = right * SPRITE_SIZE_X;
    }

    if (this.level.tiles[top][x] === 1) {
      collision.top = (top + 1) * SPRITE_SIZE_Y;
    }

    if (this.level.tiles[bottom][x] === 1) {
      collision.bottom = bottom * SPRITE_SIZE_Y;
    }

    // Взаимодействие с прыгалкой
    if (this.level.tiles[bottom][x] === 4) {
      this.player.velocityY *= 1.2;
    }

    this.player.setCollision(collision);
    this.player.update();
  }
}
