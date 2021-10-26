import * as yup from 'yup';
import { SchemaOf } from 'yup/es';

import { PHONE_RU } from '@/shared/const/regexp';
import text from '@/shared/const/text';

import { PasswordFields, ProfileFields } from './types';

const { errors } = text.validation;

export const ProfileFieldsSchema: SchemaOf<ProfileFields> = yup
  .object()
  .shape({
    email: yup.string().email('Укажите email').required(errors.required),
    phone: yup.string().matches(PHONE_RU, errors.phone).required(errors.required),
    login: yup.string().min(3, `${errors.min} 3 ${errors.minMaxLabel}`).required(errors.required),
    firstName: yup.string().required(errors.required),
    secondName: yup.string().required(errors.required),
    displayName: yup.string().max(20, `${errors.max} 20 ${errors.minMaxLabel}`).nullable(true),
  })
  .defined();

export const PasswordFieldsSchema: SchemaOf<PasswordFields> = yup
  .object()
  .shape({
    oldPassword: yup.string().required(errors.required),
    newPassword: yup.string().required(errors.required),
  })
  .defined();
