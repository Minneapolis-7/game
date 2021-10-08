import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { block } from 'bem-cn';

import { GameReactComponent } from '@/components';
import { Button, Icon } from '@/components/ui';
import { GameState } from '@/game/types';
import text from '@/shared/const/text';

import introImage from 'assets/img/game/intro.png';
import lossImage from 'assets/img/game/loss.png';
import winImage from 'assets/img/game/win.png';
import fullscreenSvg from 'bootstrap-icons/icons/fullscreen.svg';
import fullscreenExitSvg from 'bootstrap-icons/icons/fullscreen-exit.svg';

import './game-screen.scss';

const GAME_SCREEN = {
  START: 'start',
  PLAY: 'play',
  WIN: 'win',
  LOSS: 'loss',
};

const b = block('game-screen');
const { game: txt } = text;

function GameScreen(): JSX.Element {
  const [gameScreen, setGameScreen] = useState(GAME_SCREEN.START);
  const [fullscreen, setFullscreen] = useState(false);
  const [fullscreenSupport, setFullscreenSupport] = useState(false);

  const gameScreenRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (document.fullscreenElement === null && document.exitFullscreen) {
      setFullscreenSupport(true);
    }

    const listenFullscreen = () => {
      if (!document.fullscreenElement) {
        setFullscreen(false);
      }
    };

    document.addEventListener('fullscreenchange', listenFullscreen);

    return () => {
      document.removeEventListener('fullscreenchange', listenFullscreen);
    };
  }, []);

  useEffect(() => {
    if (!fullscreenSupport || !gameScreenRef.current) {
      return;
    }

    if (fullscreen) {
      gameScreenRef.current.requestFullscreen();
    }

    if (!fullscreen && document.fullscreenElement) {
      document.exitFullscreen();
    }
  }, [fullscreenSupport, fullscreen]);

  const handleToggleFullscreen = useCallback(() => {
    setFullscreen((prevValue) => !prevValue);
  }, [setFullscreen]);

  const fullscreenButtonElement = useMemo(() => {
    if (!fullscreenSupport) {
      return null;
    }

    return (
      <Button
        className={b('fullscreen-button')}
        theme="morphed"
        sizing="lg"
        icon={<Icon name={fullscreen ? fullscreenExitSvg.id : fullscreenSvg.id} scale={1.15} />}
        onClick={handleToggleFullscreen}
      />
    );
  }, [fullscreenSupport, fullscreen, handleToggleFullscreen]);

  const gameScreenElement = useMemo(() => {
    return {
      [GAME_SCREEN.START]: (
        <div className={b({ [GAME_SCREEN.START]: true, fullscreen })} ref={gameScreenRef}>
          {fullscreenButtonElement}
          <img className="liquid-img" src={introImage} alt="Персонаж игры в прыжке за ключом" />
          <Button onClick={handleGameStart} sizing="lg">
            {txt.playButton}
          </Button>
        </div>
      ),
      [GAME_SCREEN.PLAY]: (
        <div className={b({ [GAME_SCREEN.PLAY]: true, fullscreen })} ref={gameScreenRef}>
          {fullscreenButtonElement}
          <GameReactComponent onStateUpdate={handleStateUpdate} fullscreen={fullscreen} />
        </div>
      ),
      [GAME_SCREEN.WIN]: (
        <div className={b({ [GAME_SCREEN.WIN]: true, fullscreen })} ref={gameScreenRef}>
          {fullscreenButtonElement}
          <img className="liquid-img" src={winImage} alt="Персонаж игры выходит в открытые двери" />
          <h2 className="heading_2 heading">{txt.winText}</h2>
          <Button onClick={handleGameStart} sizing="lg">
            {txt.playMoreButton}
          </Button>
        </div>
      ),
      [GAME_SCREEN.LOSS]: (
        <div className={b({ [GAME_SCREEN.LOSS]: true, fullscreen })} ref={gameScreenRef}>
          {fullscreenButtonElement}
          <img className="liquid-img" src={lossImage} alt="Персонаж игры лежит после проигрыша" />
          <h2 className="heading_2 heading">{txt.lossText}</h2>
          <Button onClick={handleGameStart} sizing="lg">
            {txt.retryButton}
          </Button>
        </div>
      ),
    };
  }, [handleGameStart, fullscreenButtonElement, fullscreen]);

  return gameScreenElement[gameScreen];
}

export default GameScreen;
