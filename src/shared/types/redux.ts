import { RouterState } from 'connected-react-router';

import { Leader } from '@/api/types';
import { ForumCategoryData } from '@/shared/types/types';
import type { UserState } from '@/store/reducers/userReducers';

export type LeaderboardState = {
  leaderList: Leader[];
};

export type ForumState = {
  categories: ForumCategoryData[];
};

export type RootState = {
  readonly user: UserState;
  readonly leaderboard: LeaderboardState;
  readonly forum: ForumState;
  readonly router: RouterState;
};
