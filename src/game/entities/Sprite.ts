export default class Sprite {
  public src: string;
  public image: HTMLImageElement;

  constructor(src: string) {
    this.src = src;
    this.image = new Image();
  }

  load(): Promise<Sprite> {
    return new Promise((resolve, reject) => {
      this.image.src = this.src;

      this.image.onload = () => resolve(this);
      this.image.onerror = () => reject(new Error('Не удалось получить изображение спрайтов'));
    });
  }
}
