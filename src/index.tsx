// Базовые стили должны идти первыми
// eslint-disable-next-line simple-import-sort/imports
import '@/css/main.scss';

import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';

import ProtectedRoute from '@/modules/ProtectedRoute';
import RootErrorBoundary from '@/modules/RootErrorBoundary';
import routes from '@/shared/const/routes';
import initStore from '@/store/store';
import { RootState } from '@/shared/types/redux';
import { ToastItem } from '@/components/ui/Toaster/Toast/types';
import AppContext from './AppContext';
import { Toaster } from '@/components/ui';

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

function App(): JSX.Element {
  const [toastList, setToastList] = useState<Array<ToastItem>>([]);
  const ctx = {
    addToastMessage(toast: ToastItem) {
      setToastList((oldToastList) => [...oldToastList, toast]);
    },
    removeToastMessage(id: number) {
      setToastList((oldToastList) => {
        const toastListItem = oldToastList.findIndex((e) => e.id === id);

        oldToastList.splice(toastListItem, 1);

        return [...oldToastList];
      });
    },
  };

  return (
    <Provider store={store}>
      <AppContext.Provider value={ctx}>
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
        <Toast toastList={toastList} position="bottom-right" timeout={5000} />
      </AppContext.Provider>
    </Provider>
  );
}

ReactDOM.hydrate(<App />, document.getElementById('root'));
