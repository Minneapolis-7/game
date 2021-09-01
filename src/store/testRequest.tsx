import React from 'react';
import { Link } from 'react-router-dom';

import { Button, Input } from '@/components/ui';
import Page from '@/layout/Page';
import paths from '@/shared/const/paths';
import getRoutedButtonLink from '@/shared/utils/getRoutedButtonLink';
import { signupRequest } from '@/store/reducers';
import { useAppDispatch } from '@/store/store';

function LoginPage({ title }: GenericPageProps): JSX.Element {
  const dispatch = useAppDispatch();
  const onSubmit = async () => {
    const user = {
      displayName: 'vano777',
      email: 'pochta777@yandex.ru',
      firstName: 'Иван',
      login: 'vano777',
      phone: '+7 (909) 999 99 99',
      secondName: 'Иванов',
      password: '12344321',
    };

    try {
      const resultAction = await dispatch(signupRequest(user)).unwrap();

      console.log('success', `Получены данные пользователя ${resultAction}`);
    } catch (err) {
      console.log('error', `Запрос завершился ошибкой: ${err.message}`);
    }
  };

  return (
    <Page centered title={title}>
      <div>
        <div className="gap-y-xl">
          <Input
            className="gap-y-lg"
            hint="Логин"
            required
            autoComplete="username"
            id="login"
            name="login"
          />
          <Input
            type="password"
            className="gap-y-lg"
            hint="Пароль"
            required
            autoComplete="current-password"
            id="password"
            name="password"
          />
        </div>
        <div className="gap-y-sm">
          {/* <Button type="submit" display="block"> */}
          <Button onClick={onSubmit} display="block">
            Войти
          </Button>
        </div>
        <div className="gap-y-sm">
          <Link
            to={paths.REGISTER}
            component={getRoutedButtonLink({
              display: 'block',
              children: 'Регистрация',
              theme: 'link',
            })}
          />
        </div>
      </div>
    </Page>
  );
}

export default LoginPage;
