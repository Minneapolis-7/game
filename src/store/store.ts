import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import appReducers from './reducers/appReducers';
import userReducers from './reducers/userReducers';

const store = configureStore({
  reducer: {
    app: appReducers,
    user: userReducers,
  },
  middleware: [thunk],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
