import React from 'react';
import { Helmet } from 'react-helmet';

import { Spinner } from '@/components/ui';
import Page from '@/layout/Page';
import GameScreen from '@/modules/GameScreen';
import { SizeLabels } from '@/shared/const/const';
import useOAuth from '@/shared/utils/hooks/useOAuth';

function MainPage({ title }: GenericPageProps): JSX.Element {
  const isAuthorizing = useOAuth();

  return isAuthorizing ? (
    <Spinner size={SizeLabels.XL} />
  ) : (
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
