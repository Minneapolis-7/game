import React, { useEffect, useRef, useState } from 'react';
import Game from '../../game/classes/Game';
import World from '../../game/classes/World';
import View from '../../game/classes/View';
import Control from '../../game/classes/Control';
import Sprite from '../../game/classes/Sprite';
import { SPRITES_FILE } from '../../game/shared/constants';
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

function GameReactComponent({ startLevelIndex = 0 }: GameProps): JSX.Element {
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

    const game = new Game({
      world: new World(),
      view: new View(gameCanvasRef.current, sprite),
      control: new Control(),
      levels,
      startLevelIndex,
      // Отрисовывать отладочную графику
      isDebugDraw: false,
      onStateUpdate: (newGameState: GameState) => {
        gameStateRef.current = newGameState;
        forceUpdate();
      },
    });

    game.init();

    // eslint-disable-next-line consistent-return
    return () => game.destroy();
    // TODO: Пересмотреть способ интеграции в React
  }, [startLevelIndex]);

  return (
    <section>
      <canvas ref={gameCanvasRef} />
      <pre>Тест передачи состояния в React: {JSON.stringify(gameState)}</pre>
    </section>
  );
}

export default GameReactComponent;
