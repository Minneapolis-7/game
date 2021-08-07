export const APP_SELECTOR = '.app';
export const CANVAS_SIZE = [640, 480];
export const CANVAS_BACKGROUND = '#000'
export const SPRITE_FILE = './assets/sprite.png';
export const SPRITE_ITEM_SIZE = [32, 32];

// Персонаж игрока на спрайтовой карте [x, y]
export const SPRITE_PLAYER = {
  STAY: [0, 0],
  RIGHT: [32, 0],
  LEFT: [64, 0],
}

// TODO: Возможность помещать на задний и передний план
export const TILES = {
  // Воздух
  0: [480, 480],
  // Кирпич
  1: [480, 0],
  // Бетон
  2: [448, 0],
  // Куст
  3: [480, 32]
}

export const PLAYER_DIRECTION = {
  LEFT: 'left',
  RIGHT: 'right',
}

// Настройки баланса игры
export const GAME_CONFIG = {
  // Ускорение при гравитации
  GRAVITY: 0.25,
  // Максимальное ускорение гравитации
  GRAVITY_MAX_SPEED: 6,
  // Максимальная скорость персонажа
  PLAYER_MAX_SPEED: 3,
  // Импульс торможения (- от скорости за фрейм)
  PLAYER_START_MOMENTUM: 0.025,
  // Импульс разбега (+ к скорости за фрейм)
  PLAYER_STOP_MOMENTUM: 0.1,
}
