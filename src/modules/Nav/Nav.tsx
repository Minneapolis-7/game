import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { block } from 'bem-cn';

import paths from '@/shared/const/paths';
import text from '@/shared/const/text';

const b = block('nav');
const { nav: txt } = text;

const navItems = [
  {
    label: txt.main,
    path: '/',
  },
  {
    label: txt.login,
    path: paths.LOGIN,
  },
  {
    label: txt.register,
    path: paths.REGISTER,
  },
  {
    label: txt.profile,
    path: paths.PROFILE,
  },
  {
    label: txt.leaderboard,
    path: paths.LEADERBOARD,
  },
  {
    label: txt.forum,
    path: paths.FORUM,
  },
  {
    label: txt.forumSection,
    path: paths.FORUM_SECTION,
  },
  {
    label: txt.forumThread,
    path: paths.FORUM_THREAD,
  },
  {
    label: txt.forumThreadCreate,
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
