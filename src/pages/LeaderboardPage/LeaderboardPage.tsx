import React from 'react';
import { block } from 'bem-cn';

import Page from 'layout/Page';

const b = block('leaderboard');

const mockUserList = [
  {
    id: 5,
    nickname: 'SchumacherSchumacherSchumacherSchumacher',
    points: 100,
  },
  {
    id: 7,
    nickname: 'Vettel',
    points: 98,
  },
  {
    id: 3,
    nickname: 'Senna',
    points: 86,
  },
  {
    id: 1,
    nickname: 'Alonso',
    points: 80,
  },
  {
    id: 15,
    nickname: 'Hamilton',
    points: 72,
  },
  {
    id: 4,
    nickname: 'Lauda',
    points: 68,
  },
];

type RowProps = {
  label: string;
  value: number;
};

function LeaderboardPage({ title }: { title: string }): JSX.Element {
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
    <Page title={title}>
      <div className={b()}>
        <header className={b('head')}>
          <h3>Рейтинг игроков</h3>
        </header>
        <div className={b('content')}>
          <ul className={b('players-list')}>
            {mockUserList.map((user) => {
              return <Row key={user.id} label={user.nickname} value={user.points} />;
            })}
          </ul>
        </div>
      </div>
    </Page>
  );
}

export default LeaderboardPage;
