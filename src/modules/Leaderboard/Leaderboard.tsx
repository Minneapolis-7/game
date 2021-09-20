import React from 'react';
import { block } from 'bem-cn';

import text from '@/shared/const/text';

const b = block('leaderboard');
const { leaderboard: txt } = text;

type leaderUser = {
  id: number;
  nickname: string;
  points: number;
};

type LeaderboardProps = {
  userList: leaderUser[];
};

type RowProps = {
  label: string;
  value: number;
};

function Leaderboard({ userList }: LeaderboardProps): JSX.Element {
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
        {userList.length ? (
          <ul className={b('players-list')}>
            {userList.map((user) => {
              return <Row key={user.id} label={user.nickname} value={user.points} />;
            })}
          </ul>
        ) : (
          <div className={b('empty')}>{txt.empty}</div>
        )}
      </div>
    </div>
  );
}

export default Leaderboard;
