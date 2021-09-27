import React, { useEffect, useState } from 'react';
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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);

      try {
        const value = {
          ratingFieldName: 'points',
          cursor: 0,
          limit: 10,
        };

        await dispatch(getAllLeaderboard(value)).unwrap();
        setLoading(false);
      } catch (err) {
        setLoading(false);
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
        <Leaderboard leaderList={leaderList} />
        {loading && (
          <>
            <div className="leaderboard__shadow" />
            <Spinner className="leaderboard__spinner" />
          </>
        )}
      </Page>
    </>
  );
}

export default LeaderboardPage;
