/* eslint-disable import/prefer-default-export */
import { SignInRequest, SignUpRequest } from '@/api/types';
import api from '@/api/userApi';
import {
  logoutReguested,
  logoutReguestSucceeded,
  reguestedFailed,
  signinReguested,
  signinReguestSucceeded,
  signupReguested,
  signupReguestSucceeded,
} from '@/store/reducers/index';
import { AppDispatch } from '@/store/store';

export const signin = (user: SignInRequest) => {
  return (dispatch: AppDispatch): void => {
    dispatch(signinReguested);

    api
      .signin(user)
      .then(() => {
        dispatch(signinReguestSucceeded);
      })
      .catch((err) => {
        dispatch(reguestedFailed(err));
      });
  };
};

export const signup = (user: SignUpRequest) => {
  return (dispatch: AppDispatch): void => {
    dispatch(signupReguested);

    api
      .signup(user)
      .then((id) => {
        dispatch(signupReguestSucceeded(id));
      })
      .catch((err) => {
        dispatch(reguestedFailed(err));
      });
  };
};

export const logout = () => {
  return (dispatch: AppDispatch): void => {
    dispatch(logoutReguested);

    api
      .logout()
      .then(() => {
        dispatch(logoutReguestSucceeded);
      })
      .catch((err) => {
        dispatch(reguestedFailed(err.message));
      });
  };
};
