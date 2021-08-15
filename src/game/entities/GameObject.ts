import Player from 'game/entities/Player';

export type GameObjectConstructorOptions = {
  id: number;
  sprite: [number, number];
  hasCollision?: boolean;
  // Глубина отображения блока. 0 за игроком, 1 перед ним
  z?: 0 | 1;
  onOver?: (target: { gameObject: GameObject; player: Player }) => void;
  onAbove?: (target: { gameObject: GameObject; player: Player }) => void;
};

export default class GameObject {
  public id: number;
  public sprite: [number, number];
  public hasCollision: boolean;
  public z: 0 | 1;
  public onOver?: (target: { gameObject: GameObject; player: Player }) => void;
  public onAbove?: (target: { gameObject: GameObject; player: Player }) => void;

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
