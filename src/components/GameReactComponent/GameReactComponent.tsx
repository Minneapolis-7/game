import React, { useEffect, useRef, useState } from 'react';
import Game from '../../game/classes/Game';
import World from '../../game/classes/World';
import View from '../../game/classes/View';
import Control from '../../game/classes/Control';
import Sprite from '../../game/classes/Sprite';
import { SPRITES_FILE } from '../../game/utils/constants';
import levels from '../../game/levels';
import { GameState } from '../../game/types';

type GameProps = {
  startLevelIndex?: number;
};

// Хук принудительного обновления
function useForceUpdate() {
  const [, setCounter] = useState(0);
  return () => setCounter((value) => value + 1);
}

// eslint-disable-next-line react/prop-types
const GameReactComponent: React.FC<GameProps> = ({ startLevelIndex = 0 }) => {
  const [gameState, setGameState] = useState({});
  const forceUpdate = useForceUpdate();
  const gameCanvasRef = useRef<HTMLCanvasElement>(null);
  const gameStateRef = useRef({});

  useEffect(() => {
    setGameState(gameStateRef.current);
  }, [forceUpdate]);

  useEffect(() => {
    if (!gameCanvasRef.current) {
      return;
    }

    const sprite = new Sprite(SPRITES_FILE);

    const gameReactComponent = new Game({
      world: new World(),
      view: new View(gameCanvasRef.current, sprite),
      control: new Control(),
      levels,
      startLevelIndex,
      // Отрисовывать отладочную графику
      isDebugDraw: false,
      onGameStateUpdate: (newGameState: GameState) => {
        gameStateRef.current = newGameState;
        forceUpdate();
      },
    });

    gameReactComponent.init();
  }, [startLevelIndex]);

  return (
    <section>
      <canvas ref={gameCanvasRef} />
      <pre>Тест передачи состояния в React: {JSON.stringify(gameState)}</pre>
    </section>
  );
};

export default GameReactComponent;
