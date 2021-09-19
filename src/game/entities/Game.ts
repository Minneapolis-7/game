import Control from '@/game/entities/Control';
import GameObject from '@/game/entities/GameObject';
import Player from '@/game/entities/Player';
import SoundController from '@/game/entities/SoundController';
import SoundSample from '@/game/entities/SoundSample';
import Sprite from '@/game/entities/Sprite';
import View from '@/game/entities/View';
import World from '@/game/entities/World';
import { GAME_SESSION_KEY, SPRITE_HEIGHT, SPRITE_WIDTH } from '@/game/shared/constants';

import { SPRITE_ID } from '../sprites';
import {
  GameEntities,
  GameObjectRegisterOptions,
  GameState,
  LevelRegisterOptions,
  SoundRegisterOptions,
  SpriteRegisterOptions,
} from '../types';

export default class Game {
  public registeredSprites: SpriteRegisterOptions[];
  public registeredSounds: SoundRegisterOptions[];
  public registeredGameObjects: GameObjectRegisterOptions[];
  public registeredLevels: LevelRegisterOptions[];
  public sprites: Record<number | string, Sprite>;
  public sounds: Record<number | string, SoundSample>;
  public gameObjectConstructors: Record<number | string, GameObjectRegisterOptions>;
  public world: World;
  public control: Control;
  public player: Player;
  public view: View;
  public sound: SoundController;
  public isLoaded: boolean;
  private requestAnimationId: number;
  public gameState: GameState;
  public onStateUpdate: (gameSession: GameState) => void;

  private _gameStartTimestamp!: number;

  private _defaultGameState = {
    isKeyAcquired: false,
    isDoorUnlocked: false,
    isLevelCompleted: false,
    playerHealth: 3,
    time: 0,
  } as GameState;

  constructor() {
    this.registeredSprites = [];
    this.registeredSounds = [];
    this.registeredGameObjects = [];
    this.registeredLevels = [];

    this.sprites = {};
    this.sounds = {};
    this.gameObjectConstructors = {};

    this.control = new Control();
    this.world = new World();
    this.player = new Player();
    this.view = new View();
    this.sound = new SoundController();

    this.isLoaded = false;
    this.requestAnimationId = 0;

    this.gameState = { ...this._defaultGameState };

    this.onStateUpdate = () => undefined;

    this.loop = this.loop.bind(this);
    this.setGameState = this.setGameState.bind(this);
  }

  public registerSprites(sprites: SpriteRegisterOptions[]): void {
    this.registeredSprites = sprites;
  }

  public registerSounds(sounds: SoundRegisterOptions[]): void {
    this.registeredSounds = sounds;
  }

  public registerGameObjects(gameObjects: GameObjectRegisterOptions[]): void {
    this.registeredGameObjects = gameObjects;
  }

  public registerLevels(levels: LevelRegisterOptions[]): void {
    this.registeredLevels = levels;
  }

  private prepareSprite = (sprite: Sprite) => {
    if (this.sprites[sprite.id]) {
      throw Error('Идентификатор спрайтов должен быть уникальным');
    }

    this.sprites[sprite.id] = sprite;
  };

  private async prepareSprites() {
    const sprites = this.registeredSprites.map((options) => new Sprite(options));

    sprites.forEach(this.prepareSprite);

    const loads = sprites.map((sprite) => sprite.load());

    await Promise.all(loads);
    this.isLoaded = true;
  }

  private prepareSound = (sound: SoundSample): void => {
    if (this.sounds[sound.id]) {
      throw Error('Идентификатор звуков должен быть уникальным');
    }

    this.sound?.add(sound);
  };

  private async prepareSounds() {
    const sounds = this.registeredSounds.map((options) => new SoundSample(options));

    const loads = sounds.map((sound) => sound.load());

    await Promise.all(loads);
    sounds.forEach(this.prepareSound);
    this.isLoaded = true;
  }

