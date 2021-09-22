/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  SignInRequest,
  SignUpRequest,
  UpdatePasswordRequest,
  UpdateProfileRequest,
  UserProfile,
} from '@/api/types';
import api from '@/api/userApi';
import type { RootState } from '@/shared/types/redux';

export const initialState: UserProfile = {
  id: null,
  firstName: '',
  secondName: '',
  displayName: null,
  login: '',
  email: '',
  phone: '',
  avatar: null,
};

export const signinRequest = createAsyncThunk('user/signinRequest', async (user: SignInRequest) => {
  return api.signin(user);
});

export const signupRequest = createAsyncThunk('user/signupRequest', async (user: SignUpRequest) => {
  return api.signup(user);
});

export const logoutRequest = createAsyncThunk('user/logoutRequest', async () => {
  return api.logout();
});

export const userRequest = createAsyncThunk('user/userRequest', async () => {
  return api.getUser();
});

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
      .addCase(signupRequest.fulfilled, (state, action) => {
        state.id = action.payload;
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

export const userState = (state: RootState): UserProfile => ({
  ...state.user,
});

export default userSlice.reducer;
