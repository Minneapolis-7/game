import { signupRequest } from './reducers';
import store from './store';

import api from '../api/userApi';

jest.mock('../api/userApi');

test('Updates id', () => {
  let userId = store.getState().user.id;

  expect(userId).toBe(null);

  const user = {
    displayName: 'vano777',
    email: 'pochta777@yandex.ru',
    firstName: 'Иван',
    login: 'vano777',
    phone: '+7 (909) 999 99 99',
    secondName: 'Иванов',
    password: '12344321',
  };

  (<jest.Mock>api.signup).mockResolvedValue(5);
  store.dispatch(signupRequest(user));
  userId = store.getState().user.id;
  expect(userId).toBe(5);
});
