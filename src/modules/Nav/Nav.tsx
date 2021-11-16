import React from 'react';
import { generatePath, matchPath } from 'react-router';
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
    path: [paths.PROFILE, paths.PROFILE_EDIT, paths.PROFILE_EDIT_PASSWORD],
  },
  {
    label: txt.leaderboard,
    path: paths.LEADERBOARD,
  },
  {
    label: txt.forum,
    path: [paths.FORUM, paths.FORUM_SECTION, paths.FORUM_THREAD, paths.FORUM_THREAD_CREATE],
  },
];

function Nav(): JSX.Element {
  const { pathname } = useLocation();

  return (
    <nav className={b()}>
      <ul className={b('list').mix('nolist')}>
        {navItems.map((item) => {
          const pathMatch = matchPath(pathname, {
            path: item.path,
            exact: true,
          });
          const basicProps = {
            className: b('item-i'),
            children: item.label,
          };
          const mainPath = Array.isArray(item.path) ? item.path[0] : item.path;

          return (
            <li key={mainPath} className={b('item', { current: Boolean(pathMatch) })}>
              {pathMatch ? (
                <span {...basicProps} />
              ) : (
                <Link {...basicProps} to={generatePath(mainPath)} />
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Nav;
