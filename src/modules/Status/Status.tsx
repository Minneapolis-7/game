import * as React from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';

type StatusProps = {
  code: number;
  children: React.ReactNode;
};

function Status({ code, children }: StatusProps): JSX.Element {
  const render = ({ staticContext }: RouteComponentProps) => {
    if (staticContext) {
      staticContext.statusCode = code;
    }

    return children;
  };

  return <Route render={render} />;
}

export default Status;
