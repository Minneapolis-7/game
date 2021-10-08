import * as yup from 'yup';
import { SchemaOf } from 'yup/es';

import { PHONE_RU } from '@/shared/const/regexp';
import text from '@/shared/const/text';

const { errors } = text.validation;

// eslint-disable-next-line import/prefer-default-export
export const registerSchema: SchemaOf<RegistrationData> = yup
  .object()
  .shape({
    email: yup.string().email(errors.email).required(errors.required),
    login: yup.string().min(3, `${errors.min} 3 ${errors.minMaxLabel}`).required(errors.required),
    firstName: yup.string().required(errors.required),
    secondName: yup.string().required(errors.required),
    phone: yup.string().matches(PHONE_RU, errors.phone).required(errors.required),
    password: yup.string().required(errors.required),
    passwordRepeat: yup
      .string()
      .oneOf([yup.ref('password'), null], errors.passwordRepeat)
      .required(errors.required),
  })
  .defined();
