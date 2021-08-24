import React from 'react';
import * as yup from 'yup';

import Page from 'layout/Page';
import Auth from 'modules/Auth';
import { Input } from 'components/formik-ui';
import { SchemaOf } from 'yup/es';

type LoginFields = Pick<RegistrationData, 'login' | 'password'>;
const loginInitialValues = {
  login: '',
  password: '',
};
const loginSchema: SchemaOf<LoginFields> = yup
  .object()
  .shape({
    login: yup.string().required('Заполните поле'),
    password: yup.string().required('Заполните поле'),
  })
  .defined();

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
