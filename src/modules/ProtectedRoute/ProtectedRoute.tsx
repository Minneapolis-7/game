import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import paths from '@/shared/const/paths';
import useAuth from '@/shared/utils/hooks/useAuth';

function ProtectedRoute(props: RouteProps): JSX.Element | null {
  const { isChecking, isLoggedIn } = useAuth();

  if (isChecking) {
    return null;
  }

  return isLoggedIn ? <Route {...props} /> : <Redirect to={paths.LOGIN} />;
}

export default ProtectedRoute;
