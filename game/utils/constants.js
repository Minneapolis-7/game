export const APP_SELECTOR = '.app';
export const CANVAS_SIZE = [640, 480];
export const CANVAS_BACKGROUND = '#000'
export const SPRITES_FILE = './assets/sprites.png';
export const SPRITE_SIZE = [32, 32];

// Персонаж игрока на спрайтовой карте [x, y]
export const SPRITE_PLAYER = {
  STAY: [0, 0],
  RIGHT: [32, 0],
  LEFT: [64, 0],
}

// TODO: Возможность помещать на задний и передний план
// TODO: Придумать класс для регистрации тайлов в игре
export const TILES = {
  // Воздух
  0: [480, 480],
  // Кирпич
  1: [480, 0],
  // Бетон
  2: [448, 0],
  // Куст
  3: [480, 32],
  // Прыгалка
  4: [480, 64],
}

export const PLAYER_DIRECTION = {
  LEFT: 'left',
  RIGHT: 'right',
}

// Настройки баланса игры
export const GAME_CONFIG = {
  // Гравитация
  GRAVITY: 0.2,
  // Сопротивление
  FRICTION: 0.95,
  // Скорость персонажа
  PLAYER_SPEED: 3,
  // Мощность прыжка
  PLAYER_JUMP_POWER: 2,
}
