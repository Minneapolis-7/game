import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import RootErrorBoundary from '@/modules/RootErrorBoundary';
import routes from '@/shared/const/routes';

import '@/css/main.scss';

ReactDOM.render(
  <RootErrorBoundary>
    <Router>
      <Switch>
        {routes.map((route) => {
          const Component = route.component;

          return (
            <Route key={route.path} path={route.path} exact={route.exact}>
              <Component title={route.title} />
            </Route>
          );
        })}
      </Switch>
    </Router>
  </RootErrorBoundary>,
  document.getElementById('root')
);
