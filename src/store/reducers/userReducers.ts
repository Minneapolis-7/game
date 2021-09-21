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
import { RootState } from '@/shared/types/redux';

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

export const signin = createAsyncThunk('user/signin', async (user: SignInRequest) => {
  return api.signin(user);
});

export const signup = createAsyncThunk('user/signup', async (user: SignUpRequest) => {
  return api.signup(user);
});

export const logout = createAsyncThunk('user/logout', async () => {
  return api.logout();
});

export const userRequest = createAsyncThunk('user/userRequest', async () => {
  return api.getUser();
});

export const updateProfile = createAsyncThunk(
  'user/updateProfile',
  async (user: UpdateProfileRequest) => {
    return api.updateProfile(user);
  }
);

export const updateAvatar = createAsyncThunk('user/updateAvatar', async (formData: FormData) => {
  return api.updateAvatar(formData);
});

export const updatePassword = createAsyncThunk(
  'user/logout',
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
      .addCase(signup.fulfilled, (state, action) => {
        state.id = action.payload;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state = { ...state, ...action.payload };
      })
      .addCase(updateAvatar.fulfilled, (state, action) => {
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
