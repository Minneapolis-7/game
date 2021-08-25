import { call, put, takeEvery, all } from 'typed-redux-saga';
import API from 'api/auth-api';
import { User } from 'types';
import {
  signupReguested,
  signupReguestSucceeded,
  signinReguested,
  signinReguestSucceeded,
  logoutReguested,
  logoutReguestSucceeded,
} from './signupReducers';
import { reguestedFailed } from './appReducers';

const testUser: User = {
  firstName: 'Иван',
  lastName: 'Иванов',
  login: 'new-vaano26',
  email: 'new-vaano26@yandex.ru',
  password: 'new12344321',
  phone: '89998887777',
};

const testSignIn = {
  login: 'new-vaano26',
  password: 'new12344321',
};

function* signupRequest() {
  try {
    const userId = yield* call(API.signup, testUser);
    yield put(signupReguestSucceeded(userId));
  } catch (e) {
    yield put(reguestedFailed(e.response?.data?.reason));
  }
}

function* signupSaga() {
  yield takeEvery(signupReguested.type, signupRequest);
}

function* signinRequest() {
  try {
    yield* call(API.signin, testSignIn);
    yield put(signinReguestSucceeded());
  } catch (e) {
    yield put(reguestedFailed(e.response?.data?.reason));
  }
}

function* signinSaga() {
  yield takeEvery(signinReguested.type, signinRequest);
}

function* logoutRequest() {
  try {
    yield* call(API.logout);
    yield put(logoutReguestSucceeded());
  } catch (e) {
    yield put(reguestedFailed(e.response?.data?.reason));
  }
}

function* logoutSaga() {
  yield takeEvery(logoutReguested.type, logoutRequest);
}

export default function* authSaga() {
  yield all([signinSaga(), signupSaga(), logoutSaga()]);
}
