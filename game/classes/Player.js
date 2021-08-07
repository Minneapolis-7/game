import { GAME_CONFIG, PLAYER_DIRECTION, SPRITE_PLAYER } from '../utils/constants.js';

export default class Player {
  constructor() {
    this.speed = 0;
    this.gravitySpeed = 0;
    this.direction = null;
    this.lastMomentumDirection = null;
    // Стартовые координаты персонажа
    this.x = 320;
    this.y = 160;
    this.sprite = SPRITE_PLAYER.STAY;
  }

  moveLeft() {
    this.direction = PLAYER_DIRECTION.LEFT;
  }

  moveRight() {
    this.direction = PLAYER_DIRECTION.RIGHT;
  }

  stop() {
    this.lastMomentumDirection = this.direction;
    this.direction = null;
  }

  move(direction) {
    switch (direction) {
      case PLAYER_DIRECTION.LEFT:
        this.sprite = SPRITE_PLAYER.LEFT;
        this.x -= this.speed;
        break;
      case PLAYER_DIRECTION.RIGHT:
        this.sprite = SPRITE_PLAYER.RIGHT;
        this.x += this.speed;
        break;
    }
  }

  // Импульс
  // TODO: Подумать над импульсом при резком изменении направления
  useMomentum() {
    // Набор скорости
    if (this.speed < GAME_CONFIG.PLAYER_MAX_SPEED && this.direction) {
      this.speed += GAME_CONFIG.PLAYER_START_MOMENTUM;
      this.move(this.direction);
    } else {
      this.move(this.direction);
    }

    // Сброс скорости
    if (this.speed > 0 && !this.direction) {
      this.speed -= GAME_CONFIG.PLAYER_STOP_MOMENTUM;
      if (this.speed < 0) {
        this.speed = 0;
      }
      this.move(this.lastMomentumDirection);
    }
  }

  useGravity() {
    if (this.gravitySpeed < GAME_CONFIG.GRAVITY_MAX_SPEED) {
      this.gravitySpeed += GAME_CONFIG.GRAVITY;
      this.y += this.gravitySpeed;
    } else {
      this.y += this.gravitySpeed;
    }
  }

  update() {
    this.useMomentum();
    // this.useGravity();

    if (this.speed === 0) {
      this.sprite = SPRITE_PLAYER.STAY;
    }
  }
}
