import React from 'react';
import { Helmet } from 'react-helmet';

import Page from '@/layout/Page';
import GameScreen from '@/modules/GameScreen';
import text from '@/shared/const/text';

function MainPage(): JSX.Element {
  return (
    <>
      <Helmet>
        <title>{text.game.title}</title>
      </Helmet>
      <Page centered>
        <GameScreen />
      </Page>
    </>
  );
}

export default MainPage;