  private prepareGameObject = (gameObject: GameObjectRegisterOptions) => {
    if (this.gameObjectConstructors[gameObject.id]) {
      throw Error('Идентификатор игровых объектов должен быть уникальным');
    }

    this.gameObjectConstructors[gameObject.id] = gameObject;
  };

  private prepareGameObjects() {
    this.registeredGameObjects.forEach(this.prepareGameObject);

    return this.gameObjectConstructors;
  }

  private prepareLevel() {
    const currentRegisterLevel = this.registeredLevels[0];

    this.sound?.play(currentRegisterLevel.music);

    this.world.setStartPosition(currentRegisterLevel.startPosition);

    const levelObjects = currentRegisterLevel.map.map((row, rowIndex) => {
      return row.map((objectId, colIndex) => {
        if (!this.gameObjectConstructors[objectId]) {
          throw Error(`Ошибка создания уровня. Игровой блок "${objectId}" не зарегистрирован`);
        }

        const { spriteId } = this.gameObjectConstructors[objectId];

        if (!this.sprites[spriteId]) {
          throw Error(`Ошибка создания уровня. Спрайт "${spriteId}" не зарегистрирован`);
        }

        return new GameObject({
          ...this.gameObjectConstructors[objectId],
          sprite: this.sprites[spriteId],
          x: colIndex * SPRITE_WIDTH,
          y: rowIndex * SPRITE_HEIGHT,
        });
      });
    });

    this.world.setLevelObjects(levelObjects);
  }

  private preparePlayer() {
    this.player.sprite = this.sprites[SPRITE_ID.PLAYER];
    this.player.spriteWidth = 64;
    this.player.spriteHeight = 64;
  }

  async init(callback?: (gameEntities: GameEntities) => void): Promise<void> {
    await this.prepareSprites();
    await this.prepareSounds();
    this.start();

    if (callback) {
      callback(this.gameEntities);
    }
  }

  private _resetGameState(): void {
    this.gameState = { ...this._defaultGameState };
  }

  setGameState<T extends keyof GameState, K extends GameState[T]>(key: T, value: K): void {
    this.gameState[key] = value;

    if (this.onStateUpdate) {
      this.onStateUpdate({ ...this.gameState });
    }
  }

  get gameEntities(): GameEntities {
    return {
      gameObjects: this.gameObjectConstructors,
      control: this.control,
      world: this.world,
      player: this.player,
      view: this.view,
      sound: this.sound,
      isLoaded: this.isLoaded,
      gameState: this.gameState,
      setGameState: this.setGameState,
    };
  }

  loop(): void {
    this.world.update(this.gameEntities);
    this.player.update(this.gameEntities);
    this.view.update(this.gameEntities);

    this.requestAnimationId = window.requestAnimationFrame(this.loop);

    const elapsedTime = Date.now() - this._gameStartTimestamp;

    if (
      !this.gameState[GAME_SESSION_KEY.IS_DOOR_UNLOCKED] &&
      elapsedTime - this.gameState.time >= 1000
    ) {
      this.setGameState(GAME_SESSION_KEY.TIME, elapsedTime);
    }
  }

  resetGameObjects(): void {
    this.gameObjectConstructors = {};
    this.prepareGameObjects();
  }

  start(): void {
    this.resetGameObjects();
    this.prepareLevel();
    this.preparePlayer();
    this.player.init(this.gameEntities);
    this.control.init();
    this._gameStartTimestamp = Date.now();
    this.loop();
  }

  reset(): void {
    this.player.restoreDefault();
    this.world.destroy();
    this._resetGameState();
    this.start();
  }

  stop(): void {
    this.control.destroy();
    this.sound.stop(this.registeredLevels[0].music);

    window.cancelAnimationFrame(this.requestAnimationId);
  }

  destroy(): void {
    this.stop();
    this.player.restoreDefault();
    this._resetGameState();
  }
}
