import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory, createMemoryHistory } from 'history';
import { Reducer } from 'redux';

import { RootState } from '@/shared/types/redux';
import isServer from '@/shared/utils/isServer';

import userReducers from './reducers/userReducers';

function initStore(initialState: RootState, url = '/') {
  const history = isServer
    ? createMemoryHistory({ initialEntries: [url] })
    : createBrowserHistory();

  const store = configureStore({
    reducer: {
      user: userReducers,
      router: connectRouter(history) as Reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(routerMiddleware(history)),
    preloadedState: initialState,
  });

  return { store, history };
}

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default initStore;
