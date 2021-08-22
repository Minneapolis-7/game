import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import RootErrorBoundary from 'modules/RootErrorBoundary';
import paths from 'shared/const/paths';
import routes from 'shared/const/routes';

import 'css/main.scss';

ReactDOM.render(
  <RootErrorBoundary>
    <Router>
      {/* навигация для теста, подлежит удалению */}
      <nav style={{ position: 'absolute', left: 0, right: 0, backgroundColor: 'red' }}>
        <ul className="nolist">
          <li style={{ display: 'inline-block', padding: '.2em 1em' }}>
            <Link to="/">Логин на главной</Link>
          </li>
          <li style={{ display: 'inline-block', padding: '.2em 1em' }}>
            <Link to={paths.LOGIN}>Логин</Link>
          </li>
          <li style={{ display: 'inline-block', padding: '.2em 1em' }}>
            <Link to={paths.REGISTER}>Регистрация</Link>
          </li>
          <li style={{ display: 'inline-block', padding: '.2em 1em' }}>
            <Link to={paths.PROFILE}>Профиль</Link>
          </li>
          <li style={{ display: 'inline-block', padding: '.2em 1em' }}>
            <Link to={paths.PROFILE_EDIT}>Профиль редактирование</Link>
          </li>
          <li style={{ display: 'inline-block', padding: '.2em 1em' }}>
            <Link to={paths.PROFILE_EDIT_PASSWORD}>Профиль сменить пароль</Link>
          </li>
          <li style={{ display: 'inline-block', padding: '.2em 1em' }}>
            <Link to={paths.LEADERBOARD}>Лидерборд</Link>
          </li>
          <li style={{ display: 'inline-block', padding: '.2em 1em' }}>
            <Link to={paths.FORUM}>Форум</Link>
          </li>
          <li style={{ display: 'inline-block', padding: '.2em 1em' }}>
            <Link to={paths.FORUM_SECTION}>Секция форума</Link>
          </li>
          <li style={{ display: 'inline-block', padding: '.2em 1em' }}>
            <Link to={paths.FORUM_THREAD}>Тема форума</Link>
          </li>
          <li style={{ display: 'inline-block', padding: '.2em 1em' }}>
            <Link to={paths.FORUM_THREAD_CREATE}>Создать тему</Link>
          </li>
        </ul>
      </nav>

      <Switch>
        {routes.map((route) => {
          const Component = route.component;

          return (
            <Route key={route.path} path={route.path} exact={route.exact}>
              <Component title={route.title} />
            </Route>
          );
        })}
      </Switch>
    </Router>
  </RootErrorBoundary>,
  document.getElementById('root')
);
