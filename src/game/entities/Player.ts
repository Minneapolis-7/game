import { PlayerHitBox, ControlKeysState, PlayerPosition } from '@/game/types';
import {
  GAME_CONFIG,
  PLAYER_SPRITE_COORDS,
  SPRITE_SIZE_X,
  SPRITE_SIZE_Y,
} from '@/game/shared/constants';

type World = import('@/game/entities/World').default;

export default class Player {
  public x: number;
  public y: number;
  public speed: number;
  public jumpPower: number;
  public velocityX: number;
  public velocityY: number;
  public isJumping: boolean;
  public sprite: [number, number];
  public hitBox: PlayerHitBox;

  constructor() {
    // Стартовые координаты персонажа
    this.x = 32;
    this.y = 256;
    this.speed = 0;
    this.jumpPower = 0;
    // Векторная скорость персонажа
    this.velocityX = 0;
    this.velocityY = 0;
    this.isJumping = false;
    this.sprite = PLAYER_SPRITE_COORDS.STATIONARY;

    this.hitBox = {
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

  setHitBox({ top, right, bottom, left }: PlayerHitBox): void {
    this.hitBox = {
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

  update(world: World, control: ControlKeysState): void {
    // Управление игроком
    if (control.space) {
      // Прыжок
      if (!this.isJumping) {
        this.isJumping = true;
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
    if (this.x >= this.hitBox.right - SPRITE_SIZE_X) {
      this.x = this.hitBox.right - SPRITE_SIZE_X;
      this.velocityX = 0;
    } else if (this.x <= this.hitBox.left) {
      this.x = this.hitBox.left;
      this.velocityX = 0;
    }

    // Коллизия сверху и снизу
    if (this.y >= this.hitBox.bottom - SPRITE_SIZE_Y) {
      this.y = this.hitBox.bottom - SPRITE_SIZE_Y;
      this.isJumping = false;
      this.velocityY = 0;
    } else if (this.y <= this.hitBox.top) {
      this.y = this.hitBox.top;
      this.velocityY = 0;
    }

    // Спрайт при движении
    if (this.velocityX > 0.2) {
      this.sprite = PLAYER_SPRITE_COORDS.MOVING_RIGHT;
    } else if (this.velocityX < -0.2) {
      this.sprite = PLAYER_SPRITE_COORDS.MOVING_LEFT;
    } else {
      this.sprite = PLAYER_SPRITE_COORDS.STATIONARY;
    }
  }
}
