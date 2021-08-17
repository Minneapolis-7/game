import React from 'react';
import { block } from 'bem-cn';

import Page from 'layout/Page';
// import Profile from 'modules/Profile';

const b = block('leaderboard');

const mockUserList = [
  {
    id: 5,
    nickname: 'Schumacher',
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
    id: 15,
    nickname: 'Hamilton',
    points: 72,
  },
];

type TableRowProps = {
  label: string;
  value?: number;
};

function LeaderboardPage({ title }: { title: string }): JSX.Element {
  function TableRow({ label, value }: TableRowProps): JSX.Element {
    // ZERO-WIDTH-SPACE (\u200B) — на случай, если `value` пуст, нужно для выравнвиания текста

    return (
      <tr className={b('table-row')}>
        <th className={b('table-cell')}>
          <span className={b('field')}>{label}</span>
        </th>
        <td className={b('table-cell')}>
          <span className={b('field')}>{value || '\u200B'}</span>
        </td>
      </tr>
    );
  }

  return (
    <Page title={title}>
      <div className={b()}>
        <header className={b('head')}>
          <h3>Рейтинг игроков</h3>
        </header>
        <div className={b('content')}>
          <table className={b('table')}>
            <tbody className={b('table-body')}>
              {mockUserList.map((user) => {
                return <TableRow key={user.id} label={user.nickname} value={user.points} />;
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Page>
  );
}

export default LeaderboardPage;
