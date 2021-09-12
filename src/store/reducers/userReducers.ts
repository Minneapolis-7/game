/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  SignInRequest,
  SignUpRequest,
  UpdatePasswordRequest,
  UpdateProfileRequest,
} from '@/api/types';
import api from '@/api/userApi';
import { User } from '@/shared/types/types';
import type { RootState } from '@/store/store';

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
        state = { ...state, ...action.payload };
      })
      .addCase(updateAvatarRequest.fulfilled, (state, action) => {
        state.avatar = action.payload.avatar;
      });
  },
});

export const userState = (state: RootState): User => ({
  ...state.user,
});

export default userSlice.reducer;
