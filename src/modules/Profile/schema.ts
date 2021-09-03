import * as yup from 'yup';
import { SchemaOf } from 'yup/es';

import { PasswordFields, ProfileFields } from './types';

export const ProfileFieldsSchema: SchemaOf<ProfileFields> = yup
  .object()
  .shape({
    email: yup.string().email('Укажите email').required('Заполните поле'),
    login: yup.string().min(3, 'Введите более 3 символов').required('Заполните поле'),
    firstName: yup.string().required('Заполните поле'),
    secondName: yup.string().required('Заполните поле'),
    displayName: yup.string().max(20, 'Введите не более 20 символов'),
  })
  .defined();

export const PasswordFieldsSchema: SchemaOf<PasswordFields> = yup
  .object()
  .shape({
    oldPassword: yup.string().required('Заполните поле'),
    newPassword: yup.string().required('Заполните поле'),
  })
  .defined();
