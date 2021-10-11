import { useLayoutEffect, useState } from 'react';
import { Optional } from 'utility-types';

import { apiCustom } from '@/api/api';
import oauthApi from '@/api/oauthApi';
import { UserProfile } from '@/api/types';
import { UserCreationAttributes } from '@/server/sequelize/models/User';
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

          const user: Optional<UserProfile, 'id'> = await dispatch(getUser()).unwrap();
          const { id: yandexUserId } = user;

          delete user.id;

          await apiCustom.post('/user', {
            yandexUserId,
            ...user,
          } as UserCreationAttributes);
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
