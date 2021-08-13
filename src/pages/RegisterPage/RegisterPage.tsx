import React from 'react';

import Page from 'layout/Page';
import Auth from 'modules/Auth';
import { Input, Button, ButtonLink } from 'components/ui';

function RegisterPage(): JSX.Element {
  return (
    <Page centered>
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
            className="gap-y-lg"
            hint="Телефон"
            required
            type="tel"
            autoComplete="tel"
            id="phone"
            name="phone"
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
        <div className="gap-y-xs">
          <Button type="submit" display="block">
            Зарегистрироваться
          </Button>
        </div>
        <div className="gap-y-xs">
          {/* https://reactrouter.com/web/api/Link/component-reactcomponent */}
          <ButtonLink href="/signup" className="gap-y-xs" display="block">
            Вход
          </ButtonLink>
        </div>
      </Auth>
    </Page>
  );
}

export default RegisterPage;
