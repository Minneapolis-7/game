import { RouterState } from 'connected-react-router';

import { UserProfile } from '@/api/types';

export type RootState = {
  readonly user: UserProfile;
  readonly router: RouterState;
};
