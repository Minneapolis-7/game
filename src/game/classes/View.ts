import {
  CANVAS_SIZE_X,
  CANVAS_SIZE_Y,
  CANVAS_BACKGROUND,
  SPRITE_SIZE_X,
  SPRITE_SIZE_Y,
} from '../utils/constants';
import Sprite from './Sprite';
import GameObject from './GameObject';
import Player from './Player';
import World, { LevelObjects } from './World';
import { ControlKeysState } from '../types';

export default class View {
  public canvas: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D | null;
  public sprite: Sprite;
  public isDebugDraw: boolean;

  constructor(canvas: HTMLCanvasElement, sprite: Sprite) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    // Размеры полотна (экран игры)
    // eslint-disable-next-line no-param-reassign
    canvas.width = CANVAS_SIZE_X;
    // eslint-disable-next-line no-param-reassign
    canvas.height = CANVAS_SIZE_Y;
    this.sprite = sprite;
    this.isDebugDraw = false;
    this.cleanScreen();
  }

  async init(): Promise<void> {
    // Загрузка изображения со спрайтами
    await this.sprite.load();
  }

  update(world: World, control: ControlKeysState): void {
    this.cleanScreen();
    this.renderLevelObjects(world.levelObjects, control);
    this.renderPlayer(world.player);
  }

  // Получает данные о уровне и отрисовывает его
  renderLevelObjects(levelObjects: LevelObjects, control: ControlKeysState): void {
    if (!this.ctx) {
      return;
    }
    levelObjects.forEach((row: GameObject[], rowIndex) => {
      row.forEach((object, colIndex) => {
        this.ctx?.drawImage(
          this.sprite.image,
          // Получаем координаты спрайта из игрового объекта
          ...object.sprite,
          SPRITE_SIZE_X,
          SPRITE_SIZE_Y,
          colIndex * SPRITE_SIZE_X,
          rowIndex * SPRITE_SIZE_Y,
          SPRITE_SIZE_X,
          SPRITE_SIZE_Y
        );

        if (control.t && this.ctx) {
          this.ctx.lineWidth = 2;
          this.ctx.font = 'bold 10px sans-serif';
          this.ctx.strokeStyle = 'white';
          this.ctx.textAlign = 'center';
          this.ctx.textBaseline = 'middle';
          this.ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
          this.ctx.fillRect(
            colIndex * SPRITE_SIZE_X,
            rowIndex * SPRITE_SIZE_Y,
            SPRITE_SIZE_X,
            SPRITE_SIZE_Y
          );
          this.ctx.strokeRect(
            colIndex * SPRITE_SIZE_X,
            rowIndex * SPRITE_SIZE_Y,
            SPRITE_SIZE_X,
            SPRITE_SIZE_Y
          );
          this.ctx.fillStyle = 'black';
          this.ctx.fillText(
            `${colIndex}, ${rowIndex}`,
            (colIndex + 1) * SPRITE_SIZE_X - SPRITE_SIZE_X / 2,
            (rowIndex + 1) * SPRITE_SIZE_Y - SPRITE_SIZE_Y / 1.4,
            32
          );
          this.ctx.fillStyle = 'blue';
          this.ctx.fillText(
            `${object.id}`,
            (colIndex + 1) * SPRITE_SIZE_X - SPRITE_SIZE_X / 2,
            (rowIndex + 1) * SPRITE_SIZE_Y - SPRITE_SIZE_Y / 4,
            32
          );
        }
      });
    });
  }

  // Получает данные о игроке и отрисовывает его
  renderPlayer(player: Player): void {
    if (!this.ctx) {
      return;
    }
    this.ctx.drawImage(
      this.sprite.image,
      // Положение и размер спрайта игрока на карте спрайтов
      ...player.sprite,
      SPRITE_SIZE_X,
      SPRITE_SIZE_Y,
      // Положение и размер игрока на Canvas
      player.x,
      player.y,
      SPRITE_SIZE_X,
      SPRITE_SIZE_Y
    );

    if (this.isDebugDraw) {
      this.ctx.beginPath();
      this.ctx.lineWidth = 2;
      this.ctx.strokeStyle = 'yellow';
      const { top, right, bottom, left } = player.collision;
      this.ctx.strokeRect(left, top, right - left, bottom - top);
    }
  }

  // Очистка экрана
  cleanScreen(): void {
    if (!this.ctx) {
      return;
    }
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = CANVAS_BACKGROUND;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
