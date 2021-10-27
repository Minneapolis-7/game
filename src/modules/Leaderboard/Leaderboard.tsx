import React, { useContext, useEffect } from 'react';
import { block } from 'bem-cn';

import AppContext from '@/AppContext';
import { Spinner } from '@/components/ui';
import { ToastItem } from '@/components/ui/Toaster/Toast/types';
import { SizeLabels } from '@/shared/const/const';
import text from '@/shared/const/text';
import translateErrorMessage from '@/shared/utils';
import { getTeamLeaderboard } from '@/store/reducers/leaderboardReducers';
import { useAppDispatch, useAppSelector } from '@/store/store';

const b = block('leaderboard');
const { leaderboard: txt } = text;

type LeaderRowProps = {
  nickname: string;
  points: number;
  position: number;
};

function LeaderRow({ nickname, points, position }: LeaderRowProps): JSX.Element {
  return (
    <li data-position={position + 1} className={b('record')}>
      <div className={b('nickname')}>{nickname}</div>
      <div className={b('points')}>{points}</div>
    </li>
  );
}

function Leaderboard(): JSX.Element {
  const leaderList = useAppSelector((state) => state.leaderboard.leaderList);
  const isLoading = useAppSelector((state) => state.leaderboard.isLoading);
  const appContext = useContext(AppContext);
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      try {
        const requestData = {
          teamName: 'minneapolis',
          value: {
            ratingFieldName: 'points',
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
            <LeaderRow key={user.id} nickname={user.nickname} points={user.points} position={i} />
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
