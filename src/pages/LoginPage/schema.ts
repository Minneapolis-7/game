import * as yup from 'yup';
import { SchemaOf } from 'yup/es';

import { LoginFields } from './types';

// eslint-disable-next-line import/prefer-default-export
export const loginSchema: SchemaOf<LoginFields> = yup
  .object()
  .shape({
    login: yup.string().required('Заполните поле'),
    password: yup.string().required('Заполните поле'),
  })
  .defined();
