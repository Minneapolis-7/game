import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import signupReducers from './signupReducers';
import appReducers from './appReducers';
import authSaga from './signupSagas';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    signup: signupReducers,
    app: appReducers,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(authSaga);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
