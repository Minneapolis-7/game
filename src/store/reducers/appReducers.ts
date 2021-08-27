/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '@/store/store';

type appState = {
  loading: boolean;
  error: XMLHttpRequest | null;
};

const initialState: appState = {
  loading: false,
  error: null,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLoding: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    reguestedFailed: (state, action: PayloadAction<XMLHttpRequest>) => {
      state.error = action.payload.response;
      state.loading = false;
    },
  },
});

export const { setLoding, reguestedFailed } = appSlice.actions;

export const appState = (state: RootState): appState => ({
  loading: state.app.loading,
  error: state.app.error,
});

export default appSlice.reducer;
