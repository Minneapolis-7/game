export default class GameObject {
  constructor(options = {}) {
    const {
      sprite = [0, 0],
      isUseCollision = false,
      z = 0,
      onOver = null,
      onAbove = null,
    } = options;

    this.sprite = sprite;
    this.isUseCollision = isUseCollision;
    this.z = z;
    this.onOver = onOver;
    this.onAbove = onAbove;
  }
}
