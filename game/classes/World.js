import Player from './Player.js';
import {
  GAME_CONFIG,
  CANVAS_SIZE_X,
   CANVAS_SIZE_Y,
  SPRITE_SIZE_X,
  SPRITE_SIZE_Y
} from '../utils/constants.js';

export default class World {
  constructor() {
    this.player = new Player();
    this.levelObjects = [];
    this.lastPlayerPosition = [-1, -1];
    this.lastActionPosition = [-1, -1];
    this.friction = 0;
    this.gravity = 0;
    this.resetToDefault();
  }

  resetToDefault() {
    this.friction = GAME_CONFIG.FRICTION;
    this.gravity = GAME_CONFIG.GRAVITY;
  }

  setLevelObjects(levelObjects) {
    this.levelObjects = levelObjects
  }

  // Обновление на смену позиции (по тайлам)
  onPositionUpdate(object, bottomObject, control) {
    const { x, y } = this.player.position;
    const isOver = this.lastActionPosition[0] === x && this.lastActionPosition[1] === y;
    this.resetToDefault();

    // Колбэк при пересечении
    if (object.onOver) {
      object.onOver({ object, player: this.player });
      this.lastActionPosition = [x, y]
    }

    // Колбэк при перемещении сверху
    if (bottomObject.onAbove && !isOver) {
      bottomObject.onAbove({ bottomObject, player: this.player });
    }
  }

  update(control) {
    const { x, y } = this.player.position;

    let collision = {
      top: 0,
      right: CANVAS_SIZE_X,
      bottom: CANVAS_SIZE_Y,
      left: 0,
    };

    // Взаимодействие с коллизией
    if (this.levelObjects[y][x - 1].isUseCollision) {
      collision.left = x * SPRITE_SIZE_X;
    }

    if (this.levelObjects[y][x + 1].isUseCollision) {
      collision.right = (x + 1) * SPRITE_SIZE_X;
    }

    if (this.levelObjects[y - 1][x].isUseCollision) {
      collision.top = y * SPRITE_SIZE_Y;
    }

    if (this.levelObjects[y + 1][x].isUseCollision) {
      collision.bottom = (y + 1) * SPRITE_SIZE_Y;
    }

    if (this.lastPlayerPosition[0] !== x || this.lastPlayerPosition[1] !== y) {
      this.onPositionUpdate(
        this.levelObjects[y][x],
        this.levelObjects[y + 1][x],
        control
      );
      this.lastPlayerPosition = [x, y];
    }

    this.player.setCollision(collision);
    this.player.update(this, control);
  }
}
