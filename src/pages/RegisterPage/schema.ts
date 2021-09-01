import * as yup from 'yup';
import { SchemaOf } from 'yup/es';

import text from '@/shared/const/text';

// eslint-disable-next-line import/prefer-default-export
export const registerSchema: SchemaOf<RegistrationData> = yup
  .object()
  .shape({
    email: yup
      .string()
      .email(text.validation.errors.email)
      .required(text.validation.errors.required),
    login: yup
      .string()
      .min(3, `${text.validation.errors.min} 3 ${text.validation.errors.minMaxLabel}`)
      .required(text.validation.errors.required),
    firstName: yup.string().required(text.validation.errors.required),
    secondName: yup.string().required(text.validation.errors.required),
    password: yup.string().required(text.validation.errors.required),
    passwordRepeat: yup
      .string()
      .oneOf([yup.ref('password'), null], text.validation.errors.passwordRepeat)
      .required(text.validation.errors.required),
  })
  .defined();
