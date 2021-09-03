import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { block } from 'bem-cn';
import { Form, Formik } from 'formik';

import { Input } from '@/components/formik-ui';
import { Button } from '@/components/ui';
import Page from '@/layout/Page';
import paths from '@/shared/const/paths';
import getRoutedButtonLink from '@/shared/utils/getRoutedButtonLink';

import { registerSchema } from './schema';

const bAuth = block('auth');
const registerInitialValues = {
  email: '',
  login: '',
  firstName: '',
  secondName: '',
  password: '',
  passwordRepeat: '',
};

function RegisterPage({ title }: GenericPageProps): JSX.Element {
  const submitRegister = useCallback((values, actions) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      actions.setSubmitting(false);
    }, 400);
  }, []);

  return (
    <Page centered title={title} hasSidebar={false}>
      <div className={bAuth()}>
        <h4 className="heading_4 heading">Регистрация</h4>
        <Formik
          initialValues={registerInitialValues}
          validationSchema={registerSchema}
          onSubmit={submitRegister}
        >
          {({ isSubmitting }) => (
            <Form noValidate className={bAuth('form')}>
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
              <div className="gap-y-sm">
                <Button type="submit" display="block" disabled={isSubmitting}>
                  Зарегистрироваться
                </Button>
              </div>
              <div className="gap-y-sm">
                <Link
                  to={paths.LOGIN}
                  component={getRoutedButtonLink({
                    display: 'block',
                    children: 'Войти',
                    theme: 'link',
                  })}
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Page>
  );
}

export default RegisterPage;
