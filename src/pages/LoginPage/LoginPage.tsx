import React, { forwardRef } from 'react';
import { Link } from 'react-router-dom';

import Page from 'layout/Page';
import Auth from 'modules/Auth';
import { Input, Button, ButtonLink } from 'components/ui';

// todo: разобраться как передавать ref в `ButtonLink`
const RegisterLink = forwardRef(function RegisterLink(props, _ref) {
  return (
    <ButtonLink /* ref={ref} */ display="block" {...props}>
      Регистрация
    </ButtonLink>
  );
});

function LoginPage(): JSX.Element {
  return (
    <Page centered>
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
        <div className="gap-y-xs">
          <Button type="submit" display="block">
            Войти
          </Button>
        </div>
        <div className="gap-y-xs">
          {/* https://reactrouter.com/web/api/Link/component-reactcomponent */}
          {/* todo: разобраться с работой кастомного компонента с `Link` (сейчас происходит переход с перезагрузкой страницы) */}
          <Link to="/signup" component={RegisterLink} />
        </div>
      </Auth>
    </Page>
  );
}

export default LoginPage;
