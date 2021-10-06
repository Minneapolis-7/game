import Game from '@/game/entities/Game';
import { gameObjects } from '@/game/gameObjects';
import { levels } from '@/game/levels';
import { CONTROL_KEY } from '@/game/shared/constants';
import { sounds } from '@/game/sounds';
import { sprites } from '@/game/sprites';
import text from '@/shared/const/text';

const game = new Game();

game.registerSprites(sprites);
game.registerSounds(sounds);
game.registerGameObjects(gameObjects);
game.registerLevels(levels);

game.control.registerKey('ArrowLeft', CONTROL_KEY.LEFT, text.game.control.left);
game.control.registerKey('ArrowRight', CONTROL_KEY.RIGHT, text.game.control.right);
game.control.registerKey('Space', CONTROL_KEY.SPACE, text.game.control.jump);

export default game;
