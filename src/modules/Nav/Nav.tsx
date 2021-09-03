import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { block } from 'bem-cn';

import paths from '@/shared/const/paths';

const b = block('nav');

const navItems = [
  {
    label: 'Главная',
    path: '/',
  },
  {
    label: 'Вход',
    path: paths.LOGIN,
  },
  {
    label: 'Регистрация',
    path: paths.REGISTER,
  },
  {
    label: 'Профиль',
    path: paths.PROFILE,
  },
  {
    label: 'Лидеры',
    path: paths.LEADERBOARD,
  },
  {
    label: 'Форум',
    path: paths.FORUM,
  },
  {
    label: 'Форум секция',
    path: paths.FORUM_SECTION,
  },
  {
    label: 'Форум тема',
    path: paths.FORUM_THREAD,
  },
  {
    label: 'Форум создать тему',
    path: paths.FORUM_THREAD_CREATE,
  },
];

function Nav(): JSX.Element {
  const { pathname } = useLocation();

  return (
    <nav className={b()}>
      <ul className={b('list').mix('nolist')}>
        {navItems.map((item) => {
          const isCurrent = item.path === pathname;
          const basicProps = {
            className: b('item-i'),
            children: item.label,
          };

          return (
            <li key={item.path} className={b('item', { current: isCurrent })}>
              {isCurrent ? <span {...basicProps} /> : <Link {...basicProps} to={item.path} />}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Nav;
