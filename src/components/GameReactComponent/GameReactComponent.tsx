import React, { useEffect, useRef, useState } from 'react';
import Game from '../../game/entities/Game';
import World from '../../game/entities/World';
import View from '../../game/entities/View';
import Control from '../../game/entities/Control';
import Sprite from '../../game/entities/Sprite';
import { SPRITES_FILE } from '../../game/shared/constants';
import levels from '../../game/levels';
import { GameState } from '../../game/types';

type GameProps = {
  startLevelIndex?: number;
};

function GameReactComponent({ startLevelIndex = 0 }: GameProps): JSX.Element {
  const [gameState, setGameState] = useState<GameState | Record<string, unknown>>({});
  const gameCanvasRef = useRef<HTMLCanvasElement>(null);

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
    <section>
      <canvas ref={gameCanvasRef} />
      <p>Состояние игры в React:</p>
      <table>
        <thead>
          <tr>
            <td>Ключ</td>
            <td>Значение</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Здоровье</td>
            <td>{gameState.playerHealth as string}</td>
          </tr>
          <tr>
            <td>Дверь разблокирована</td>
            <td>{gameState.isDoorUnlocked ? 'Да' : 'Нет'}</td>
          </tr>
          <tr>
            <td>Уровень завершён</td>
            <td>{gameState.isLevelCompleted ? 'Да' : 'Нет'}</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}

export default GameReactComponent;
