import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { block } from 'bem-cn';

import { GameReactComponent } from '@/components';
import { Button, Icon } from '@/components/ui';
import { GameState } from '@/game/types';
import { SizeLabels } from '@/shared/const/const';
import text from '@/shared/const/text';
import getLocaleTimeString from '@/shared/utils/getLocaleTimeString';

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
  const [levelNumber, setLevelNumber] = useState(1);
  const [totalTime, setTotalTime] = useState(0);
  const [points, setPoints] = useState(0);

  const gameScreenRef = useRef<HTMLDivElement>(null);

  const handleGameStart = useCallback(() => {
    setGameScreen(GAME_SCREEN.PLAY);
  }, []);

  const handleStateUpdate = (gameState: GameState | null) => {
    if (!gameState) {
      return;
    }

    setLevelNumber(gameState.level);
    setTotalTime(gameState.totalTime);
    setPoints(gameState.points);

    if (gameState.isGameCompleted) {
      setGameScreen(GAME_SCREEN.WIN);
    }

    if (gameState.playerHealth === 0) {
      setGameScreen(GAME_SCREEN.LOSS);
    }
  };

  useEffect(() => {
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
    if (!gameScreenRef.current) {
      return;
    }

    if (fullscreen) {
      gameScreenRef.current.requestFullscreen();
    }

    if (!fullscreen && document.fullscreenElement) {
      document.exitFullscreen();
    }
  }, [fullscreen]);

  const handleToggleFullscreen = useCallback(() => {
    setFullscreen((prevValue) => !prevValue);
  }, [setFullscreen]);

  const fullscreenButtonElement = useMemo(() => {
    return (
      <Button
        className={b('fullscreen-button')}
        theme="morphed"
        size={SizeLabels.LG}
        icon={<Icon name={fullscreen ? fullscreenExitSvg.id : fullscreenSvg.id} scale={1.15} />}
        onClick={handleToggleFullscreen}
      />
    );
  }, [fullscreen, handleToggleFullscreen]);

  const winScoreElement = useMemo(() => {
    return (
      <p>
        {text.game.pointsOnWin
          .replace('%levelNumber%', levelNumber)
          .replace(
            '%time%',
            getLocaleTimeString(totalTime, {
              minute: '2-digit',
              second: '2-digit',
              ms: 'numeric',
            })
          )
          .replace('%points%', points)}
      </p>
    );
  }, [levelNumber, totalTime, points]);

  const lossScoreElement = useMemo(() => {
    if (levelNumber - 1 === 0) {
      return <p>{text.game.pointsOnFirstLevel}</p>;
    }

    return (
      <p>
        {text.game.pointsOnLoss
          .replace('%levelNumber%', levelNumber)
          .replace(
            '%time%',
            getLocaleTimeString(totalTime, {
              minute: '2-digit',
              second: '2-digit',
              ms: 'numeric',
            })
          )
          .replace('%points%', points)}
      </p>
    );
  }, [levelNumber, totalTime, points]);

  const gameScreenElement = useMemo(() => {
    return {
      [GAME_SCREEN.START]: (
        <div className={b({ [GAME_SCREEN.START]: true, fullscreen })} ref={gameScreenRef}>
          {fullscreenButtonElement}
          <img
            className="liquid-img"
            src={introImage}
            width="410"
            height="491"
            alt="Персонаж игры в прыжке за ключом"
          />
          <Button onClick={handleGameStart} size={SizeLabels.LG}>
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
          <img
            className="liquid-img"
            src={winImage}
            width="413"
            height="396"
            alt="Персонаж игры выходит в открытые двери"
          />
          <h2 className="heading_2 heading">{txt.winText}</h2>
          {winScoreElement}
          <Button onClick={handleGameStart} size={SizeLabels.LG}>
            {txt.playMoreButton}
          </Button>
        </div>
      ),
      [GAME_SCREEN.LOSS]: (
        <div className={b({ [GAME_SCREEN.LOSS]: true, fullscreen })} ref={gameScreenRef}>
          {fullscreenButtonElement}
          <img
            className="liquid-img"
            src={lossImage}
            width="398"
            height="268"
            alt="Персонаж игры лежит после проигрыша"
          />
          <h2 className="heading_2 heading">{txt.lossText}</h2>
          {lossScoreElement}
          <Button onClick={handleGameStart} size={SizeLabels.LG}>
            {txt.retryButton}
          </Button>
        </div>
      ),
    };
  }, [handleGameStart, fullscreenButtonElement, fullscreen, lossScoreElement, winScoreElement]);

  return gameScreenElement[gameScreen];
}

export default GameScreen;
