/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import userApi from '@/api/userApi';
import type { ProfileState, RootState } from '@/shared/types/redux';

export const initialState: ProfileState = {
  id: null,
  yandexUserId: null,
  firstName: '',
  secondName: '',
  displayName: null,
  login: '',
  email: '',
  phone: '',
  avatar: null,
  isLoading: false,
};

export const getProfile = createAsyncThunk(
  'user/getProfile',
  async (yandexUserId: number, { rejectWithValue }) => {
    try {
      return await userApi.getLocalUser(yandexUserId);
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        Object.assign(state, action.payload);
        state.isLoading = false;
      })
      .addCase(getProfile.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const profileState = (state: RootState): ProfileState => ({
  ...state.profile,
});

export default profileSlice.reducer;
