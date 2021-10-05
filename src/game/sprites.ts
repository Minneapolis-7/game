import airSprite from '@/game/assets/sprites/air.png';
import brickSprite from '@/game/assets/sprites/brick.png';
import doorSprite from '@/game/assets/sprites/door.png';
import grassSprite from '@/game/assets/sprites/grass.png';
import iceSprite from '@/game/assets/sprites/ice.png';
import keySprite from '@/game/assets/sprites/key.png';
import playerSprite from '@/game/assets/sprites/player.png';
import portalASprite from '@/game/assets/sprites/portal-a.png';
import portalBSprite from '@/game/assets/sprites/portal-b.png';
import spikesSprite from '@/game/assets/sprites/spikes.png';
import trampolineSprite from '@/game/assets/sprites/trampoline.png';
import { SpriteRegisterOptions } from '@/game/types';

export const SPRITE_ID = {
  PLAYER: 'player',
  AIR: 'air',
  BRICK: 'brick',
  GRASS: 'grass',
  TRAMPOLINE: 'trampoline',
  ICE: 'ice',
  KEY: 'key',
  DOOR: 'door',
  SPIKES: 'spikes',
  PORTAL_A: 'portal-a',
  PORTAL_B: 'portal-b',
} as const;

export const sprites: SpriteRegisterOptions[] = [
  { id: SPRITE_ID.PLAYER, src: playerSprite },
  { id: SPRITE_ID.BRICK, src: brickSprite },
  { id: SPRITE_ID.AIR, src: airSprite },
  { id: SPRITE_ID.GRASS, src: grassSprite },
  { id: SPRITE_ID.TRAMPOLINE, src: trampolineSprite },
  { id: SPRITE_ID.ICE, src: iceSprite },
  { id: SPRITE_ID.KEY, src: keySprite },
  { id: SPRITE_ID.DOOR, src: doorSprite },
  { id: SPRITE_ID.SPIKES, src: spikesSprite },
  { id: SPRITE_ID.PORTAL_A, src: portalASprite },
  { id: SPRITE_ID.PORTAL_B, src: portalBSprite },
];