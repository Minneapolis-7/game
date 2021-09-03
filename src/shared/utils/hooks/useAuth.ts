import { useEffect, useState } from 'react';

import userApi from '@/api/userApi';

type HookState = {
  isChecking: boolean;
  isLoggedIn: boolean;
};

export default (): HookState => {
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
