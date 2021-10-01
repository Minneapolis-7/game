/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { replace } from 'connected-react-router';

import {
  SignInRequest,
  SignUpRequest,
  UpdatePasswordRequest,
  UpdateProfileRequest,
  UserProfile,
} from '@/api/types';
import api from '@/api/userApi';
import paths from '@/shared/const/paths';
import type { RootState } from '@/shared/types/redux';

export type UserState = UserProfile & {
  isLoggingOut: boolean;
};

export const initialState: UserState = {
  id: null,
  firstName: '',
  secondName: '',
  displayName: null,
  login: '',
  email: '',
  phone: '',
  avatar: null,
  isLoggingOut: false,
};

export const userRequest = createAsyncThunk('user/userRequest', async () => {
  return api.getUser();
});

export const signinRequest = createAsyncThunk(
  'user/signinRequest',
  async (user: SignInRequest, { dispatch }) => {
    await api.signin(user);
    await dispatch(userRequest());

    dispatch(replace('/'));
  }
);

export const signupRequest = createAsyncThunk(
  'user/signupRequest',
  async (user: SignUpRequest, { dispatch }) => {
    await api.signup(user);
    await dispatch(userRequest());

    dispatch(replace('/'));
  }
);

export const logoutRequest = createAsyncThunk(
  'user/logoutRequest',
  async (_unused, { dispatch }) => {
    await api.logout();

    dispatch(replace(paths.LOGIN));
  }
);

export const updateProfileRequest = createAsyncThunk(
  'user/updateProfileRequest',
  async (user: UpdateProfileRequest) => {
    return api.updateProfile(user);
  }
);

export const updateAvatarRequest = createAsyncThunk(
  'user/updateAvatarRequest',
  async (formData: FormData) => {
    return api.updateAvatar(formData);
  }
);

export const updatePasswordRequest = createAsyncThunk(
  'user/logoutRequest',
  async (password: UpdatePasswordRequest) => {
    return api.updatePassword(password);
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(logoutRequest.pending, (state) => {
        state.isLoggingOut = true;
      })
      .addCase(logoutRequest.rejected, (state) => {
        state.isLoggingOut = false;
      })
      .addCase(logoutRequest.fulfilled, (state) => {
        Object.assign(state, initialState);
      })
      .addCase(updateProfileRequest.fulfilled, (state, action) => {
        Object.assign(state, action.payload);
      })
      .addCase(updateAvatarRequest.fulfilled, (state, action) => {
        state.avatar = action.payload.avatar;
      })
      .addCase(userRequest.fulfilled, (state, action) => {
        Object.assign(state, action.payload);
      });
  },
});

export const userState = (state: RootState): UserState => ({
  ...state.user,
});

export default userSlice.reducer;
