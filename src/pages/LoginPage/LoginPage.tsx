import React, { useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { block } from 'bem-cn';
import { Form, Formik } from 'formik';

import { Input } from '@/components/formik-ui';
import { Button } from '@/components/ui';
import Page from '@/layout/Page';
import paths from '@/shared/const/paths';
import text from '@/shared/const/text';
import translateErrorMessage from '@/shared/utils';
import getRoutedButtonLink from '@/shared/utils/getRoutedButtonLink';
import { signinRequest } from '@/store/reducers';
import { useAppDispatch, useAppSelector } from '@/store/store';

import { loginSchema } from './schema';

const bAuth = block('auth');
const loginInitialValues = {
  login: '',
  password: '',
};
const { login: txt } = text;

function LoginPage({ title }: GenericPageProps): JSX.Element {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const submitLogin = useCallback(async (values, actions) => {
    try {
      await dispatch(signinRequest(values)).unwrap();
      console.log('success signin');
      actions.setSubmitting(false);
      history.replace('/');
    } catch (err) {
      console.log('error', translateErrorMessage(err.message));
    }
  }, []);
  const userId = useAppSelector((state) => state.user.id);

  if (userId) {
    history.replace('/');
  }

  return (
    <Page centered title={title} hasSidebar={false}>
      <div className={bAuth()}>
        <h4 className="heading_4 heading">{txt.header}</h4>
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
                  hint={txt.loginLabel}
                  required
                  autoComplete="username"
                  id="login"
                  name="login"
                />
                <Input
                  type="password"
                  className="gap-y-lg"
                  hint={txt.passwordLabel}
                  required
                  autoComplete="current-password"
                  id="password"
                  name="password"
                />
              </div>
              <div className="gap-y-sm">
                <Button waiting={isSubmitting} type="submit" display="block">
                  {txt.submitButton}
                </Button>
              </div>
              <div className="gap-y-sm">
                <Link
                  to={paths.REGISTER}
                  component={getRoutedButtonLink({
                    display: 'block',
                    children: txt.registerLink,
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
