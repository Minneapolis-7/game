import React from 'react';
import { block } from 'bem-cn';

import Page from 'layout/Page';
// import Profile from 'modules/Profile';

const b = block('leaderboard');

const user = {
  firstName: 'Имя',
  secondName: 'Фамилия',
  displayName: 'Nickname',
  login: 'mylogin',
  email: 'my@email.com',
};

type TableRowProps = {
  label: string;
  value?: string;
  id: string;
  action?: string;
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
          <h3>Leaderbord</h3>
        </header>
        <div className={b('content')}>
          <h4 className={b('name').mix('heading')}>{user.firstName}</h4>
          <table className={b('table')}>
            <tbody className={b('table-body')}>
              <TableRow label="Почта" value={user.email} id="email" />
              <TableRow label="Логин" value={user.login} id="login" />
              <TableRow label="Имя" value={user.firstName} id="firstName" />
            </tbody>
          </table>
        </div>
      </div>
    </Page>
  );
}

export default LeaderboardPage;
