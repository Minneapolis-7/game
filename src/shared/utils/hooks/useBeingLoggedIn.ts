import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import useAuth from '@/shared/utils/hooks/useAuth';

export default function useBeingLoggedIn() {
  const history = useHistory();
  const { isChecking, isLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      history.replace('/');
    }
  }, [isChecking, isLoggedIn]);

  return isChecking;
}
