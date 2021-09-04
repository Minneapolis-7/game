import * as yup from 'yup';
import { SchemaOf } from 'yup/es';

import text from '@/shared/const/text';

import { LoginFields } from './types';

const { errors } = text.validation;

// eslint-disable-next-line import/prefer-default-export
export const loginSchema: SchemaOf<LoginFields> = yup
  .object()
  .shape({
    login: yup.string().required(errors.required),
    password: yup.string().required(errors.required),
  })
  .defined();
