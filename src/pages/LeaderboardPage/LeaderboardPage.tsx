import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

import AppContext from '@/AppContext';
import { Spinner } from '@/components/ui';
import { ToastItem } from '@/components/ui/Toaster/Toast/types';
import Page from '@/layout/Page';
import Leaderboard from '@/modules/Leaderboard';
import { RATING_FIELD_NAME, TEAM_NAME } from '@/shared/const/const';
import translateErrorMessage from '@/shared/utils';
import { getTeamLeaderboard } from '@/store/reducers/actions';
import { useAppDispatch, useAppSelector } from '@/store/store';

function LeaderboardPage({ title }: GenericPageProps): JSX.Element {
  const leaderList = useAppSelector((state) => state.leaderboard.leaderList);
  const appContext = useContext(AppContext);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);

      try {
        const value = {
          ratingFieldName: RATING_FIELD_NAME,
          cursor: 0,
          limit: 10,
        };

        await dispatch(getTeamLeaderboard({ teamName: TEAM_NAME, value })).unwrap();
        setLoading(false);
      } catch (err) {
        setLoading(false);
        const toast = {
          type: 'warning',
          description: translateErrorMessage(err.reason),
        };

        appContext?.addToastMessage(toast as ToastItem);
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
