import React, { forwardRef } from 'react';

import Page from 'layout/Page';
import Auth from 'modules/Auth';
import { Input, Button, ButtonLink } from 'components/ui';
import { Link } from 'react-router-dom';

// todo: разобраться как передавать ref в `ButtonLink`
const LoginLink = forwardRef(function LoginLink(props, _ref) {
  return (
    <ButtonLink /* ref={ref} */ display="block" {...props}>
      Вход
    </ButtonLink>
  );
});

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
          {/* todo: разобраться с работой кастомного компонента с `Link` (сейчас происходит переход с перезагрузкой страницы) */}
          <Link to="/signup" component={LoginLink} />
        </div>
      </Auth>
    </Page>
  );
}

export default RegisterPage;
