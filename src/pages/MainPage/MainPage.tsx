import React from 'react';

import { Spinner } from '@/components/ui';
import Page from '@/layout/Page';
import GameScreen from '@/modules/GameScreen';
import useOAuth from '@/shared/utils/hooks/useOAuth';

function MainPage({ title }: { title: string }): JSX.Element {
  const isAuthorizing = useOAuth();

  return isAuthorizing ? (
    <Spinner size="xl" />
  ) : (
    <Page centered title={title}>
      <GameScreen />
    </Page>
  );
}

export default MainPage;
