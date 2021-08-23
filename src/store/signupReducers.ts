/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import type { RootState } from './store';

// Define a type for the slice state
interface UserState {
  userId: number | null;
  loading: boolean;
  error: boolean;
}

// Define the initial state using that type
const initialState: UserState = {
  userId: null,
  loading: false,
  error: false,
};

export const userSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    signupReguested: (state) => {
      console.log('---signupReguested');
      state.loading = true;
    },
    signupReguestedSucceeded: (state, action: PayloadAction<number>) => {
      console.log('---signupReguestedSucceeded', action.payload);
      state.userId = action.payload;
      state.loading = false;
    },
    signupReguestedFailed: (state, action: PayloadAction<string>) => {
      console.log('---signupReguestedFailed', action.payload);
      state.error = true;
      state.loading = false;
    },
  },
});

export const { signupReguested, signupReguestedSucceeded, signupReguestedFailed } =
  userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState): number => state.counter.points;

export default userSlice.reducer;
