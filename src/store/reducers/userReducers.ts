/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { replace } from 'connected-react-router';

import {
  SignInRequest,
  SignUpRequest,
  UpdatePasswordRequest,
  UpdateProfileRequest,
  UserLocalProfile,
  UserTheme,
} from '@/api/types';
import api from '@/api/userApi';
import paths from '@/shared/const/paths';
import type { RootState } from '@/shared/types/redux';

export type UserState = UserLocalProfile & {
  isLoggingOut: boolean;
  themeId: number;
};

export const initialState: UserState = {
  id: null,
  yandexUserId: null,
  firstName: '',
  secondName: '',
  displayName: null,
  login: '',
  email: '',
  phone: '',
  avatar: null,
  isLoggingOut: false,
  themeId: 0,
};

export const getUser = createAsyncThunk('user/getUser', async (_, { rejectWithValue }) => {
  try {
    return await api.getUser();
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

export const signin = createAsyncThunk(
  'user/signin',
  async (user: SignInRequest, { dispatch, rejectWithValue }) => {
    try {
      await api.signin(user);
      await dispatch(getUser());

      return dispatch(replace('/'));
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const signup = createAsyncThunk(
  'user/signup',
  async (user: SignUpRequest, { dispatch, rejectWithValue }) => {
    try {
      await api.signup(user);
      await dispatch(getUser());

      return dispatch(replace('/'));
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getTheme = createAsyncThunk(
  'user/getTheme',
  async (userId: number, { rejectWithValue }) => {
    try {
      return await api.getUserTheme(userId);
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const saveTheme = createAsyncThunk(
  'user/saveTheme',
  async (userTheme: UserTheme, { rejectWithValue }) => {
    try {
      return await api.saveUserTheme(userTheme);
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const logout = createAsyncThunk(
  'user/logout',
  async (_unused, { dispatch, rejectWithValue }) => {
    try {
      await api.logout();

      return dispatch(replace(paths.LOGIN));
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

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
  reducers: {
    saveCurrentTheme(state, action: PayloadAction<number>) {
      state.themeId = action.payload;
    },
  },
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
      .addCase(getUser.fulfilled, (state, action) => {
        Object.assign(state, action.payload);
      })
      .addCase(getTheme.fulfilled, (state, action) => {
        state.themeId = action.payload;
      });
  },
});

export const userState = (state: RootState): UserState => ({
  ...state.user,
});

export const { saveCurrentTheme } = userSlice.actions;

export default userSlice.reducer;
