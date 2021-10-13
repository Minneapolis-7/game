import { useContext, useEffect, useState } from 'react';

import AppContext from '@/AppContext';
import { ToastItem } from '@/components/ui/Toaster/Toast/types';
import translateErrorMessage from '@/shared/utils';
import { getUser } from '@/store/reducers/actions';
import { useAppDispatch } from '@/store/store';

type HookState = {
  isChecking: boolean;
  isLoggedIn: boolean;
};

export default (notify = false): HookState => {
  const [isChecking, setIsChecking] = useState(true);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const dispatch = useAppDispatch();
  const appContext = useContext(AppContext);

  useEffect(() => {
    const checkAuth = async () => {
      setIsChecking(true);

      try {
        await dispatch(getUser()).unwrap();

        setLoggedIn(true);
        setIsChecking(false);
      } catch (e) {
        setLoggedIn(false);
        setIsChecking(false);

        if (notify) {
          appContext?.addToastMessage({
            type: 'warning',
            description: translateErrorMessage(e.reason),
          } as ToastItem);
        }
      }
    };

    checkAuth();
  }, []);

  return { isChecking, isLoggedIn };
};
