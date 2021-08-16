import React, { useState, useEffect } from 'react';
import API from './auth-api';
import { User } from '../types';

const TestAPI = (): JSX.Element => {
  const [id, setId] = useState<unknown>(null);

  const testUser: User = {
    firstName: 'Иван',
    lastName: 'Иванов',
    login: 'vano23',
    email: 'vano23@yandex.ru',
    password: '12344321',
    phone: '89998887766',
  };

  useEffect(() => {
    async function signUp() {
      const userId = await API.signup(testUser);
      setId(userId);
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
