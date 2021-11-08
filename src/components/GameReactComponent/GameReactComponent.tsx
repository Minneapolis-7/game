import React, { useEffect, useRef, useState } from 'react';
import { block } from 'bem-cn';

import game from '@/game';
import { GAME_CONFIG } from '@/game/shared/constants';
import { GameState } from '@/game/types';
import GameOverlay from '@/modules/GameOverlay';
import { RATING_FIELD_NAME, TEAM_NAME } from '@/shared/const/const';
import { addToLeaderboard } from '@/store/reducers/leaderboardReducers';
import { useAppDispatch, useAppSelector } from '@/store/store';

import './game-react-component.scss';

const b = block('game-react-component');

type GameProps = {
  fullscreen: boolean;
  onStateUpdate: (gameSession: GameState | null) => void;
};

function GameReactComponent({ fullscreen, onStateUpdate }: GameProps): JSX.Element {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const gameCanvasRef = useRef<HTMLCanvasElement>(null);
  const prevScoreRef = useRef(0);
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    if (gameState) {
      onStateUpdate(gameState);

      if (!user.yandexUserId) {
        return;
      }

      if (gameState.level - 1 > 0 && prevScoreRef.current !== gameState.points) {
        dispatch(
          addToLeaderboard({
            data: {
              id: user.yandexUserId,
              nickname: user.login,
              points: gameState.points,
            },
            teamName: TEAM_NAME,
            ratingFieldName: RATING_FIELD_NAME,
          })
        );

        prevScoreRef.current = gameState.points;
      }
    }
  }, [onStateUpdate, gameState, dispatch]);

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
