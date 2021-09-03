import { signupRequest } from './reducers';
import store from './store';

test('Updates id', () => {
  jest.mock('@/api/userApi');

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

  store.dispatch(signupRequest(user));
  userId = store.getState().user.id;
  expect(userId).not.toBe(null);
});
