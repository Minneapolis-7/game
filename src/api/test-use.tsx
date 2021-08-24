import React, { useEffect, useState } from 'react';

import API from './auth-api';

import { User } from '../shared/types/types';

const TestAPI = (): JSX.Element => {
  const [id, setId] = useState<number | null>(null);

  const testUser: User = {
    firstName: 'Иван',
    lastName: 'Иванов',
    login: 'vano24',
    email: 'vano24@yandex.ru',
    password: '12344321',
    phone: '89998887766',
  };

  useEffect(() => {
    async function signUp() {
      try {
        const userId = await API.signup(testUser);
        setId(userId);
      } catch (e) {
        console.warn('signUp error', e.response?.data?.reason);
      }
    }
    signUp();
  }, []);

  return (
    <>
      <div>ID {id}</div>
    </>
  );
};

export default TestAPI;
