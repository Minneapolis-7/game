import React, { useEffect } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import useAuth from '@/shared/hooks/useAuth';

type ProtectedRouteProps = {
  children: JSX.Element;
};

function ProtectedRoute({ children, ...props }: ProtectedRouteProps & RouteProps): JSX.Element {
  const { isChecking, isLoggedIn } = useAuth();

  useEffect(() => {
    if (isChecking) {
      document.title = 'Загрузка ...';
    }
  }, [isChecking]);

  if (isChecking) {
    return <div>Загрузка ...</div>;
  }

  return <Route {...props}>{isLoggedIn ? <>{children}</> : <Redirect to="/login" />}</Route>;
}

export default ProtectedRoute;
