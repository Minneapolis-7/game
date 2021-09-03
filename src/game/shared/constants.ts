import spritesFile from '@/game/assets/sprites.png';
import { XYCoordinates } from '@/game/types';

export const CANVAS_SIZE_X = 640;
export const CANVAS_SIZE_Y = 480;
export const CANVAS_BACKGROUND = '#000';
export const SPRITES_FILE: string = spritesFile;
export const SPRITE_SIZE_X = 32;
export const SPRITE_SIZE_Y = 32;

// Персонаж игрока на спрайтовой карте [x, y]
export const PLAYER_SPRITE_COORDS: Record<string, XYCoordinates> = {
  STATIONARY: [0, 0],
  MOVING_RIGHT: [32, 0],
  MOVING_LEFT: [64, 0],
};

export const CONTROL_KEY = {
  LEFT: 'left',
  RIGHT: 'right',
  SPACE: 'space',
  T: 't',
} as const;

export const SOUND = {
  TRAMPOLINE: 'trampoline',
  TELEPORT: 'teleport',
  KEY: 'key',
  SPIKES: 'spikes',
  DOOR: 'door',
  MUSIC: 'music',
} as const;

export const GAME_STATE_KEY = {
  IS_DOOR_UNLOCKED: 'isDoorUnlocked',
  IS_LEVEL_COMPLETED: 'isLevelCompleted',
  PLAYER_HEALTH: 'playerHealth',
  TIME: 'time',
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
  // Максимальное кол-во жизней
  MAX_HEALTH: 3,
} as const;
