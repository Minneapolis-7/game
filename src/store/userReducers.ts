/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { UpdateProfileResponse } from '@/api/types';
import { User } from '@/shared/types/types';

import { setLoding } from './appReducers';

// Define a type for the slice state
// interface UserState {
//   userId: number | null;
// }

// Define the initial state using that type
const initialState: User = {
  id: null,
  firstName: '',
  secondName: '',
  displayName: null,
  login: '',
  email: '',
  password: '',
  phone: '',
  avatar: null,
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
      userState.id = action.payload;
      setLoding(false);
    },
    signinReguested: () => {
      setLoding(true);
    },
    signinReguestSucceeded: () => {
      console.log('---signInReguestedSucceeded');
      setLoding(false);
    },
    logoutReguested: () => {
      setLoding(true);
    },
    logoutReguestSucceeded: () => {
      console.log('---logoutReguestedSucceeded');
      setLoding(false);
    },
    updateProfileReguested: () => {
      setLoding(true);
    },
    updateProfileSucceeded: (userState, action: PayloadAction<UpdateProfileResponse>) => {
      console.log('---updateProfileSucceeded', action.payload);
      userState.id = action.payload.id;
      userState.firstName = action.payload.firstName;
      userState.secondName = action.payload.secondName;
      userState.displayName = action.payload.displayName;
      userState.login = action.payload.login;
      userState.email = action.payload.email;
      userState.phone = action.payload.phone;
      userState.avatar = action.payload.avatar;
      setLoding(false);
    },
  },
});

export const {
  signupReguested,
  signupReguestSucceeded,
  signinReguested,
  signinReguestSucceeded,
  logoutReguested,
  logoutReguestSucceeded,
  updateProfileReguested,
  updateProfileSucceeded,
} = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState): number => state.counter.points;

export default userSlice.reducer;
