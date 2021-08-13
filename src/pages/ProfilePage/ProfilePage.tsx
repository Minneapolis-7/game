import React from 'react';

import Page from 'layout/Page';
import Auth from 'modules/Auth';
import { Input, Button, ButtonLink } from 'components/ui';

function ProfilePage(): JSX.Element {
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
          <ButtonLink href="/signup" className="gap-y-xs" display="block">
            Регистрация
          </ButtonLink>
        </div>
      </Auth>
    </Page>
  );
}

export default ProfilePage;
