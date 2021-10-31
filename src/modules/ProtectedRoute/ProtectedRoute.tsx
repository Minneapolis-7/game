import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import { Spinner } from '@/components/ui';
import { SizeLabels } from '@/shared/const/const';
import paths from '@/shared/const/paths';
import useAuth from '@/shared/utils/hooks/useAuth';

function ProtectedRoute(props: RouteProps): JSX.Element {
  const { isChecking, isLoggedIn } = useAuth(true);

  if (isChecking) {
    return <Spinner size={SizeLabels.XL} />;
  }

  return isLoggedIn ? <Route {...props} /> : <Redirect to={paths.LOGIN} />;
}

export default ProtectedRoute;
