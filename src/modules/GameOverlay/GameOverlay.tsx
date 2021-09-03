import React from 'react';
import { block } from 'bem-cn';

import healthImage from 'assets/img/game/overlay-health.png';
import keyImage from 'assets/img/game/overlay-key.png';
import lostHealthImage from 'assets/img/game/overlay-lost-health.png';

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

  const getHealthElement = (total: number, number: number) => {
    return (
      <div className={b('bar-block')}>
        {Array.from({ length: total }).map((_, index) => {
          return number > index ? (
            <img className={b('health-icon')} src={healthImage} alt="" key={index} />
          ) : (
            <img className={b('lost-health-icon')} src={lostHealthImage} alt="" key={index} />
          );
        })}
      </div>
    );
  };

  return (
    <div className={b({}).mix(className)}>
      {getHealthElement(maxHealth, health)}
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
