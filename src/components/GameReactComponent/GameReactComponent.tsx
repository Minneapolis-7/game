import React, { useEffect, useRef, useState } from 'react';
import { block } from 'bem-cn';

import Control from '@/game/entities/Control';
import Game from '@/game/entities/Game';
import Sprite from '@/game/entities/Sprite';
import View from '@/game/entities/View';
import World from '@/game/entities/World';
import levels from '@/game/levels';
import { GAME_CONFIG, SPRITES_FILE } from '@/game/shared/constants';
import { GameState } from '@/game/types';
import GameOverlay from '@/modules/GameOverlay';

const b = block('game-react-component');

type GameProps = {
  startLevelIndex?: number;
  onStateUpdate: (gameState: GameState | null) => void;
};

function GameReactComponent({ startLevelIndex = 0, onStateUpdate }: GameProps): JSX.Element {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const gameCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (gameState) {
      onStateUpdate(gameState);
    }
  }, [onStateUpdate, gameState]);

  useEffect(() => {
    if (!gameCanvasRef.current) {
      return;
    }

    const game = new Game({
      world: new World(),
      view: new View(gameCanvasRef.current, new Sprite(SPRITES_FILE)),
      control: new Control(),
      levels,
      startLevelIndex,
      // Отрисовывать отладочную графику
      isDebugDraw: false,
      onStateUpdate: setGameState,
    });

    game.init();

    // eslint-disable-next-line consistent-return
    return () => game.destroy();
  }, [startLevelIndex]);

  return (
    <div className={b()}>
      <canvas ref={gameCanvasRef} />
      <GameOverlay
        className={b('overlay')}
        maxHealth={GAME_CONFIG.MAX_HEALTH}
        health={gameState?.playerHealth || GAME_CONFIG.MAX_HEALTH}
        hasKey={gameState?.isDoorUnlocked || false}
        time={gameState?.time || 0}
      />
    </div>
  );
}

export default GameReactComponent;
