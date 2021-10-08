import { RouterState } from 'connected-react-router';

import { Leader } from '@/api/types';
import type { UserState } from '@/store/reducers/userReducers';

export type LeaderboardState = {
  leaderList: Leader[];
};

export type RootState = {
  readonly user: UserState;
  readonly leaderboard: LeaderboardState;
  readonly router: RouterState;
};
