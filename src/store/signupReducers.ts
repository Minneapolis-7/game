/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { appState } from './appReducers';
import { setLoding } from './appReducers';
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
    signupReguested: () => {
      setLoding(true);
    },
    signupReguestSucceeded: (userState, action: PayloadAction<number>) => {
      console.log('---signUpReguestedSucceeded', action.payload);
      userState.userId = action.payload;
      setLoding(false);
    },
    signinReguested: () => {
      setLoding(true);
    },
    signinReguestSucceeded: (userState) => {
      console.log('---signInReguestedSucceeded');
      setLoding(false);
    },
    logoutReguestSucceeded: (userState, action: PayloadAction<number>) => {
      console.log('---logoutReguestedSucceeded', action.payload);
      userState.userId = action.payload;
      setLoding(false);
    },
  },
});

export const {
  signupReguested,
  signupReguestSucceeded,
  signinReguested,
  signinReguestSucceeded,
  logoutReguestSucceeded,
} = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState): number => state.counter.points;

export default userSlice.reducer;
