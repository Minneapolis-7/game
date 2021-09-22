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

export const userRequest = createAsyncThunk('user/userRequest', async () => {
  return api.getUser();
});

export const signinRequest = createAsyncThunk(
  'user/signinRequest',
  async (user: SignInRequest, thunkAPI) => {
    await api.signin(user);
    await thunkAPI.dispatch(userRequest());
  }
);

export const signupRequest = createAsyncThunk(
  'user/signupRequest',
  async (user: SignUpRequest, thunkAPI) => {
    await api.signup(user);
    await thunkAPI.dispatch(userRequest());
  }
);

export const logoutRequest = createAsyncThunk('user/logoutRequest', async () => {
  return api.logout();
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

export const userState = (state: RootState): UserProfile => ({
  ...state.user,
});

export default userSlice.reducer;
