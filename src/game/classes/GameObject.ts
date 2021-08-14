import Player from './Player';

export type GameObjectConstructorOptions = {
  id: number;
  sprite: [number, number];
  hasCollision?: boolean;
  z?: number;
  onOver?: (target: { object: GameObject; player: Player }) => void;
  onAbove?: (target: { object: GameObject; player: Player }) => void;
};

export default class GameObject {
  public id: number;
  public sprite: [number, number];
  public hasCollision: boolean;
  public z: number;
  public onOver?: (target: { object: GameObject; player: Player }) => void;
  public onAbove?: (target: { object: GameObject; player: Player }) => void;

  constructor(options: GameObjectConstructorOptions) {
    const { id = 0, sprite = [0, 0], hasCollision = false, z = 0, onOver, onAbove } = options;

    this.id = id;
    this.sprite = sprite;
    this.hasCollision = hasCollision;
    this.z = z;
    this.onOver = onOver;
    this.onAbove = onAbove;
  }

  setSprite(sprite: [number, number]): void {
    this.sprite = sprite;
  }
}
