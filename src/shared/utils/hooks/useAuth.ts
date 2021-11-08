import { useContext, useEffect, useState } from 'react';

import AppContext from '@/AppContext';
import { ToastItem } from '@/components/ui/Toaster/Toast/types';
import translateError from '@/shared/utils';
import { getUser } from '@/store/reducers/actions';
import { useAppDispatch, useAppSelector } from '@/store/store';

type HookState = {
  isChecking: boolean;
  isLoggedIn: boolean;
};

export default (notify = false): HookState => {
  const user = useAppSelector((state) => state.user);
  const [isChecking, setIsChecking] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(!!user.id);
  const dispatch = useAppDispatch();
  const appContext = useContext(AppContext);

  if (!isLoggedIn && user.id) {
    setLoggedIn(true);
  }

  useEffect(() => {
    const checkAuth = async () => {
      if (isLoggedIn) {
        return;
      }

      setIsChecking(true);

      try {
        await dispatch(getUser()).unwrap();

        setLoggedIn(true);
      } catch (e) {
        setLoggedIn(false);

        if (notify) {
          appContext?.addToastMessage({
            type: 'warning',
            description: translateError(e),
          } as ToastItem);
        }
      } finally {
        setIsChecking(false);
      }
    };

    checkAuth();
  }, [isLoggedIn, dispatch, user.id, notify]);

  return { isChecking, isLoggedIn };
};
