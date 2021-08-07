export default class Sprite {
  constructor(src) {
    this.src = src;
    this.image = new Image();
  }

  load() {
    return new Promise((resolve, reject) => {
      this.image.src = this.src;
      this.image.onload = () => resolve(this);
      this.image.onerror = () => reject(new Error('Не удалось получить изображение спрайтов'));
    })
  }
}
