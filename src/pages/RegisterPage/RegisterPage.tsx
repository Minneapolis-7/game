import React, { useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useHistory } from 'react-router-dom';
import { block } from 'bem-cn';
import { Form, Formik } from 'formik';

import { Input } from '@/components/formik-ui';
import { Button, Spinner } from '@/components/ui';
import Page from '@/layout/Page';
import paths from '@/shared/const/paths';
import text from '@/shared/const/text';
import getRoutedButtonLink from '@/shared/utils/getRoutedButtonLink';
import useBeingLoggedIn from '@/shared/utils/hooks/useBeingLoggedIn';
import { signupRequest } from '@/store/reducers';
import { useAppDispatch } from '@/store/store';

import { registerSchema } from './schema';

const bAuth = block('auth');
const registerInitialValues = {
  email: '',
  login: '',
  firstName: '',
  secondName: '',
  phone: '',
  password: '',
  passwordRepeat: '',
};
const { register: txt } = text;

function RegisterPage({ title }: GenericPageProps): JSX.Element {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const submitRegister = useCallback(async (values, actions) => {
    try {
      await dispatch(signupRequest(values)).unwrap();
      console.log('success signup');
      actions.setSubmitting(false);
      history.replace('/');
    } catch (err) {
      console.log('error', `Запрос завершился ошибкой: ${err.message}`);
    }
  }, []);

  const isChecking = useBeingLoggedIn();

  if (isChecking) {
    return <Spinner size="xl" />;
  }

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Page centered hasSidebar={false}>
        <div className={bAuth()}>
          <h4 className="heading_4 heading">{txt.header}</h4>
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
                    hint={txt.emailLabel}
                    required
                    type="email"
                    autoComplete="email"
                    id="email"
                    name="email"
                  />
                  <Input
                    className="gap-y-lg"
                    hint={txt.loginLabel}
                    required
                    autoComplete="username"
                    id="login"
                    name="login"
                  />
                  <Input
                    className="gap-y-lg"
                    hint={txt.firstNameLabel}
                    required
                    autoComplete="given-name"
                    id="firstName"
                    name="firstName"
                  />
                  <Input
                    className="gap-y-lg"
                    hint={txt.secondNameLabel}
                    required
                    autoComplete="family-name"
                    id="secondName"
                    name="secondName"
                  />
                  <Input
                    className="gap-y-lg"
                    hint={txt.phoneLabel}
                    required
                    type="tel"
                    autoComplete="tel"
                    id="phone"
                    name="phone"
                  />
                  <Input
                    type="password"
                    className="gap-y-lg"
                    hint={txt.passwordLabel}
                    required
                    autoComplete="new-password"
                    id="password"
                    name="password"
                  />
                  <Input
                    type="password"
                    className="gap-y-lg"
                    hint={txt.passwordRepeatLabel}
                    required
                    autoComplete="new-password"
                    id="passwordRepeat"
                    name="passwordRepeat"
                  />
                </div>
                <div className="gap-y-sm">
                  <Button type="submit" display="block" waiting={isSubmitting}>
                    {txt.submitButton}
                  </Button>
                </div>
                <div className="gap-y-sm">
                  <Link
                    to={paths.LOGIN}
                    component={getRoutedButtonLink({
                      display: 'block',
                      children: txt.loginLink,
                      theme: 'link',
                    })}
                  />
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Page>
    </>
  );
}

export default RegisterPage;
