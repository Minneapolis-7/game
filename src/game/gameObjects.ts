import { GAME_SESSION_KEY } from '@/game/shared/constants';
import makeAnimation from '@/game/shared/makeAnimation';
import { SOUND_ID } from '@/game/sounds';
import { SPRITE_ID } from '@/game/sprites';
import { GameObjectRegisterOptions } from '@/game/types';

export const GAME_OBJECT_ID = {
  AIR: 0,
  BRICK: 1,
  GRASS: 2,
  TRAMPOLINE: 3,
  ICE: 4,
  KEY: 5,
  DOOR: 6,
  SPIKES: 7,
  PORTAL_A: 8,
  PORTAL_B: 9,
} as const;

export const gameObjects: GameObjectRegisterOptions[] = [
  {
    id: GAME_OBJECT_ID.AIR,
    spriteId: SPRITE_ID.AIR,
    spriteWidth: 64,
    spriteHeight: 64,
    width: 32,
    height: 32,
  },
  {
    id: GAME_OBJECT_ID.BRICK,
    spriteId: SPRITE_ID.BRICK,
    spriteWidth: 64,
    spriteHeight: 64,
    width: 32,
    height: 32,
    hasCollision: true,
  },
  {
    id: GAME_OBJECT_ID.GRASS,
    spriteId: SPRITE_ID.GRASS,
    spriteWidth: 64,
    spriteHeight: 64,
    width: 32,
    height: 32,
    onOver: ({ target }): void => {
      target.setSpriteFrame(1);
    },
    onOut: ({ target }): void => {
      target.setSpriteFrame(0);
    },
  },
  {
    id: GAME_OBJECT_ID.TRAMPOLINE,
    spriteId: SPRITE_ID.TRAMPOLINE,
    spriteWidth: 64,
    spriteHeight: 64,
    width: 32,
    height: 32,
    onOver: ({ target, player, sound }): void => {
      player.setVelocityY(-10);
      sound.play(SOUND_ID.TRAMPOLINE);
      makeAnimation((frame) => target.setSpriteFrame(frame), [0, 1, 2, 1, 0], 1000 / 30);
    },
  },
  {
    id: GAME_OBJECT_ID.ICE,
    spriteId: SPRITE_ID.ICE,
    spriteWidth: 64,
    spriteHeight: 64,
    width: 32,
    height: 32,
    hasCollision: true,
    onAbove: ({ world }): void => {
      world.setFriction(0.99);
    },
  },
  {
    id: GAME_OBJECT_ID.KEY,
    spriteId: SPRITE_ID.KEY,
    spriteWidth: 64,
    spriteHeight: 64,
    width: 32,
    height: 32,
    onOver: ({ target, sound, setGameState }): void => {
      target.hideAndDeactivate();
      setGameState(GAME_SESSION_KEY.IS_KEY_ACQUIRED, true);
      sound.play(SOUND_ID.KEY);
    },
  },
  {
    id: GAME_OBJECT_ID.DOOR,
    spriteId: SPRITE_ID.DOOR,
    spriteWidth: 64,
    spriteHeight: 64,
    width: 32,
    height: 32,
    onOver: (params): void => {
      const { target, sound, gameState, setGameState } = params;

      if (gameState.isKeyAcquired) {
        setGameState(GAME_SESSION_KEY.IS_DOOR_UNLOCKED, true);
        target.setSpriteFrame(1);
        target.deactivate();
        sound.play(SOUND_ID.DOOR);

        setTimeout(() => {
          setGameState(GAME_SESSION_KEY.IS_LEVEL_COMPLETED, true);
        }, 2000);
      }
    },
  },
  {
    id: GAME_OBJECT_ID.SPIKES,
    spriteId: SPRITE_ID.SPIKES,
    spriteWidth: 64,
    spriteHeight: 64,
    width: 32,
    height: 32,
    onOver: (params): void => {
      const { player, sound, gameState, setGameState } = params;

      setGameState(GAME_SESSION_KEY.PLAYER_HEALTH, gameState.playerHealth - 1);
      player.setVelocityY(-2);

      if (player.vx > 0) {
        player.setVelocityX(-10);
      } else {
        player.setVelocityX(10);
      }

      sound.play(SOUND_ID.SPIKES);
    },
  },
  {
    id: GAME_OBJECT_ID.PORTAL_A,
    spriteId: SPRITE_ID.PORTAL_A,
    spriteWidth: 64,
    spriteHeight: 64,
    width: 32,
    height: 32,
    onOver: ({ player, world, sound }): void => {
      const otherPortal = world.levelObjects
        .flat()
        .find((object) => object.id === GAME_OBJECT_ID.PORTAL_B);

      if (otherPortal && otherPortal.x && otherPortal.y) {
        player.setX(otherPortal.x);
        player.setY(otherPortal.y);
        sound.play(SOUND_ID.TELEPORT);
      }
    },
  },
  {
    id: GAME_OBJECT_ID.PORTAL_B,
    spriteId: SPRITE_ID.PORTAL_B,
    spriteWidth: 64,
    spriteHeight: 64,
    width: 32,
    height: 32,
  },
];
