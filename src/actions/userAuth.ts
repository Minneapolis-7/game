/* eslint-disable import/prefer-default-export */
import { SignInRequest, SignUpRequest } from '@/api/types';
import api from '@/api/userApi';
import { reguestedFailed } from '@/store/appReducers';
import { AppDispatch } from '@/store/store';
import {
  logoutReguested,
  logoutReguestSucceeded,
  signinReguested,
  signinReguestSucceeded,
  signupReguested,
  signupReguestSucceeded,
} from '@/store/userReducers';

export const signin = (user: SignInRequest) => {
  return (dispatch: AppDispatch): void => {
    dispatch(signinReguested);

    api
      .signin(user)
      .then(() => {
        dispatch(signinReguestSucceeded);
      })
      .catch((err) => {
        dispatch(reguestedFailed(err.message));
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
        dispatch(reguestedFailed(err.message));
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
