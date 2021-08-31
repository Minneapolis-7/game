/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { SignInRequest, SignUpRequest } from '@/api/types';
import api from '@/api/userApi';
import { User } from '@/shared/types/types';
import type { RootState } from '@/store/store';

type UserState = User & {
  loading: string;
  currentRequestId: string | undefined;
  error: unknown;
};

const initialState: UserState = {
  id: null,
  firstName: '',
  secondName: '',
  displayName: null,
  login: '',
  email: '',
  password: '',
  phone: '',
  avatar: null,
  loading: 'idle',
  currentRequestId: undefined,
  error: null,
};

export const signinRequest = createAsyncThunk('user/signinRequest', async (user: SignInRequest) => {
  await api.signin(user);
});

export const signupRequest = createAsyncThunk('user/signupRequest', async (user: SignUpRequest) => {
  const response = await api.signup(user);
  return response;
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signinRequest.pending, (state, action) => {
        if (state.loading === 'idle') {
          state.loading = 'pending';
          state.currentRequestId = action.meta.requestId;
        }
      })
      .addCase(signinRequest.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading === 'pending' && state.currentRequestId === requestId) {
          state.loading = 'idle';
          state.currentRequestId = undefined;
        }
      })
      .addCase(signinRequest.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading === 'pending' && state.currentRequestId === requestId) {
          state.loading = 'idle';
          state.error = action.error;
          state.currentRequestId = undefined;
        }
      })
      .addCase(signupRequest.pending, (state, action) => {
        console.log('signupRequest.pending');
        if (state.loading === 'idle') {
          state.loading = 'pending';
          state.currentRequestId = action.meta.requestId;
        }
      })
      .addCase(signupRequest.fulfilled, (state, action) => {
        console.log('signupRequest.fulfilled');
        const { requestId } = action.meta;
        if (state.loading === 'pending' && state.currentRequestId === requestId) {
          state.loading = 'idle';
          state.id = action.payload;
          state.currentRequestId = undefined;
        }
      })
      .addCase(signupRequest.rejected, (state, action) => {
        console.log('signupRequest.rejected');
        const { requestId } = action.meta;
        if (state.loading === 'pending' && state.currentRequestId === requestId) {
          state.loading = 'idle';
          state.error = action.error;
          state.currentRequestId = undefined;
        }
      });
  },
});

export const userState = (state: RootState): User => ({
  id: state.user.id,
  firstName: state.user.firstName,
  secondName: state.user.secondName,
  displayName: state.user.displayName,
  login: state.user.login,
  email: state.user.email,
  phone: state.user.phone,
  avatar: state.user.avatar,
  password: state.user.password,
});

export default userSlice.reducer;
