import { RouterState } from 'connected-react-router';

import { User } from '@/shared/types/types';

export type RootState = {
  readonly user: User;
  readonly router: RouterState;
};
