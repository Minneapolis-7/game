import doorSound from '@/game/assets/door.mp3';
import keySound from '@/game/assets/key.mp3';
import musicSound from '@/game/assets/music.mp3';
import spikesSound from '@/game/assets/spikes.mp3';
import teleportSound from '@/game/assets/teleport.mp3';
import trampolineSound from '@/game/assets/trampoline.mp3';
import Control from '@/game/entities/Control';
import GameObject, { GameObjectConstructorOptions } from '@/game/entities/GameObject';
import SoundController from '@/game/entities/SoundController';
import View from '@/game/entities/View';
import World, { LevelObjects } from '@/game/entities/World';
import { CONTROL_KEY, GAME_STATE_KEY, SOUND } from '@/game/shared/constants';
import { GameState, Level } from '@/game/types';

type GameConstructorOptions = {
  world: World;
  view: View;
  control: Control;
  levels: Level[];
  startLevelIndex: number;
  isDebugDraw: false;
  onStateUpdate: (gameState: GameState) => void;
};

export default class Game {
  public world: World;
  public view: View;
  public soundController: SoundController;
  public control: Control;
  public levels: Level[];
  public startLevelIndex: number;
  public requestAnimationId: number;
  public gameObjects: GameObjectConstructorOptions[];
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
      onStateUpdate,
    } = options;

    this.world = world;
    this.view = view;
    this.soundController = new SoundController();
    this.view.isDebugDraw = isDebugDraw;
    this.control = control;
    this.loop = this.loop.bind(this);
    this.requestAnimationId = 0;
    this.levels = levels;
    this.startLevelIndex = startLevelIndex;

    this.gameState = {
      isDoorUnlocked: false,
      isLevelCompleted: false,
      playerHealth: 3,
    };

    this.updateGameState = onStateUpdate;

    // id объекта соответствует значению на карте уровня
    this.gameObjects = [
      // Воздух
      {
        id: 0,
        sprite: [480, 480],
      },
      // Кирпич
      {
        id: 1,
        sprite: [480, 0],
        hasCollision: true,
      },
      // Бетон
      {
        id: 2,
        sprite: [448, 0],
        hasCollision: true,
      },
      // Куст
      {
        id: 3,
        sprite: [480, 32],
      },
      // Прыгалка
      {
        id: 4,
        sprite: [480, 64],
        hasCollision: true,
        onAbove: ({ player }) => {
          player.setVelocityY(-10);
          this.soundController.play(SOUND.TRAMPOLINE);
        },
      },
      // Лёд
      {
        id: 5,
        sprite: [480, 96],
        hasCollision: true,
        onAbove: () => {
          // Скольжение
          this.world.friction = 0.99;
        },
      },
      // Ключ
      {
        id: 6,
        sprite: [0, 64],
        onOver: ({ gameObject }) => {
          gameObject.hideAndDeactivate();
          this.setGameState(GAME_STATE_KEY.IS_DOOR_UNLOCKED, true);
          this.soundController.play(SOUND.KEY);
        },
      },
      // Дверь
      {
        id: 7,
        sprite: [0, 96],
        onOver: ({ gameObject }) => {
          if (this.gameState.isDoorUnlocked) {
            gameObject.setSprite([32, 96]);
            gameObject.deactivate();
            this.soundController.play(SOUND.DOOR);

            setTimeout(() => {
              this.setGameState(GAME_STATE_KEY.IS_LEVEL_COMPLETED, true);
            }, 2000);
          }
        },
      },
      // Шипы
      {
        id: 8,
        sprite: [448, 64],
        onOver: ({ player }) => {
          this.setGameState(GAME_STATE_KEY.PLAYER_HEALTH, this.gameState.playerHealth - 1);
          player.setVelocityY(-2);

          if (player.velocityX > 0) {
            player.setVelocityX(-10);
          } else {
            player.setVelocityX(10);
          }

          this.soundController.play(SOUND.SPIKES);
        },
      },
      // Оранжевый портал
      // TODO: Придумать телепортирование в друг-друга, здесь нельзя хардкодить координаты
      {
        id: 9,
        sprite: [416, 64],
      },
      // Голубой портал
      {
        id: 10,
        sprite: [384, 64],
        onOver: ({ player }) => {
          player.setVelocityY(0);
          player.setX(32);
          player.setY(128);
          this.soundController.play(SOUND.TELEPORT);
        },
      },
    ];
  }

  setGameState<T extends keyof GameState, K extends GameState[T]>(key: T, value: K): void {
    this.gameState[key] = value;
    this.updateGameState({ ...this.gameState });
  }

  // Клавиши управления игрой (код клавиши, ключ состояния клавиши)
  registerKeys(): void {
    this.control.addKey('ArrowLeft', CONTROL_KEY.LEFT);
    this.control.addKey('ArrowRight', CONTROL_KEY.RIGHT);
    this.control.addKey('Space', CONTROL_KEY.SPACE);
    this.control.addKey('KeyT', CONTROL_KEY.T);
  }

  async registerSounds(): Promise<void> {
    const sounds = [
      this.soundController.add(SOUND.TRAMPOLINE, trampolineSound, false),
      this.soundController.add(SOUND.TELEPORT, teleportSound, false),
      this.soundController.add(SOUND.KEY, keySound, false),
      this.soundController.add(SOUND.SPIKES, spikesSound, false),
      this.soundController.add(SOUND.DOOR, doorSound, false),
      this.soundController.add(SOUND.MUSIC, musicSound, true),
    ];

    await Promise.all(sounds);
  }

  async init(): Promise<void> {
    this.registerKeys();

    await this.registerSounds();

    await this.view.init();

    this.soundController.play(SOUND.MUSIC);

    const levelObjects = this.buildLevelObjects(this.levels[this.startLevelIndex]);

    this.world.setLevelObjects(levelObjects);
    this.start();
    this.updateGameState({ ...this.gameState });
  }

  buildLevelObjects(level: Level): LevelObjects {
    const indexedObjects = this.gameObjects.reduce((acc, gameObject) => {
      acc[gameObject.id] = gameObject;

      return acc;
    }, {} as Record<string | number, GameObjectConstructorOptions>);

    return level.tiles.map((row) => {
      return row.map((tile) => new GameObject(indexedObjects[tile]));
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

  destroy(): void {
    this.control.destroy();
    this.soundController.destroy();
  }
}
