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
import type { RootState } from '@/store/store';

const initialState: UserProfile = {
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
  await api.signin(user);
});

export const signupRequest = createAsyncThunk('user/signupRequest', async (user: SignUpRequest) => {
  const response = await api.signup(user);

  return response;
});

export const logoutRequest = createAsyncThunk('user/logoutRequest', async () => {
  await api.logout();
});

export const userRequest = createAsyncThunk('user/userRequest', async () => {
  const response = await api.getUser();

  return response;
});

export const updateProfileRequest = createAsyncThunk(
  'user/updateProfileRequest',
  async (user: UpdateProfileRequest) => {
    const response = await api.updateProfile(user);

    return response;
  }
);

export const updateAvatarRequest = createAsyncThunk(
  'user/updateAvatarRequest',
  async (formData: FormData) => {
    const response = await api.updateAvatar(formData);

    return response;
  }
);

export const updatePasswordRequest = createAsyncThunk(
  'user/logoutRequest',
  async (password: UpdatePasswordRequest) => {
    await api.updatePassword(password);
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
