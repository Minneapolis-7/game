import React from 'react';
import { Link } from 'react-router-dom';

import Page from 'layout/Page';
import Auth from 'modules/Auth';
import { Input, Button } from 'components/ui';
import getRoutedButtonLink from 'shared/utils/getRoutedButtonLink';
import paths from 'shared/const/paths';

import { useAppDispatch } from 'hooks';
import { signupReguested } from 'store/signupReducers';

function LoginPage({ title }: GenericPageProps): JSX.Element {
  const dispatch = useAppDispatch();
  const onSubmit = () => {
    console.log('onSubmit', signupReguested.type);
    dispatch(signupReguested());
  };

  return (
    <Page centered title={title}>
      <Auth stage="login" heading="Вход">
        <div className="gap-y-xl">
          <Input
            className="gap-y-lg"
            hint="Логин"
            required
            autoComplete="username"
            id="login"
            name="login"
          />
          <Input
            type="password"
            className="gap-y-lg"
            hint="Пароль"
            required
            autoComplete="current-password"
            id="password"
            name="password"
          />
        </div>
        <div className="gap-y-sm">
          {/* <Button onClick={onSubmit} type="submit" display="block"> */}
          <Button onClick={onSubmit} display="block">
            Войти
          </Button>
        </div>
        <div className="gap-y-sm">
          <Link
            to={paths.REGISTER}
            component={getRoutedButtonLink({
              display: 'block',
              children: 'Регистрация',
              theme: 'link',
            })}
          />
        </div>
      </Auth>
    </Page>
  );
}

export default LoginPage;
