import React, { useContext, useEffect } from 'react';
import { block } from 'bem-cn';

import AppContext from '@/AppContext';
import { Spinner } from '@/components/ui';
import { ToastItem } from '@/components/ui/Toaster/Toast/types';
import { RATING_FIELD_NAME, SizeLabels, TEAM_NAME } from '@/shared/const/const';
import text from '@/shared/const/text';
import translateErrorMessage from '@/shared/utils';
import { getTeamLeaderboard } from '@/store/reducers/leaderboardReducers';
import { useAppDispatch, useAppSelector } from '@/store/store';

const b = block('leaderboard');
const { leaderboard: txt } = text;

function Leaderboard(): JSX.Element {
  const leaderList = useAppSelector((state) => state.leaderboard.leaderList);
  const isLoading = useAppSelector((state) => state.leaderboard.isLoading);
  const appContext = useContext(AppContext);
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      try {
        const requestData = {
          teamName: TEAM_NAME,
          value: {
            ratingFieldName: RATING_FIELD_NAME,
            cursor: 0,
            // todo: сделать пагинацию
            limit: 100,
          },
        };

        await dispatch(getTeamLeaderboard(requestData)).unwrap();
      } catch (err) {
        const toast = {
          type: 'warning',
          description: translateErrorMessage(err.reason),
        };

        appContext?.addToastMessage(toast as ToastItem);
      }
    })();
  }, [appContext, dispatch]);

  let finalResult = null;

  if (leaderList) {
    finalResult = leaderList.length ? (
      <ul className={b('list').mix('nolist')}>
        {leaderList.map(({ data: user }, i) => {
          return (
            <li key={user.id} data-position={i + 1} className={b('record')}>
              <div className={b('nickname')}>{user.nickname}</div>
              <div className={b('points')}>{user.points}</div>
            </li>
          );
        })}
      </ul>
    ) : (
      <div className={b('empty')}>{txt.empty}</div>
    );
  }

  return (
    <div className={b()}>
      <h3 className={b('heading').mix('heading_3', 'heading')}>{txt.header}</h3>
      <div className={b('content')}>
        {isLoading ? (
          <>
            <div className={b('dimmer')} />
            <Spinner size={SizeLabels.LG} className={b('spinner')} />
          </>
        ) : (
          finalResult
        )}
      </div>
    </div>
  );
}

export default Leaderboard;
