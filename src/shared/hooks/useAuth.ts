import { useEffect, useState } from 'react';

import userApi from '@/api/userApi';

type HookUseAuthState = {
  isChecking: boolean;
  isLoggedIn: boolean;
};

export default (): HookUseAuthState => {
  const [isChecking, setIsChecking] = useState(true);
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      setIsChecking(true);
      try {
        await userApi.getUser();

        setLoggedIn(true);
        setIsChecking(false);
      } catch (error) {
        setLoggedIn(false);
        setIsChecking(false);

        throw new Error();
      }
    };

    checkAuth();
  }, []);

  return { isChecking, isLoggedIn };
};
