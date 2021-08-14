import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import './css/main.scss';

import {
  LoginPage,
  RegisterPage,
  ProfilePage,
  ProfileEditPage,
  ProfileEditPasswordPage,
} from 'pages';

// import icon from 'bootstrap-icons/icons/moon.svg';
// import { Button, ButtonLink, Icon, Input, Textarea } from 'components';
// <Page>
//   <Button icon={<Icon name={icon.id} />} theme="2" />
//   <Button sizing="lg" icon={<Icon name={icon.id} />} theme="2">
//     Кнопка
//   </Button>
//   <ButtonLink sizing="sm" href="//google.com" theme="0">
//     Ссылка
//   </ButtonLink>
//   <ButtonLink href="//google.com">Ссылка</ButtonLink>
//   <Icon size="2rem" name={icon.id} />
//   <Input sizing="xl" className="gap-y-lg" theme="solid" hint="Инпут" />
//   <Input sizing="lg" className="gap-y-lg" hint="Инпут" />
//   <Input className="gap-y-lg" hint="Инпут" />
//   <Input sizing="sm" className="gap-y-lg" hint="Инпут" />
//   <Textarea display="inline" cols={50} rows={10} hint="Test" />
// </Page>
ReactDOM.render(
  <Router>
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Логин на главной</Link>
          </li>
          <li>
            <Link to="/login">Логин</Link>
          </li>
          <li>
            <Link to="/signup">Регистрация</Link>
          </li>
          <li>
            <Link to="/profile">Профиль</Link>
          </li>
          <li>
            <Link to="/profile/edit">Профиль редактирование</Link>
          </li>
          <li>
            <Link to="/profile/edit/password">Профиль сменить пароль</Link>
          </li>
        </ul>
      </nav>

      <Switch>
        <Route path="/login" exact>
          <LoginPage />
        </Route>
        <Route path="/signup" exact>
          <RegisterPage />
        </Route>
        <Route path="/profile" exact>
          <ProfilePage />
        </Route>
        <Route path="/profile/edit" exact>
          <ProfileEditPage />
        </Route>
        <Route path="/profile/edit/password" exact>
          <ProfileEditPasswordPage />
        </Route>
        <Route path="/" exact>
          <LoginPage />
        </Route>
      </Switch>
    </div>
  </Router>,
  document.getElementById('root')
);
