// Координаты [x, y] в пикселях
export type XYCoordinates = [number, number];

// Коллизия игрока (описывающий её прямоугольник) в пикселях
export type CollisionBox = {
  top: number;
  left: number;
  bottom: number;
  right: number;
};

// Положение игрока в тайлах
export type PlayerPosition = {
  // Индекс тайла слева-направо
  x: number;
  // Индекс тайла сверху-вниз
  y: number;
  // Индекс тайла сверху-вниз над игроком
  top: number;
  // Индекс тайла слева-направо справа от игрока
  right: number;
  // Индекс тайла сверху-вниз под игроком
  bottom: number;
  // Индекс тайла слева-направо слева от игрока
  left: number;
};

// Управление
export type RegisteredKey = {
  key: string;
  state: boolean;
  cb?: () => void;
};

export type RegisteredKeys = Record<string, RegisteredKey>;
export type ControlKeysState = Record<string, boolean>;

// Основное состояние игры
export type GameState = {
  isDoorUnlocked: boolean;
  isLevelCompleted: boolean;
  playerHealth: number;
};

// Уровень
export type Level = {
  id: number | string;
  title: string;
  tiles: number[][];
};
