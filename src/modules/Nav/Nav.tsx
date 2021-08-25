import React, { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import { block } from 'bem-cn';

import paths from '@/shared/const/paths';

const b = block('nav');

type NavProps = PropsWithChildren<{
  className?: string;
}>;

function Nav({ className = '' }: NavProps): JSX.Element {
  return (
    <nav className={b({}).mix(className.split(' '))}>
      <ul className={b('list')}>
        <li className={b('list-item')}>
          <Link to="/">Главная</Link>
        </li>
        <li className={b('list-item')}>
          <Link to={paths.LOGIN}>Вход</Link>
        </li>
        <li className={b('list-item')}>
          <Link to={paths.REGISTER}>Регистрация</Link>
        </li>
        <li className={b('list-item')}>
          <Link to={paths.PROFILE}>Профиль</Link>
        </li>
        <li className={b('list-item')}>
          <Link to={paths.LEADERBOARD}>Лидерборд</Link>
        </li>
        <li className={b('list-item')}>
          <Link to={paths.FORUM}>Форум</Link>
        </li>
        <li className={b('list-item')}>
          <Link to={paths.FORUM_SECTION}>Секция форума</Link>
        </li>
        <li className={b('list-item')}>
          <Link to={paths.FORUM_THREAD}>Тема форума</Link>
        </li>
        <li className={b('list-item')}>
          <Link to={paths.FORUM_THREAD_CREATE}>Создать тему</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
