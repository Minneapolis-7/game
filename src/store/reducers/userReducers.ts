/* eslint-disable no-param-reassign */
import { createAction, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
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

export const applyTheme = createAction<string>('user/applyTheme');

export const getUser = createAsyncThunk('user/getUser', async (_, { rejectWithValue }) => {
  try {
    return await api.getUser();
  } catch (err) {
    return rejectWithValue(err.response?.data);
  }
});

export const signin = createAsyncThunk(
  'user/signin',
  async (user: SignInRequest, { dispatch, rejectWithValue }) => {
    try {
      await api.signin(user);

      const userData = await dispatch(getUser()).unwrap();
      const { name: themeName } = await dispatch(getSelectedTheme(userData.id as number)).unwrap();

      dispatch(applyTheme(themeName));

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

      dispatch(applyTheme(DEFAULT_THEME_NAME));

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

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserLocalProfile>) {
      Object.assign(state, action.payload);
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
      })
      .addCase(applyTheme, (state, action) => {
        state.selectedTheme = action.payload;
      });
  },
});

export const userState = (state: RootState): UserState => ({
  ...state.user,
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
