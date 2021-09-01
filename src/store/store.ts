import { useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import userReducers from './reducers/userReducers';

const store = configureStore({
  reducer: {
    user: userReducers,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;
