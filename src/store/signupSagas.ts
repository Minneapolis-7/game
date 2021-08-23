import { call, put, takeEvery } from 'typed-redux-saga';
import API from 'api/auth-api';
import { User } from 'types';
import { signupReguested, signupReguestedSucceeded, signupReguestedFailed } from './signupReducers';

const testUser: User = {
  firstName: 'Иван',
  lastName: 'Иванов',
  login: 'new-vaano26',
  email: 'new-vaano26@yandex.ru',
  password: 'new12344321',
  phone: '89998887777',
};

function* signupRequest() {
  try {
    const userId = yield* call(API.signup, testUser);
    yield put(signupReguestedSucceeded(userId));
  } catch (e) {
    yield put(signupReguestedFailed(e.response?.data?.reason));
  }
}

function* signupSaga() {
  yield takeEvery(signupReguested.type, signupRequest);
}

export default signupSaga;
