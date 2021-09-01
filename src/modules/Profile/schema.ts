import * as yup from 'yup';
import { SchemaOf } from 'yup/es';

import text from '@/shared/const/text';

import { PasswordFields, ProfileFields } from './types';

export const ProfileFieldsSchema: SchemaOf<ProfileFields> = yup
  .object()
  .shape({
    email: yup.string().email('Укажите email').required(text.validation.errors.required),
    login: yup
      .string()
      .min(3, `${text.validation.errors.min} 3 ${text.validation.errors.minMaxLabel}`)
      .required(text.validation.errors.required),
    firstName: yup.string().required(text.validation.errors.required),
    secondName: yup.string().required(text.validation.errors.required),
    displayName: yup
      .string()
      .max(20, `${text.validation.errors.max} 20 ${text.validation.errors.minMaxLabel}`),
  })
  .defined();

export const PasswordFieldsSchema: SchemaOf<PasswordFields> = yup
  .object()
  .shape({
    oldPassword: yup.string().required(text.validation.errors.required),
    newPassword: yup.string().required(text.validation.errors.required),
  })
  .defined();
