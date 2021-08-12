import spritesFile from '../assets/sprites.png';
import { XYCoordinates } from '../types';

export const CANVAS_SIZE_X = 640;
export const CANVAS_SIZE_Y = 480;
export const CANVAS_BACKGROUND = '#000';
export const SPRITES_FILE: string = spritesFile;
export const SPRITE_SIZE_X = 32;
export const SPRITE_SIZE_Y = 32;

// Персонаж игрока на спрайтовой карте [x, y]
export const SPRITE_PLAYER: Record<string, XYCoordinates> = {
  STAY: [0, 0],
  RIGHT: [32, 0],
  LEFT: [64, 0],
};

export const CONTROL_KEY = {
  LEFT: 'left',
  RIGHT: 'right',
  SPACE: 'space',
  T: 't',
} as const;

// Настройки баланса игры
export const GAME_CONFIG = {
  // Гравитация
  GRAVITY: 0.2,
  // Сопротивление
  FRICTION: 0.8,
  // Скорость персонажа
  PLAYER_SPEED: 2,
  // Мощность прыжка
  PLAYER_JUMP_POWER: 2.5,
} as const;
