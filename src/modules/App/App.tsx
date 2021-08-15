import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import paths from 'shared/const/paths';
import routes from 'shared/const/routes';

import '../../css/main.scss';

function App(): JSX.Element {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Логин на главной</Link>
            </li>
            <li>
              <Link to={paths.LOGIN}>Логин</Link>
            </li>
            <li>
              <Link to={paths.REGISTER}>Регистрация</Link>
            </li>
            <li>
              <Link to={paths.PROFILE}>Профиль</Link>
            </li>
            <li>
              <Link to={paths.PROFILE_EDIT}>Профиль редактирование</Link>
            </li>
            <li>
              <Link to={paths.PROFILE_EDIT_PASSWORD}>Профиль сменить пароль</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          {routes.map((route) => {
            const Component = route.component;

            return (
              // eslint-disable-next-line react/jsx-key
              <Route path={route.path} exact={route.exact}>
                <Component title={route.title} />
              </Route>
            );
          })}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
