import React from 'react';
import { Helmet } from 'react-helmet';

import Page from '@/layout/Page';
import Leaderboard from '@/modules/Leaderboard';
import text from '@/shared/const/text';

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

function LeaderboardPage(): JSX.Element {
  return (
    <>
      <Helmet>
        <title>{text.leaderboard.title}</title>
      </Helmet>
      <Page>
        <Leaderboard userList={mockUserList} />
      </Page>
    </>
  );
}

export default LeaderboardPage;
