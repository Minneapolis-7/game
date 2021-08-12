import { CollisionBox, ControlKeysState, PlayerPosition } from '../types';
import { GAME_CONFIG, SPRITE_PLAYER, SPRITE_SIZE_X, SPRITE_SIZE_Y } from '../utils/constants';

export default class Player {
  public x: number;
  public y: number;
  public speed: number;
  public jumpPower: number;
  public velocityX: number;
  public velocityY: number;
  public isJump: boolean;
  public sprite: [number, number];
  public collision: CollisionBox;

  constructor() {
    // Стартовые координаты персонажа
    this.x = 32;
    this.y = 256;
    this.speed = 0;
    this.jumpPower = 0;
    // Векторная скорость персонажа
    this.velocityX = 0;
    this.velocityY = 0;
    this.isJump = false;
    this.sprite = SPRITE_PLAYER.STAY;
    this.collision = {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    };
    this.resetToDefault();
  }

  resetToDefault(): void {
    this.speed = GAME_CONFIG.PLAYER_SPEED;
    this.jumpPower = GAME_CONFIG.PLAYER_JUMP_POWER;
  }

  get position(): PlayerPosition {
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
    };
  }

  setCollision({ top, right, bottom, left }: CollisionBox): void {
    this.collision = {
      top,
      right,
      bottom,
      left,
    };
  }

  setX(x: number): void {
    this.x = x;
  }

  setY(y: number): void {
    this.y = y;
  }

  setVelocityX(x: number): void {
    this.velocityX = x;
  }

  setVelocityY(y: number): void {
    this.velocityY = y;
  }

  addVelocityX(x: number): void {
    this.velocityX += x;
  }

  addVelocityY(y: number): void {
    this.velocityY += y;
  }

  // TODO: Избавится от циклической зависимости при импорте World
  update(world: any, control: ControlKeysState): void {
    // Управление игроком
    if (control.space) {
      // Прыжок
      if (!this.isJump) {
        this.isJump = true;
        this.velocityY = -this.speed * this.jumpPower;
      }
    }

    // Движение влево
    if (control.left) {
      if (this.velocityX > -this.speed) {
        this.velocityX -= 1;
      }
    }

    // Движение вправо
    if (control.right) {
      if (this.velocityX < this.speed) {
        this.velocityX += 1;
      }
    }

    this.velocityX *= world.friction;
    this.velocityY += world.gravity;

    this.x += this.velocityX;
    this.y += this.velocityY;

    // Коллизия слева и справа
    if (this.x >= this.collision.right - SPRITE_SIZE_X) {
      this.x = this.collision.right - SPRITE_SIZE_X;
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
