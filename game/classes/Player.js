import {
  GAME_CONFIG,
  SPRITE_PLAYER,
  SPRITE_SIZE_X,
  SPRITE_SIZE_Y
} from '../utils/constants.js';

export default class Player {
  constructor() {
    this.direction = null;
    // Стартовые координаты персонажа
    this.x = 191;
    this.y = 256;
    this.speed = GAME_CONFIG.PLAYER_SPEED;
    // Стартовое ускорение персонажа
    this.velocityX = 0;
    this.velocityY = 0;
    this.isJump = false;
    this.sprite = SPRITE_PLAYER.STAY;
    this.collision = {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    }
  }

  get position() {
    const x = Math.round(this.x / SPRITE_SIZE_X);
    const y = Math.round(this.y / SPRITE_SIZE_Y);

    return {
      // Положение игрока (координаты по тайлам)
      x,
      y,
      // Соседние тайлы с игроком (координаты по тайлам)
      top: y - 1,
      right: x + 1,
      bottom: y + 1,
      left: x - 1,
    }
  }

  setCollision({ top, right, bottom, left }) {
    this.collision = {
      top,
      right,
      bottom,
      left,
    }
  }

  update(control) {
    // Управление игроком
    if (control.space) {
      // Прыжок
      if (!this.isJump) {
        this.isJump = true;
        this.velocityY = -this.speed * GAME_CONFIG.PLAYER_JUMP_POWER;
      }
    }

    // Движение влево
    if (control.left) {
      if (this.velocityX > -this.speed) {
        this.velocityX--;
      }
    }

    // Движение вправо
    if (control.right) {
      if (this.velocityX < this.speed) {
        this.velocityX++;
      }
    }

    this.velocityX *= GAME_CONFIG.FRICTION;
    this.velocityY += GAME_CONFIG.GRAVITY;

    this.x += this.velocityX;
    this.y += this.velocityY;

    // Коллизия слева и справа
    if (this.x >= this.collision.right - SPRITE_SIZE_X) {
      this.x = this.collision.right - SPRITE_SIZE_X
    } else if (this.x <= this.collision.left) {
      this.x = this.collision.left;
    }

    // Коллизия сверху и снизу
    if (this.y >= this.collision.bottom - SPRITE_SIZE_Y) {
      this.y = this.collision.bottom - SPRITE_SIZE_Y;
      this.isJump = false;
    } else if (this.y <= this.collision.top) {
      this.y = this.collision.top;
      this.velocityY = 0;
    }

    // Спрайт при движении
    if (this.velocityX > 0.2) {
      this.sprite = SPRITE_PLAYER.RIGHT;
    } else if (this.velocityX < -0.2) {
      this.sprite = SPRITE_PLAYER.LEFT;
    } else {
      this.sprite = SPRITE_PLAYER.STAY;
    }
  }
}
