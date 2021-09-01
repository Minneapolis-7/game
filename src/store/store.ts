import { useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import thunk, { ThunkMiddleware } from 'redux-thunk';

import userReducers from './reducers/userReducers';

const store = configureStore({
  reducer: {
    user: userReducers,
  },
  middleware: [thunk as ThunkMiddleware],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;
