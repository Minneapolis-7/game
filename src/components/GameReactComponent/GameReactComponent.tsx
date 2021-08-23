import React, { useEffect, useRef, useState } from 'react';
import Game from '@/game/entities/Game';
import World from '@/game/entities/World';
import View from '@/game/entities/View';
import Control from '@/game/entities/Control';
import Sprite from '@/game/entities/Sprite';
import { SPRITES_FILE } from '@/game/shared/constants';
import levels from '@/game/levels';
import { GameState } from '@/game/types';

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

  return <canvas ref={gameCanvasRef} />;
}

export default GameReactComponent;
