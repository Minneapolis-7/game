import { call, put, takeEvery } from 'typed-redux-saga';
import API from 'api/auth-api';
import { User } from '../types';
import { increment, decrement } from './sliser';

const testUser: User = {
  firstName: 'Иван',
  lastName: 'Иванов',
  login: 'vaano26',
  email: 'vaano26@yandex.ru',
  password: '12344321',
  phone: '89998887766',
};

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchUser() {
  try {
    const user = yield* call(API.signup, testUser);
    console.log('result', user);
    yield put(increment(user));
  } catch (e) {
    console.log('e', e);
    console.log('e.response', e.response);
    yield put(decrement(e.message));
  }
}

/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
function* mySaga() {
  yield takeEvery('USER_FETCH_REQUESTED', fetchUser);
}

/*
  Alternatively you may use takeLatest.

  Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/
// function* mySaga() {
//   yield takeLatest("USER_FETCH_REQUESTED", fetchUser);
// }

export default mySaga;
