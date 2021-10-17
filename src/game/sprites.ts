import airSprite from '@/game/assets/sprites/air.png';
import badBrickSprite from '@/game/assets/sprites/bad-brick.png';
import brickSprite from '@/game/assets/sprites/brick.png';
import concreteSprite from '@/game/assets/sprites/concrete.png';
import doorSprite from '@/game/assets/sprites/door.png';
import grassSprite from '@/game/assets/sprites/grass.png';
import iceSprite from '@/game/assets/sprites/ice.png';
import keySprite from '@/game/assets/sprites/key.png';
import metalSprite from '@/game/assets/sprites/metal.png';
import metalBlockSprite from '@/game/assets/sprites/metal-block.png';
import metalFenceSprite from '@/game/assets/sprites/metal-fence.png';
import playerSprite from '@/game/assets/sprites/player.png';
import portalASprite from '@/game/assets/sprites/portal-a.png';
import portalBSprite from '@/game/assets/sprites/portal-b.png';
import spikesSprite from '@/game/assets/sprites/spikes.png';
import trampolineSprite from '@/game/assets/sprites/trampoline.png';
import woodFenceSprite from '@/game/assets/sprites/wood-fence.png';
import { SpriteRegisterOptions } from '@/game/types';

export const SPRITE_ID = {
  PLAYER: 'player',
  AIR: 'air',
  BRICK: 'brick',
  BAD_BRICK: 'bad-brick',
  GRASS: 'grass',
  TRAMPOLINE: 'trampoline',
  ICE: 'ice',
  KEY: 'key',
  DOOR: 'door',
  SPIKES: 'spikes',
  PORTAL_A: 'portal-a',
  PORTAL_B: 'portal-b',
  METAL: 'metal',
  METAL_BLOCK: 'metal-block',
  METAL_FENCE: 'metalFence',
  WOOD_FENCE: 'woodFence',
  CONCRETE: 'concrete',
} as const;

export const sprites: SpriteRegisterOptions[] = [
  { id: SPRITE_ID.PLAYER, src: playerSprite },
  { id: SPRITE_ID.BRICK, src: brickSprite },
  { id: SPRITE_ID.BAD_BRICK, src: badBrickSprite },
  { id: SPRITE_ID.AIR, src: airSprite },
  { id: SPRITE_ID.GRASS, src: grassSprite },
  { id: SPRITE_ID.TRAMPOLINE, src: trampolineSprite },
  { id: SPRITE_ID.ICE, src: iceSprite },
  { id: SPRITE_ID.KEY, src: keySprite },
  { id: SPRITE_ID.DOOR, src: doorSprite },
  { id: SPRITE_ID.SPIKES, src: spikesSprite },
  { id: SPRITE_ID.PORTAL_A, src: portalASprite },
  { id: SPRITE_ID.PORTAL_B, src: portalBSprite },
  { id: SPRITE_ID.METAL, src: metalSprite },
  { id: SPRITE_ID.METAL_FENCE, src: metalFenceSprite },
  { id: SPRITE_ID.WOOD_FENCE, src: woodFenceSprite },
  { id: SPRITE_ID.CONCRETE, src: concreteSprite },
  { id: SPRITE_ID.METAL_BLOCK, src: metalBlockSprite },
];
