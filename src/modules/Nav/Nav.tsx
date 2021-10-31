import React from 'react';
import { generatePath } from 'react-router';
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
    label: txt.profile,
    path: generatePath(paths.PROFILE),
  },
  {
    label: txt.leaderboard,
    path: paths.LEADERBOARD,
  },
  {
    label: txt.forum,
    path: paths.FORUM,
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
