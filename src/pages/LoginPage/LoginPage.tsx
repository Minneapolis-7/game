import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { block } from 'bem-cn';
import { Form, Formik } from 'formik';

import { Input } from '@/components/formik-ui';
import { Button } from '@/components/ui';
import Page from '@/layout/Page';
import paths from '@/shared/const/paths';
import getRoutedButtonLink from '@/shared/utils/getRoutedButtonLink';

import { loginSchema } from './schema';

const bAuth = block('auth');
const loginInitialValues = {
  login: '',
  password: '',
};

function LoginPage({ title }: GenericPageProps): JSX.Element {
  const submitLogin = useCallback((values, actions) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      actions.setSubmitting(false);
    }, 400);
  }, []);

  return (
    <Page centered title={title} hasSidebar={false}>
      <div className={bAuth()}>
        <h4 className="heading_4 heading">Вход</h4>
        <Formik
          initialValues={loginInitialValues}
          validationSchema={loginSchema}
          onSubmit={submitLogin}
        >
          {({ isSubmitting }) => (
            <Form noValidate className={bAuth('form')}>
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
                <Button type="submit" display="block" disabled={isSubmitting}>
                  Войти
                </Button>
              </div>
              <div className="gap-y-sm">
                <Link
                  to={paths.REGISTER}
                  component={getRoutedButtonLink({
                    display: 'block',
                    children: 'Зарегистрироваться',
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

export default LoginPage;
