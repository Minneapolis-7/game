import Player from './Player';

export type GameObjectConstructorOptions = {
  id?: number;
  sprite: [number, number];
  isUseCollision?: boolean;
  z?: number;
  onOver?: (target: { object: GameObject; player: Player }) => void;
  onAbove?: (target: { object: GameObject; player: Player }) => void;
};

export default class GameObject {
  public id: number;
  public sprite: [number, number];
  public isUseCollision: boolean;
  public z: number;
  public onOver?: (target: { object: GameObject; player: Player }) => void;
  public onAbove?: (target: { object: GameObject; player: Player }) => void;

  constructor(options: GameObjectConstructorOptions) {
    const { id = 0, sprite = [0, 0], isUseCollision = false, z = 0, onOver, onAbove } = options;

    this.id = id;
    this.sprite = sprite;
    this.isUseCollision = isUseCollision;
    this.z = z;
    this.onOver = onOver;
    this.onAbove = onAbove;
  }

  setSprite(sprite: [number, number]): void {
    this.sprite = sprite;
  }
}
