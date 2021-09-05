// Базовые стили должны идти первыми
// eslint-disable-next-line simple-import-sort/imports
import '@/css/main.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import ProtectedRoute from '@/modules/ProtectedRoute';
import RootErrorBoundary from '@/modules/RootErrorBoundary';
import routes from '@/shared/const/routes';
import store from '@/store/store';

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

startServiceWorker();

ReactDOM.render(
  <Provider store={store}>
    <RootErrorBoundary>
      <Router>
        <Switch>
          {routes.map((route) => {
            const Component = route.component;

            let RouteComponent: typeof Route | typeof ProtectedRoute = Route;

            if (route.protected) {
              RouteComponent = ProtectedRoute;
            }

            return (
              <RouteComponent key={route.path} path={route.path} exact={route.exact}>
                <Component title={route.title} />
              </RouteComponent>
            );
          })}
        </Switch>
      </Router>
    </RootErrorBoundary>
  </Provider>,
  document.getElementById('root')
);
