/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

// Define a type for the slice state
interface appState {
  loading: boolean;
  error: boolean;
}

// Define the initial state using that type
const initialState: appState = {
  loading: false,
  error: false,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLoding: (state, action: PayloadAction<boolean>) => {
      console.log('---setLoding');
      state.loading = action.payload;
    },
    reguestedFailed: (state, action: PayloadAction<string>) => {
      console.log('---reguestedFailed', action.payload);
      state.error = true;
      state.loading = false;
    },
  },
});

export const { setLoding, reguestedFailed } = appSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const appState = (state: RootState): appState => ({
  loading: state.app.loading,
  error: state.app.error,
});

export default appSlice.reducer;
