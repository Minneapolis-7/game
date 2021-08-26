import React from 'react';

import { Input } from '@/components/formik-ui';
import Page from '@/layout/Page';
import Auth from '@/modules/Auth';

import { loginSchema } from './schema';

const loginInitialValues = {
  login: '',
  password: '',
};

function LoginPage({ title }: GenericPageProps): JSX.Element {
  return (
    <Page centered title={title}>
      <Auth
        initialValues={loginInitialValues}
        validationSchema={loginSchema}
        stage="login"
        heading="Вход"
        submitLabel="Войти"
        alternativeActionLabel="Зарегистрироваться"
      >
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
      </Auth>
    </Page>
  );
}

export default LoginPage;
