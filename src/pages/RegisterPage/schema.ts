import * as yup from 'yup';
import { SchemaOf } from 'yup/es';

// eslint-disable-next-line import/prefer-default-export
export const registerSchema: SchemaOf<RegistrationData> = yup
  .object()
  .shape({
    email: yup.string().email('Укажите email').required('Заполните поле'),
    login: yup.string().min(3, 'Введите более 3 символов').required('Заполните поле'),
    firstName: yup.string().required('Заполните поле'),
    secondName: yup.string().required('Заполните поле'),
    password: yup.string().required('Заполните поле'),
    passwordRepeat: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Повторите пароль')
      .required('Заполните поле'),
  })
  .defined();
