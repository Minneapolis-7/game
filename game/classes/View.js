import {
  SPRITE_ITEM_SIZE,
  CANVAS_SIZE,
  CANVAS_BACKGROUND,
  TILES
} from '../utils/constants.js';

export default class View {
  constructor(canvas, sprite) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    const [canvasWidth, canvasHeight] = CANVAS_SIZE;
    const [spriteWidth, spriteHeight] = SPRITE_ITEM_SIZE;
    canvas.width  = canvasWidth;
    canvas.height = canvasHeight;
    this.spriteWidth = spriteWidth;
    this.spriteHeight = spriteHeight;
    // Цвет фон Canvas
    this.ctx.fillStyle = CANVAS_BACKGROUND;
    // Залить фоном всь Canvas
    this.ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    this.sprite = sprite;
  }

  async init() {
    await this.sprite.load();
  }

  update(world) {
    this.cleanScreen();
    this.renderLevel(world.level);
    this.renderPlayer(world.player);
  }

  // TODO: Не перерисовывать уровень на каждый кадр
  renderLevel(level) {
    level.tiles.forEach((row, rowIndex) => {
      row.forEach((col, colIndex) => {
        this.ctx.drawImage(
          this.sprite.image,
          ...TILES[col], this.spriteWidth, this.spriteHeight,
          colIndex * this.spriteWidth, rowIndex * this.spriteHeight, this.spriteWidth, this.spriteHeight,
        );
      })
    })
  }

  renderPlayer(player) {
    this.ctx.drawImage(
      this.sprite.image,
      // Положение и размер объекта на карте спрайтов
      ...player.sprite, this.spriteWidth, this.spriteHeight,
      // Положение и размер на Canvas
      player.x, player.y, this.spriteWidth, this.spriteHeight,
    );
  }

  cleanScreen() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = CANVAS_BACKGROUND;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
