import React from 'react';

import Page from '@/layout/Page';
import GameScreen from '@/modules/GameScreen';

function MainPage({ title }: { title: string }): JSX.Element {
  return (
    <Page centered title={title}>
      <GameScreen />
    </Page>
  );
}

export default MainPage;
