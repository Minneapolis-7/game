import React, { useCallback, useMemo, useState } from 'react';
import { block } from 'bem-cn';

import { GameReactComponent } from '@/components';
import { Button } from '@/components/ui';
import { GameState } from '@/game/types';

import introImage from 'assets/img/game/intro.png';
import lossImage from 'assets/img/game/loss.png';
import winImage from 'assets/img/game/win.png';

const GAME_SCREEN = {
  START: 'start',
  PLAY: 'play',
  WIN: 'win',
  LOSS: 'loss',
};

const b = block('game-screen');

function GameScreen(): JSX.Element {
  const [gameScreen, setGameScreen] = useState(GAME_SCREEN.START);

  const handleGameStart = useCallback(() => {
    setGameScreen(GAME_SCREEN.PLAY);
  }, []);

  const handleStateUpdate = (gameState: GameState | null) => {
    if (!gameState) {
      return;
    }

    if (gameState.isLevelCompleted) {
      setGameScreen(GAME_SCREEN.WIN);
    }

    if (gameState.playerHealth === 0) {
      setGameScreen(GAME_SCREEN.LOSS);
    }
  };

  const gameScreenElement = useMemo(() => {
    return {
      [GAME_SCREEN.START]: (
        <div className={b({ [GAME_SCREEN.START]: true })}>
          <img className="liquid-img" src={introImage} alt="Персонаж игры в прыжке за ключом" />
          <Button onClick={handleGameStart} sizing="lg">
            Играть
          </Button>
        </div>
      ),
      [GAME_SCREEN.PLAY]: (
        <div className={b({ [GAME_SCREEN.PLAY]: true })}>
          <GameReactComponent onStateUpdate={handleStateUpdate} />
        </div>
      ),
      [GAME_SCREEN.WIN]: (
        <div className={b({ [GAME_SCREEN.WIN]: true })}>
          <img className="liquid-img" src={winImage} alt="Персонаж игры выходит в открытые двери" />
          <h2 className="heading_2 heading">Победа!</h2>
          <Button onClick={handleGameStart} sizing="lg">
            Могу лучше!
          </Button>
        </div>
      ),
      [GAME_SCREEN.LOSS]: (
        <div className={b({ [GAME_SCREEN.LOSS]: true })}>
          <img className="liquid-img" src={lossImage} alt="Персонаж игры лежит после проигрыша" />
          <h2 className="heading_2 heading">Потрачено</h2>
          <Button onClick={handleGameStart} sizing="lg">
            Ещё раз!
          </Button>
        </div>
      ),
    };
  }, []);

  return gameScreenElement[gameScreen];
}

export default GameScreen;
