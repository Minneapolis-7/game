import React from 'react';
import { Helmet } from 'react-helmet';

import Page from '@/layout/Page';
import GameScreen from '@/modules/GameScreen';

function MainPage({ title }: GenericPageProps): JSX.Element {
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Page centered>
        <GameScreen />
      </Page>
    </>
  );
}

export default MainPage;
