import {GAME_CONFIG, PLAYER_DIRECTION, SPRITE_PLAYER, SPRITE_SIZE} from '../utils/constants.js';

export default class Player {
  constructor() {
    this.direction = null;
    // Стартовые координаты персонажа
    this.x = 32;
    this.y = 160;
    this.speed = GAME_CONFIG.PLAYER_SPEED;
    // Стартовое ускорение персонажа
    this.velocityX = 3;
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

  get t() {
    return {
      x: Math.floor(this.x / SPRITE_SIZE[0]),
      y: Math.floor(this.y / SPRITE_SIZE[1]),
    }
  }

  get position() {
    return {
      x: this.t.x,
      y: this.t.y,
      top: this.t.y - 1,
      right: this.t.x + 1,
      bottom: this.t.y + 1,
      left: this.t.x - 1,
    }
  }

  moveLeft() { this.direction = PLAYER_DIRECTION.LEFT; }
  moveRight() { this.direction = PLAYER_DIRECTION.RIGHT; }
  stop() { this.direction = null; }

  setCollision({ top, right, bottom, left }) {
    this.collision = {
      top,
      right,
      bottom,
      left,
    }
  }

  update() {
    if (!this.isJump) {
      this.isJump = true
      this.velocityY = -this.speed * GAME_CONFIG.PLAYER_JUMP_POWER
    }

    if (this.direction === PLAYER_DIRECTION.LEFT) {
      if (this.velocityX > -this.speed) {
        this.velocityX--
      }
    }

    if (this.direction === PLAYER_DIRECTION.RIGHT) {
      if (this.velocityX < this.speed) {
        this.velocityX++
      }
    }

    this.velocityX *= GAME_CONFIG.FRICTION
    this.velocityY += GAME_CONFIG.GRAVITY

    this.x += this.velocityX
    this.y += this.velocityY

    // Коллизия
    if (this.x >= this.collision.right - 32) {
      this.x = this.collision.right - 32
    } else if (this.x <= this.collision.left) {
      this.x = this.collision.left;
    }

    if (this.y >= this.collision.bottom - 32) {
      this.y = this.collision.bottom - 32
      this.isJump = false
    } else if (this.y <= this.collision.top) {
      this.y = this.collision.top;
      this.velocityY = 0
    }

    // Спрайт
    if (this.velocityX > 0.2) {
      this.sprite = SPRITE_PLAYER.RIGHT
    } else if (this.velocityX < -0.2) {
      this.sprite = SPRITE_PLAYER.LEFT
    } else {
      this.sprite = SPRITE_PLAYER.STAY
    }
  }
}
