import {
  CANVAS_SIZE_X,
  CANVAS_SIZE_Y,
  CANVAS_BACKGROUND,
  SPRITE_SIZE_X,
  SPRITE_SIZE_Y,
} from '../utils/constants.js';

export default class View {
  constructor(canvas, sprite) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    // Размеры полотна (экран игры)
    canvas.width  = CANVAS_SIZE_X;
    canvas.height = CANVAS_SIZE_Y;
    this.sprite = sprite;
    this.isDebugDraw = false;
    this.cleanScreen();
  }

  async init() {
    // Загрузка изображения со спрайтами
    await this.sprite.load();
  }

  update(world) {
    this.cleanScreen();
    this.renderLevelObjects(world.levelObjects);
    this.renderPlayer(world.player);
  }

  // Получает данные о уровне и отрисовывает его
  renderLevelObjects(levelObjects) {
    levelObjects.forEach((row, rowIndex) => {
      row.forEach((object, colIndex) => {
        this.ctx.drawImage(
          this.sprite.image,
          // Получаем координаты спрайта из игрового объекта
          ...object.sprite, SPRITE_SIZE_X, SPRITE_SIZE_Y,
          colIndex * SPRITE_SIZE_X, rowIndex * SPRITE_SIZE_Y, SPRITE_SIZE_X, SPRITE_SIZE_Y,
        );
      })
    })
  }

  // Получает данные о игроке и отрисовывает его
  renderPlayer(player) {
    this.ctx.drawImage(
      this.sprite.image,
      // Положение и размер спрайта игрока на карте спрайтов
      ...player.sprite, SPRITE_SIZE_X, SPRITE_SIZE_Y,
      // Положение и размер игрока на Canvas
      player.x, player.y, SPRITE_SIZE_X, SPRITE_SIZE_Y,
    );

    if (this.isDebugDraw) {
      this.ctx.beginPath();
      this.ctx.lineWidth = 2;
      this.ctx.strokeStyle = 'yellow';
      const { top, right, bottom, left } = player.collision
      this.ctx.strokeRect(left, top, right - left, bottom - top);
    }
  }

  // Очистка экрана
  cleanScreen() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = CANVAS_BACKGROUND;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
