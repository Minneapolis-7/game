import React, { useCallback, useContext } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { block } from 'bem-cn';
import { Form, Formik } from 'formik';

import oauthApi from '@/api/oauthApi';
import AppContext from '@/AppContext';
import { Input } from '@/components/formik-ui';
import { Button } from '@/components/ui';
import { ToastItem } from '@/components/ui/Toaster/Toast/types';
import Page from '@/layout/Page';
import { OAUTH_REDIRECT_URI, YANDEX_OAUTH } from '@/shared/const/const';
import paths from '@/shared/const/paths';
import text from '@/shared/const/text';
import translateError from '@/shared/utils';
import getRoutedButtonLink from '@/shared/utils/getRoutedButtonLink';
import useProgress from '@/shared/utils/hooks/useProgress';
import { signin } from '@/store/reducers/actions';
import { useAppDispatch } from '@/store/store';

import { loginSchema } from './schema';

const bAuth = block('auth');
const loginInitialValues = {
  login: '',
  password: '',
};
const { login: txt } = text;

function LoginPage({ title }: GenericPageProps): JSX.Element {
  const appContext = useContext(AppContext);
  const dispatch = useAppDispatch();
  const submitLogin = useCallback(async (values, actions) => {
    try {
      await dispatch(signin(values)).unwrap();
      actions.setSubmitting(false);
    } catch (err) {
      const toast = {
        type: 'warning',
        description: translateError(err),
      };

      appContext?.addToastMessage(toast as ToastItem);
    }
  }, []);
  const [isOAuthInProgress, startYandexOAuth] = useProgress(
    async () => {
      try {
        const id = await oauthApi.getClientId({
          redirectUri: OAUTH_REDIRECT_URI,
        });

        window.location.replace(
          `${YANDEX_OAUTH}?response_type=code&client_id=${id}&redirect_uri=${OAUTH_REDIRECT_URI}`
        );
      } catch (e) {
        throw new Error(e);
      }
    },
    [],
    true
  );

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Page centered hasSidebar={false}>
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
                  <Button onClick={startYandexOAuth} waiting={isOAuthInProgress} display="block">
                    {txt.yandexOAuthButton}
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
    </>
  );
}

export default LoginPage;
