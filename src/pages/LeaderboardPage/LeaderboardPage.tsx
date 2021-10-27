import React from 'react';
import { Helmet } from 'react-helmet';

import Page from '@/layout/Page';
import Leaderboard from '@/modules/Leaderboard';

function LeaderboardPage({ title }: GenericPageProps): JSX.Element {
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Page>
        <Leaderboard />
      </Page>
    </>
  );
}

export default LeaderboardPage;
