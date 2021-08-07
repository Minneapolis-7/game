import { APP_SELECTOR, SPRITE_FILE } from './utils/constants.js';
import Game from './classes/Game.js';
import Sprite from './classes/Sprite.js';
import levels from './levels.js';
import World from './classes/World.js';
import View from './classes/View.js';

const app = document.querySelector(APP_SELECTOR);

const canvas = document.createElement('canvas');
const sprite = new Sprite(SPRITE_FILE)

const game = new Game({
  world: new World(levels),
  view: new View(canvas, sprite),
});

game.init();

// setTimeout(() => {
//   game.stop();
// }, 5000)

app.append(canvas);
