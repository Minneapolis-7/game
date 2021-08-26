import React from 'react';

import { Input } from '@/components/formik-ui';
import Page from '@/layout/Page';
import Auth from '@/modules/Auth';

import { registerSchema } from './schema';

const registerInitialValues = {
  email: '',
  login: '',
  firstName: '',
  secondName: '',
  password: '',
  passwordRepeat: '',
};

function RegisterPage({ title }: GenericPageProps): JSX.Element {
  return (
    <Page centered title={title}>
      <Auth
        initialValues={registerInitialValues}
        validationSchema={registerSchema}
        stage="register"
        heading="Регистрация"
        submitLabel="Зарегистрироваться"
        alternativeActionLabel="Войти"
      >
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
            id="firstName"
            name="firstName"
          />
          <Input
            className="gap-y-lg"
            hint="Фамилия"
            required
            autoComplete="family-name"
            id="secondName"
            name="secondName"
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
            id="passwordRepeat"
            name="passwordRepeat"
          />
        </div>
      </Auth>
    </Page>
  );
}

export default RegisterPage;
