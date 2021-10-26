import { useLayoutEffect, useState } from 'react';

import oauthApi from '@/api/oauthApi';
import { OAUTH_REDIRECT_URI } from '@/shared/const/const';
import { getUser } from '@/store/reducers/actions';
import { useAppDispatch } from '@/store/store';

export default function useOAuth() {
  const dispatch = useAppDispatch();

  const [isAuthorizing, setIsAuthorizing] = useState(false);

  useLayoutEffect(() => {
    const oauthCode = new URLSearchParams(window.location.search).get('code');

    if (oauthCode) {
      const authorize = async () => {
        try {
          await oauthApi.signin({
            code: oauthCode,
            redirectUri: OAUTH_REDIRECT_URI,
          });

          await dispatch(getUser('')).unwrap();
        } catch (e) {
          throw new Error(e);
        } finally {
          window.history.replaceState(null, document.title, window.location.pathname);
          setIsAuthorizing(false);
        }
      };

      setIsAuthorizing(true);
      authorize();
    }
  }, []);

  return isAuthorizing;
}
