/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { UpdateProfileResponse } from '@/api/types';
import { User } from '@/shared/types/types';
import type { RootState } from '@/store/store';

import { setLoding } from './appReducers';

const initialState: User = {
  id: null,
  firstName: '',
  secondName: '',
  displayName: null,
  login: '',
  email: '',
  password: '',
  phone: '',
  avatar: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signupReguested: () => {
      setLoding(true);
    },
    signupReguestSucceeded: (userState, action: PayloadAction<number>) => {
      userState.id = action.payload;
      setLoding(false);
    },
    signinReguested: () => {
      setLoding(true);
    },
    signinReguestSucceeded: () => {
      setLoding(false);
    },
    logoutReguested: () => {
      setLoding(true);
    },
    logoutReguestSucceeded: () => {
      setLoding(false);
    },
    updateProfileReguested: () => {
      setLoding(true);
    },
    updateProfileSucceeded: (userState, action: PayloadAction<UpdateProfileResponse>) => {
      userState.id = action.payload.id;
      userState.firstName = action.payload.firstName;
      userState.secondName = action.payload.secondName;
      userState.displayName = action.payload.displayName;
      userState.login = action.payload.login;
      userState.email = action.payload.email;
      userState.phone = action.payload.phone;
      userState.avatar = action.payload.avatar;
      setLoding(false);
    },
    updateAvatarReguested: () => {
      setLoding(true);
    },
    updateAvatarSucceeded: (userState, action: PayloadAction<UpdateProfileResponse>) => {
      userState.avatar = action.payload.avatar;
      setLoding(false);
    },
    updatePasswordReguested: () => {
      setLoding(true);
    },
    updatePasswordSucceeded: (userState, action: PayloadAction<UpdateProfileResponse>) => {
      userState.avatar = action.payload.avatar;
      setLoding(false);
    },
  },
});

export const {
  signupReguested,
  signupReguestSucceeded,
  signinReguested,
  signinReguestSucceeded,
  logoutReguested,
  logoutReguestSucceeded,
  updateProfileReguested,
  updateProfileSucceeded,
  updateAvatarReguested,
  updateAvatarSucceeded,
  updatePasswordReguested,
  updatePasswordSucceeded,
} = userSlice.actions;

export const userState = (state: RootState): User => ({
  id: state.user.id,
  firstName: state.user.firstName,
  secondName: state.user.secondName,
  displayName: state.user.displayName,
  login: state.user.login,
  email: state.user.email,
  phone: state.user.phone,
  avatar: state.user.avatar,
  password: state.user.password,
});

export default userSlice.reducer;
