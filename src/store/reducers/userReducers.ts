/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { push, replace } from 'connected-react-router';

import {
  SignInRequest,
  SignUpRequest,
  UpdatePasswordRequest,
  UpdateProfileRequest,
  UserLocalProfile,
  UserTheme,
} from '@/api/types';
import api from '@/api/userApi';
import { DEFAULT_THEME_NAME } from '@/shared/const/const';
import paths from '@/shared/const/paths';
import type { RootState } from '@/shared/types/redux';

export type UserState = UserLocalProfile & {
  isLoggingOut: boolean;
  isChangingAvatar: boolean;
  selectedTheme: string;
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
  isChangingAvatar: false,
  selectedTheme: DEFAULT_THEME_NAME,
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
  async (user: UpdateProfileRequest, { dispatch, rejectWithValue }) => {
    try {
      await api.updateProfile(user);

      return dispatch(push(paths.PROFILE));
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
  async (password: UpdatePasswordRequest, { dispatch, rejectWithValue }) => {
    try {
      await api.updatePassword(password);

      return dispatch(push(paths.PROFILE));
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getSelectedTheme = createAsyncThunk(
  'user/getSelectedTheme',
  async (userId: number, { rejectWithValue }) => {
    try {
      return await api.getUserTheme(userId);
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const saveThemeSelection = createAsyncThunk(
  'user/saveThemeSelection',
  async (userTheme: UserTheme, { rejectWithValue }) => {
    try {
      return await api.setUserTheme(userTheme);
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    applyTheme(state, action: PayloadAction<string>) {
      state.selectedTheme = action.payload;
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
      .addCase(updateAvatar.pending, (state) => {
        state.isChangingAvatar = true;
      })
      .addCase(updateAvatar.rejected, (state) => {
        state.isChangingAvatar = false;
      })
      .addCase(updateAvatar.fulfilled, (state, action) => {
        state.avatar = action.payload.avatar;
        state.isChangingAvatar = false;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        Object.assign(state, action.payload);
      })
      .addCase(getSelectedTheme.fulfilled, (state, action) => {
        const { name } = action.payload;

        state.selectedTheme = name;
      });
  },
});

export const userState = (state: RootState): UserState => ({
  ...state.user,
});

export const { applyTheme } = userSlice.actions;

export default userSlice.reducer;
