import { CONTROL_KEY } from '../utils/constants';
import GameObject, { GameObjectConstructorOptions } from './GameObject';
import World, { LevelObjects } from './World';
import View from './View';
import Control from './Control';
import { GameState, Level } from '../types';

type GameConstructorOptions = {
  world: World;
  view: View;
  control: Control;
  levels: Level[];
  startLevelIndex: number;
  isDebugDraw: false;
  onGameStateUpdate: (gameState: GameState) => void;
};

export default class Game {
  public world: World;
  public view: View;
  public control: Control;
  public levels: Level[];
  public startLevelIndex: number;
  public requestAnimationId: number;
  public objects: Record<number, GameObjectConstructorOptions>;
  public gameState: GameState;
  public updateGameState: (gameState: GameState) => void;

  constructor(options: GameConstructorOptions) {
    const {
      world,
      levels,
      view,
      control,
      isDebugDraw = false,
      startLevelIndex,
      onGameStateUpdate,
    } = options;

    this.world = world;
    this.view = view;
    this.view.isDebugDraw = isDebugDraw;
    this.control = control;
    this.loop = this.loop.bind(this);
    this.requestAnimationId = 0;
    this.levels = levels;
    this.startLevelIndex = startLevelIndex;

    this.gameState = {
      isDoorUnlock: false,
      isLevelComplete: false,
    };

    this.updateGameState = onGameStateUpdate;

    // Ключ объекта соответствует значению на карте уровня
    this.objects = {
      // Воздух
      0: {
        sprite: [480, 480],
        // Фикс ускорения при сходе с обрыва
        onAbove: ({ player }) => {
          if (player.velocityY > 10) {
            player.setVelocityY(0);
          }
        },
      },
      // Кирпич
      1: { sprite: [480, 0], isUseCollision: true },
      // Бетон
      2: { sprite: [448, 0], isUseCollision: true },
      // Куст
      3: { sprite: [480, 32] },
      // Прыгалка
      4: {
        sprite: [480, 64],
        isUseCollision: true,
        onAbove: ({ player }) => {
          player.setVelocityY(-10);
        },
      },
      // Лёд
      5: {
        sprite: [480, 96],
        isUseCollision: true,
        onAbove: () => {
          // Скольжение
          this.world.friction = 0.99;
        },
      },
      // Ключ
      6: {
        sprite: [0, 64],
        onOver: ({ object }) => {
          object.setSprite([32, 64]);
          this.setGameState('isDoorUnlock', true);
        },
      },
      // Дверь
      7: {
        sprite: [0, 96],
        onOver: ({ object }) => {
          if (this.gameState.isDoorUnlock) {
            object.setSprite([32, 96]);
            this.setGameState('isLevelComplete', true);
          }
        },
      },
      // Шипы
      8: {
        sprite: [448, 64],
        onOver: ({ player }) => {
          player.setVelocityY(-2);
          if (player.velocityX > 0) {
            player.setVelocityX(-10);
          } else {
            player.setVelocityX(10);
          }
        },
      },
      // Оранжевый портал
      // TODO: Придумать телепортирование в друг-друга, здесь нельзя хардкодить координаты
      9: {
        sprite: [416, 64],
      },
      // Голубой портал
      10: {
        sprite: [384, 64],
        onOver: ({ player }) => {
          player.setVelocityY(0);
          player.setX(32);
          player.setY(128);
        },
      },
    };
  }

  setGameState(key: string, value: unknown): void {
    this.gameState[key] = value;
    this.updateGameState(this.gameState);
  }

  async init(): Promise<void> {
    // Клавиши управления игрой (код клавиши, ключ состояния клавиши)
    this.control.addKey('ArrowLeft', CONTROL_KEY.LEFT);
    this.control.addKey('ArrowRight', CONTROL_KEY.RIGHT);
    this.control.addKey('Space', CONTROL_KEY.SPACE);
    this.control.addKey('KeyT', CONTROL_KEY.T);

    await this.view.init();
    const levelObjects = this.buildLevelObjects(this.levels[this.startLevelIndex]);
    this.world.setLevelObjects(levelObjects);
    this.start();
    this.updateGameState(this.gameState);
  }

  buildLevelObjects(level: Level): LevelObjects {
    return level.tiles.map((row) => {
      return row.map((tile) => new GameObject({ ...this.objects[tile], id: tile }));
    });
  }

  start(): void {
    this.loop();
  }

  stop(): void {
    window.cancelAnimationFrame(this.requestAnimationId);
  }

  loop(): void {
    // Обновляется мир, в мир передаётся текущее состояние клавиш
    this.world.update(this.control.keys);
    this.view.update(this.world, this.control.keys);
    this.requestAnimationId = window.requestAnimationFrame(this.loop);
  }
}
