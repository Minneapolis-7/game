import React from 'react';

import Page from 'layout/Page';
import Auth from 'modules/Auth';
import { Input, Button } from 'components/ui';
import { Link } from 'react-router-dom';
import getRoutedButtonLink from 'shared/utils/getRoutedButtonLink';
import paths from 'shared/const/paths';

import { useAppDispatch } from 'hooks';
import { signupReguested } from 'store/signupReducers';

function RegisterPage({ title }: GenericPageProps): JSX.Element {
  const dispatch = useAppDispatch();
  const onSubmit = () => {
    dispatch(signupReguested());
  };

  return (
    <Page centered title={title}>
      <Auth stage="register" heading="Регистрация">
        <div className="gap-y-xl">
          <Input
            className="gap-y-lg"
            hint="E-mail"
            required
            type="email"
            autoComplete="email"
            id="email"
            name="email"
          />
          <Input
            className="gap-y-lg"
            hint="Логин"
            required
            autoComplete="username"
            id="login"
            name="login"
          />
          <Input
            className="gap-y-lg"
            hint="Имя"
            required
            autoComplete="given-name"
            id="first_name"
            name="first_name"
          />
          <Input
            className="gap-y-lg"
            hint="Фамилия"
            required
            autoComplete="family-name"
            id="second_name"
            name="second_name"
          />
          <Input
            type="password"
            className="gap-y-lg"
            hint="Пароль"
            required
            autoComplete="new-password"
            id="password"
            name="password"
          />
          <Input
            type="password"
            className="gap-y-lg"
            hint="Повторите пароль"
            required
            autoComplete="new-password"
            id="password_repeat"
            name="password_repeat"
          />
        </div>
        <div className="gap-y-sm">
          {/* <Button type="submit" display="block"> */}
          <Button onClick={onSubmit} display="block">
            Зарегистрироваться
          </Button>
        </div>
        <div className="gap-y-sm">
          <Link
            to={paths.LOGIN}
            component={getRoutedButtonLink({
              display: 'block',
              children: 'Вход',
              theme: 'link',
            })}
          />
        </div>
      </Auth>
    </Page>
  );
}

export default RegisterPage;
