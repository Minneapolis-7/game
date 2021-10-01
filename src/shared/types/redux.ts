import { RouterState } from 'connected-react-router';

import type { UserState } from '@/store/reducers/userReducers';

export type RootState = {
  readonly user: UserState;
  readonly router: RouterState;
};
