import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { v1 as uuidv1 } from 'uuid';

import AppContext from '@/AppContext';
import { Spinner } from '@/components/ui';
import { ToastItem } from '@/components/ui/Toaster/Toast/types';
import Page from '@/layout/Page';
import Leaderboard from '@/modules/Leaderboard';
import translateErrorMessage from '@/shared/utils';
import { getAllLeaderboard } from '@/store/reducers';
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
          ratingFieldName: 'points',
          cursor: 0,
          limit: 10,
        };

        await dispatch(getAllLeaderboard(value)).unwrap();
        setLoading(false);
      } catch (err) {
        setLoading(false);
        const toast = {
          id: uuidv1(),
          type: 'warning',
          description: translateErrorMessage(err.reason),
          timeout: 5000,
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
