import React from 'react';

import Page from '@/layout/Page';
import Leaderboard from '@/modules/Leaderboard/Leaderboard';

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
  return (
    <Page title={title}>
      <Leaderboard userList={mockUserList} />
    </Page>
  );
}

export default LeaderboardPage;
