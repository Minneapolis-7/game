import { CONTROL } from '../utils/constants.js';
import GameObject from './GameObject.js';

export default class Game {
  constructor(options) {
    const {
      world,
      levels,
      view,
      control,
      isDebugDraw = false
    } = options;

    this.world = world;
    this.view = view;
    this.view.isDebugDraw = isDebugDraw;
    this.control = control;
    this.loop = this.loop.bind(this);
    this.requestAnimationId = 0;
    this.levels = levels
    this.isDoorUnlock = false;

    // Ключ объекта соответствует значению на карте уровня
    this.objects = {
      // Воздух
      0: {
        sprite: [480, 480],
        // Фикс ускорения при сходе с обрыва
        onAbove: ({ player }) => {
          if (player.velocityY > 10) {
            player.velocityY = 0;
          }
        }
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
          player.velocityY = -10;
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
          object.sprite = [32, 64]
          this.isDoorUnlock = true;
        },
      },
      // Дверь
      7: {
        sprite: [0, 96],
        onOver: ({ object }) => {
          if (this.isDoorUnlock) {
            object.sprite = [32, 96]
          }
        },
      }
    }
  }

  async init() {
    // Клавиши управления игрой (код клавиши, ключ состояния клавиши)
    this.control.addKey('ArrowLeft', CONTROL.LEFT);
    this.control.addKey('ArrowRight', CONTROL.RIGHT);
    this.control.addKey('Space', CONTROL.SPACE);

    await this.view.init();
    const levelObjects = this.buildLevelObjects(this.levels[0]);
    this.world.setLevelObjects(levelObjects);
    this.start();
  }

  buildLevelObjects(level) {
    return level.tiles.map((row) => {
      return row.map((tile) => new GameObject(this.objects[tile]))
    });
  }

  start() {
    this.loop();
  }

  stop() {
    window.cancelAnimationFrame(this.requestAnimationId);
  }

  loop() {
    // Обновляется мир, в мир передаётся текущее состояние клавиш
    this.world.update(this.control.keys);
    this.view.update(this.world);
    this.requestAnimationId = window.requestAnimationFrame(this.loop);
  }
}
