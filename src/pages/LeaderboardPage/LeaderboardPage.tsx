import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';

import { Spinner } from '@/components/ui';
import Page from '@/layout/Page';
import Leaderboard from '@/modules/Leaderboard';
import translateErrorMessage from '@/shared/utils';
import { getAllLeaderboard } from '@/store/reducers';
import { useAppDispatch, useAppSelector } from '@/store/store';

function LeaderboardPage({ title }: GenericPageProps): JSX.Element {
  const leaderList = useAppSelector((state) => state.leaderboard.leaderList);
  const dispatch = useAppDispatch();
  let waiting = false;

  useEffect(() => {
    (async () => {
      try {
        const value = {
          ratingFieldName: 'points',
          cursor: 0,
          limit: 10,
        };

        waiting = true;
        await dispatch(getAllLeaderboard(value)).unwrap();
        waiting = false;
      } catch (err) {
        waiting = false;
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
        <Leaderboard userList={leaderList} />
        {waiting && <Spinner className="leaderboard__spinner" />}
      </Page>
    </>
  );
}

export default LeaderboardPage;
