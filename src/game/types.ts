import { SoundSampleConstructorOptions } from '@/game/entities/SoundSample';
import { SpriteConstructorOptions } from '@/game/entities/Sprite';

type Control = import('@/game/entities/Control').default;
type World = import('@/game/entities/World').default;
type View = import('@/game/entities/View').default;
type Player = import('@/game/entities/Player').default;
type GameObject = import('@/game/entities/GameObject').default;
type SoundController = import('@/game/entities/SoundController').default;

// Координата по горизонтали
export type X = number;

// Координата по вертикали
export type Y = number;

// 2D координаты [X, Y]
export type XYCoordinates = [X, Y];

// Векторная скорость по оси Y
export type VX = number;

// Векторная скорость по оси X
export type VY = number;

// Векторные скорости [VX, VY]
export type XYVelocities = [VX, VY];

// Ширина
export type Width = number;

// Высота
export type Height = number;

// Размер [Width, Height]
export type Size = [Width, Height];

// Позиция по горизонтали (по плитках)
export type PX = number;

// Позиция по вертикали (по плитках)
export type PY = number;

// 2D координаты позиции [PX, PY] (по плитках)
export type Position = [PX, PY];

// Бокс ограничивающий перемещение
export type HitBox = {
  top: number;
  left: number;
  bottom: number;
  right: number;
};

//
export type RegisteredKey = {
  key: string;
  state: boolean;
};

export type RegisteredKeys = Record<string, RegisteredKey>;

export type ControlKeysState = Record<string, boolean>;

export type SpriteRegisterOptions = SpriteConstructorOptions;

export type SoundRegisterOptions = SoundSampleConstructorOptions;

export type LevelMap = (number | string)[][];

export type LevelRegisterOptions = {
  id: number | string;
  startPosition: XYCoordinates;
  map: LevelMap;
  music: string;
};

// Состояние игровой сессии
export type GameState = {
  isKeyAcquired: boolean;
  isDoorUnlocked: boolean;
  isLevelCompleted: boolean;
  playerHealth: number;
  time: number;
};

export type GameEntities = {
  gameObjects: Record<number | string, GameObjectRegisterOptions>;
  control: Control;
  world: World;
  player: Player;
  view: View;
  sound: SoundController;
  gameState: GameState;
  setGameState: <T extends keyof GameState, K extends GameState[T]>(key: T, value: K) => void;
  isLoaded: boolean;
};

export type GameObjectCallbackParams = GameEntities & {
  target: GameObject;
};

export type GameObjectRegisterOptions = {
  id: number | string;
  spriteId: number | string;
  spriteWidth?: number;
  spriteHeight?: number;
  width: Width;
  height: Height;
  hasCollision?: boolean;
  z?: number;
  onOver?: (params: GameObjectCallbackParams) => void;
  onOut?: (params: GameObjectCallbackParams) => void;
  onAbove?: (params: GameObjectCallbackParams) => void;
};
