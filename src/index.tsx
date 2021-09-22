// Базовые стили должны идти первыми
// eslint-disable-next-line simple-import-sort/imports
import '@/css/main.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';

import ProtectedRoute from '@/modules/ProtectedRoute';
import RootErrorBoundary from '@/modules/RootErrorBoundary';
import routes from '@/shared/const/routes';
import initStore from '@/store/store';
import { RootState } from '@/shared/types/redux';

function startServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
      try {
        await navigator.serviceWorker.register('/service-worker.js');
      } catch (error) {
        throw new Error(error);
      }
    });
  }
}

if (process.env.NODE_ENV === 'production') {
  startServiceWorker();
}

declare global {
  interface Window {
    __INITIAL_STATE__?: RootState;
  }
  type AppDispatch = typeof store.dispatch;
}

const { store, history } = initStore(window.__INITIAL_STATE__!);

delete window.__INITIAL_STATE__;

ReactDOM.hydrate(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <RootErrorBoundary>
        <Switch>
          {routes.map((route) => {
            const Component = route.component;

            let RouteComponent: typeof Route | typeof ProtectedRoute = Route;

            if (route.protected) {
              RouteComponent = ProtectedRoute;
            }

            return (
              <RouteComponent key={route.path} path={route.path} exact={route.exact}>
                <Component title={route.title || ''} />
              </RouteComponent>
            );
          })}
        </Switch>
      </RootErrorBoundary>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
