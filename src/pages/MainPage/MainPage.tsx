import React, { useState } from 'react';
import { block } from 'bem-cn';

import Page from 'layout/Page';
import GameReactComponent from 'components/GameReactComponent/GameReactComponent';
import { GameState } from 'game/types';
import { Button } from 'components/ui';
import introImage from '../../../static/assets/img/game/intro.png';
import winImage from '../../../static/assets/img/game/win.png';
import lossImage from '../../../static/assets/img/game/loss.png';
import './main-page.scss';

const GAME_MENU = {
  INTRO: 'intro',
  WIN: 'win',
  LOSS: 'loss',
};

const b = block('main-page');

function MainPage({ title }: { title: string }): JSX.Element {
  const [isGameLaunched, setIsGameLaunched] = useState(false);
  const [gameMenu, setGameMenu] = useState(GAME_MENU.INTRO);

  const handleGameStart = () => {
    setIsGameLaunched(true);
  };

  const handleStateUpdate = (gameState: GameState | null) => {
    if (!gameState) {
      return;
    }

    if (gameState.isLevelCompleted) {
      setGameMenu(GAME_MENU.WIN);
      setIsGameLaunched(false);
    }

    if (gameState.playerHealth === 0) {
      setGameMenu(GAME_MENU.LOSS);
      setIsGameLaunched(false);
    }
  };

  const gameMenuElement = {
    [GAME_MENU.INTRO]: (
      <section className={b('intro')}>
        <img className={b('image')} src={introImage} alt="Персонаж игры в прыжке за ключом" />
        <Button onClick={handleGameStart}>Играть</Button>
      </section>
    ),
    [GAME_MENU.WIN]: (
      <section className={b('win')}>
        <img className={b('image')} src={winImage} alt="Персонаж игры выходит в открытые двери" />
        <h2 className="heading">Победа!</h2>
        <Button onClick={handleGameStart}>Могу лучше!</Button>
      </section>
    ),
    [GAME_MENU.LOSS]: (
      <section className={b('loss')}>
        <img className={b('image')} src={lossImage} alt="Персонаж игры лежит после проигрыша" />
        <h2 className="heading">Потрачено</h2>
        <Button onClick={handleGameStart}>Ещё раз!</Button>
      </section>
    ),
  };

  const gameElement = (
    <section className={b('game')}>
      <GameReactComponent onStateUpdate={handleStateUpdate} />
    </section>
  );

  return (
    <Page centered title={title}>
      <main className={b()}>{!isGameLaunched ? gameMenuElement[gameMenu] : gameElement}</main>
    </Page>
  );
}

export default MainPage;
