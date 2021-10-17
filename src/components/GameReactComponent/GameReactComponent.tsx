import React, { useEffect, useRef, useState } from 'react';
import { block } from 'bem-cn';

import game from '@/game';
import { GAME_CONFIG } from '@/game/shared/constants';
import { GameState } from '@/game/types';
import GameOverlay from '@/modules/GameOverlay';

import './game-react-component.scss';

const b = block('game-react-component');

type GameProps = {
  fullscreen: boolean;
  onStateUpdate: (gameSession: GameState | null) => void;
};

function GameReactComponent({ fullscreen, onStateUpdate }: GameProps): JSX.Element {
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

    game.view.registerCanvas(gameCanvasRef.current);
    game.onStateUpdate = setGameState;

    if (!game.isLoaded) {
      game.init();
    } else {
      game.proceed();
    }

    // eslint-disable-next-line consistent-return
    return () => game.stop();
  }, []);

  return (
    <div className={b({ fullscreen })}>
      <canvas ref={gameCanvasRef} className={b('canvas', { fullscreen })} />
      <GameOverlay
        className={b('overlay', { fullscreen })}
        maxHealth={GAME_CONFIG.MAX_HEALTH}
        health={gameState?.playerHealth || GAME_CONFIG.MAX_HEALTH}
        hasKey={gameState?.isKeyAcquired || false}
        time={gameState?.time || 0}
      />
    </div>
  );
}

export default GameReactComponent;
