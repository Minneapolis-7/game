import { RouterState } from 'connected-react-router';

import { Leader, UserProfile } from '@/api/types';

export type LeaderboardState = {
  leaderList: Leader[];
};

export type RootState = {
  readonly user: UserProfile;
  readonly leaderboard: LeaderboardState;
  readonly router: RouterState;
};
