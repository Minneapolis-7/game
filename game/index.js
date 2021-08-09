import { APP_SELECTOR, SPRITES_FILE } from './utils/constants.js';
import Game from './classes/Game.js';
import World from './classes/World.js';
import View from './classes/View.js';
import Control from './classes/Control.js';
import Sprite from './classes/Sprite.js';
import levels from './levels';

const app = document.querySelector(APP_SELECTOR);

const canvas = document.createElement('canvas');
const sprite = new Sprite(SPRITES_FILE);

const game = new Game({
  world: new World(levels),
  view: new View(canvas, sprite),
  levels,
  control: new Control(),
  // Отрисовывать отладочную графику
  isDebugDraw: false,
});

game.init();

app.append(canvas);
