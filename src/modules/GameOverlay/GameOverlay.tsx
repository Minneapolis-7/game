import React, { useMemo } from 'react';
import { block } from 'bem-cn';

import healthImage from 'assets/img/game/overlay-health.png';
import keyImage from 'assets/img/game/overlay-key.png';
import lostHealthImage from 'assets/img/game/overlay-lost-health.png';

import './game-overlay.scss';

const b = block('game-overlay');

type GameOverlayProps = {
  className: string;
  maxHealth: number;
  health: number;
  hasKey: boolean;
  time: number;
};

function GameOverlay(props: GameOverlayProps): JSX.Element {
  const { maxHealth = 3, health = 0, className, hasKey, time = 0 } = props;

  const getHealthElement = useMemo(() => {
    return (
      <div className={b('bar-block')}>
        {Array.from({ length: maxHealth }).map((_, index) => {
          return health > index ? (
            <img className={b('health-icon')} src={healthImage} alt="" key={index} />
          ) : (
            <img className={b('lost-health-icon')} src={lostHealthImage} alt="" key={index} />
          );
        })}
      </div>
    );
  }, [maxHealth, health]);

  return (
    <div className={b({}).mix(className)}>
      {getHealthElement}
      {hasKey && (
        <div className={b('bar-block')}>
          <span className={b('bar-label')}>Ключ</span>
          <img className={b('health-icon')} src={keyImage} alt="" />
        </div>
      )}
      <div className={b('bar-block')}>
        <span className={b('time')}>
          {new Date(time).toLocaleTimeString([], { minute: '2-digit', second: '2-digit' })}
        </span>
      </div>
    </div>
  );
}

export default GameOverlay;
