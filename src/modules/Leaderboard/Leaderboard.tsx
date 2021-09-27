import React from 'react';
import { block } from 'bem-cn';

import { Pagination } from '@/components/ui';
import paths from '@/shared/const/paths';
import text from '@/shared/const/text';

const LEADERBOARD_PAGE_SIZE = 8;

const b = block('leaderboard');
const { leaderboard: txt } = text;

type leaderUser = {
  id: number;
  nickname: string;
  points: number;
};

type LeaderboardProps = {
  leaderList: leaderUser[];
};

type RowProps = {
  label: string;
  value: number;
};

function Leaderboard({ leaderList }: LeaderboardProps): JSX.Element {
  function Row({ label, value }: RowProps): JSX.Element {
    return (
      <li>
        <div className={b('wrapper-row')}>
          <div className={b('nickname')}>{label}</div>
          <div className={b('points')}>{value || '\u200B'}</div>
        </div>
        <hr className={b('bottom-line')}></hr>
      </li>
    );
  }

  return (
    <div className={b()}>
      <header className={b('head')}>
        <h3>{txt.header}</h3>
      </header>
      <div className={b('content')}>
        {leaderList.length ? (
          <ul className={b('players-list')}>
            {leaderList.map((user) => {
              return <Row key={user.id} label={user.nickname} value={user.points} />;
            })}
          </ul>
        ) : (
          <div className={b('empty')}>{txt.empty}</div>
        )}
      </div>
      {leaderList.length >= LEADERBOARD_PAGE_SIZE && (
        <Pagination
          total={10}
          current={1}
          baseURL={`${paths.LEADERBOARD}/page`}
          className={b('pagination')}
        />
      )}
    </div>
  );
}

export default Leaderboard;
