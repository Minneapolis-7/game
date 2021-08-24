import React, { PropsWithChildren } from 'react';
import { Formik, Form } from 'formik';
import { block } from 'bem-cn';
import { AnySchema } from 'yup/es';
import { FormikValues } from 'formik/dist/types';
import { Button } from 'components/ui';
import { Link } from 'react-router-dom';
import paths from 'shared/const/paths';
import getRoutedButtonLink from 'shared/utils/getRoutedButtonLink';

const b = block('auth');

type AuthProps = PropsWithChildren<{
  stage: 'login' | 'register';
  heading: string;
  submitLabel: string;
  alternativeActionLabel: string;
  initialValues?: FormikValues;
  validationSchema?: AnySchema | (() => AnySchema);
}>;

function Auth(props: AuthProps): JSX.Element {
  const {
    heading,
    submitLabel,
    alternativeActionLabel,
    stage,
    initialValues = {},
    validationSchema,
    children,
  } = props;
  let linkPath: string;

  if (stage === 'login') {
    linkPath = paths.REGISTER;
  }

  if (stage === 'register') {
    linkPath = paths.LOGIN;
  }

  return (
    <div className={b()}>
      <h4 className="heading">{heading}</h4>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting }) => (
          <Form data-action={stage} noValidate className={b('form')}>
            {children}
            <div className="gap-y-sm">
              <Button type="submit" display="block" disabled={isSubmitting}>
                {submitLabel}
              </Button>
            </div>
            <div className="gap-y-sm">
              <Link
                to={linkPath}
                component={getRoutedButtonLink({
                  display: 'block',
                  children: alternativeActionLabel,
                  theme: 'link',
                })}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Auth;
