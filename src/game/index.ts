import Game from '@/game/entities/Game';
import { gameObjects } from '@/game/gameObjects';
import { levels } from '@/game/levels';
import { CONTROL_KEY, GAMEPAD_BUTTON } from '@/game/shared/constants';
import { sounds } from '@/game/sounds';
import { sprites } from '@/game/sprites';

const game = new Game();

game.registerSprites(sprites);
game.registerSounds(sounds);
game.registerGameObjects(gameObjects);
game.registerLevels(levels);

game.control.registerKey('ArrowLeft', CONTROL_KEY.LEFT, GAMEPAD_BUTTON.LEFT);
game.control.registerKey('ArrowRight', CONTROL_KEY.RIGHT, GAMEPAD_BUTTON.RIGHT);
game.control.registerKey('Space', CONTROL_KEY.SPACE, GAMEPAD_BUTTON.X);

export default game;
