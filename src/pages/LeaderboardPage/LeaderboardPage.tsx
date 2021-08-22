import React from 'react';

import Page from 'layout/Page';
import Leaderboard from 'modules/Leaderboard/Leaderboard';
import { useAppDispatch, useAppSelector } from 'hooks';
import { increment, decrement } from 'store/sliser';

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

function LeaderboardPage({ title }: { title: string }): JSX.Element {
  const dispatch = useAppDispatch();
  const count = useAppSelector((state) => state.counter.points);

  return (
    <Page title={title}>
      <Leaderboard userList={mockUserList} />
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
      <div>{count}</div>
    </Page>
  );
}

export default LeaderboardPage;
