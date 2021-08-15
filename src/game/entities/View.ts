import {
  CANVAS_SIZE_X,
  CANVAS_SIZE_Y,
  CANVAS_BACKGROUND,
  SPRITE_SIZE_X,
  SPRITE_SIZE_Y,
} from 'game/shared/constants';
import Sprite from 'game/entities/Sprite';
import GameObject from 'game/entities/GameObject';
import Player from 'game/entities/Player';
import World, { LevelObjects } from 'game/entities/World';
import { ControlKeysState } from 'game/types';

export default class View {
  public canvas: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D | null;
  public sprite: Sprite;
  public isDebugDraw: boolean;

  constructor(canvas: HTMLCanvasElement, sprite: Sprite) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    // Размеры полотна (экран игры)
    this.canvas.width = CANVAS_SIZE_X;
    this.canvas.height = CANVAS_SIZE_Y;
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

  renderDebugLevelTiles(gameObject: GameObject, colIndex: number, rowIndex: number): void {
    if (this.ctx) {
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
        `${gameObject.id}`,
        (colIndex + 1) * SPRITE_SIZE_X - SPRITE_SIZE_X / 2,
        (rowIndex + 1) * SPRITE_SIZE_Y - SPRITE_SIZE_Y / 4,
        32
      );
    }
  }

  // Получает данные о уровне и отрисовывает его
  renderLevelObjects(levelObjects: LevelObjects, control: ControlKeysState): void {
    levelObjects.forEach((row: GameObject[], rowIndex) => {
      row.forEach((gameObject, colIndex) => {
        this.ctx?.drawImage(
          this.sprite.image,
          // Получаем координаты спрайта из игрового объекта
          ...gameObject.sprite,
          SPRITE_SIZE_X,
          SPRITE_SIZE_Y,
          colIndex * SPRITE_SIZE_X,
          rowIndex * SPRITE_SIZE_Y,
          SPRITE_SIZE_X,
          SPRITE_SIZE_Y
        );

        if (control.t) {
          this.renderDebugLevelTiles(gameObject, colIndex, rowIndex);
        }
      });
    });
  }

  renderDebugPlayerHitBox(player: Player): void {
    if (this.ctx) {
      this.ctx.beginPath();
      this.ctx.lineWidth = 2;
      this.ctx.strokeStyle = 'yellow';
      const { top, right, bottom, left } = player.hitBox;
      this.ctx.strokeRect(left, top, right - left, bottom - top);
    }
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
      this.renderDebugPlayerHitBox(player);
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
