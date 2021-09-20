import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';

import Page from '@/layout/Page';
import Leaderboard from '@/modules/Leaderboard';
import translateErrorMessage from '@/shared/utils';
import { getAllLeaderboard } from '@/store/reducers';
import { useAppDispatch, useAppSelector } from '@/store/store';

function LeaderboardPage({ title }: GenericPageProps): JSX.Element {
  const leaderboard = useAppSelector((state) => state.leaderboard.leaderboard);
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      try {
        const value = {
          ratingFieldName: 'points',
          cursor: 0,
          limit: 10,
        };

        await dispatch(getAllLeaderboard(value)).unwrap();
      } catch (err) {
        console.log('error', translateErrorMessage(err.message));
      }
    })();
  }, []);

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Page>
        <Leaderboard userList={leaderboard} />
      </Page>
    </>
  );
}

export default LeaderboardPage;
