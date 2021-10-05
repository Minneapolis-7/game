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

export const signin = createAsyncThunk(
  'user/signin',
  async (user: SignInRequest, { rejectWithValue }) => {
    try {
      return await api.signin(user);
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const signup = createAsyncThunk(
  'user/signup',
  async (user: SignUpRequest, { rejectWithValue }) => {
    try {
      return await api.signup(user);
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const logout = createAsyncThunk('user/logout', async (_, { rejectWithValue }) => {
  try {
    return await api.logout();
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

export const userRequest = createAsyncThunk('user/userRequest', async (_, { rejectWithValue }) => {
  try {
    return await api.getUser();
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

export const updateProfile = createAsyncThunk(
  'user/updateProfile',
  async (user: UpdateProfileRequest, { rejectWithValue }) => {
    try {
      return await api.updateProfile(user);
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateAvatar = createAsyncThunk(
  'user/updateAvatar',
  async (formData: FormData, { rejectWithValue }) => {
    try {
      return await api.updateAvatar(formData);
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updatePassword = createAsyncThunk(
  'user/logout',
  async (password: UpdatePasswordRequest, { rejectWithValue }) => {
    try {
      return await api.updatePassword(password);
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(logout.pending, (state) => {
        state.isLoggingOut = true;
      })
      .addCase(logout.rejected, (state) => {
        state.isLoggingOut = false;
      })
      .addCase(logout.fulfilled, (state) => {
        Object.assign(state, initialState);
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        Object.assign(state, action.payload);
      })
      .addCase(updateAvatar.fulfilled, (state, action) => {
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
