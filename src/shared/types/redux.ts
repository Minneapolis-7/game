import { AsyncThunk } from '@reduxjs/toolkit';
import { RouterState } from 'connected-react-router';

import { LeaderData, UserLocalProfile } from '@/api/types';
import { EmojiAttributes } from '@/server/sequelize/models/Emoji';
import {
  ForumCategoryData,
  ForumSectionData,
  ForumStatsData,
  ForumThreadData,
} from '@/shared/types/types';
import type { UserState } from '@/store/reducers/userReducers';

export type ProfileState = UserLocalProfile & {
  isLoading: boolean;
};

export type LeaderboardState = {
  leaderList: LeaderData[] | null;
  isLoading: boolean;
};

export type ForumState = {
  categories: ForumCategoryData[];
  section: Nullable<ForumSectionData>;
  thread: Nullable<ForumThreadData>;
  stats: Nullable<ForumStatsData>;
  availableEmojis: EmojiAttributes[];
  isLoading: boolean;
  isLoaded: boolean;
};

export type RootState = {
  readonly user: UserState;
  readonly profile: ProfileState;
  readonly leaderboard: LeaderboardState;
  readonly forum: ForumState;
  readonly router: RouterState;
};

// todo: понять что ставить вместо `any`, взятого из примера: https://redux-toolkit.js.org/api/createReducer#builderaddmatcher
export type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;
export type PendingAction = ReturnType<GenericAsyncThunk['pending']>;
export type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>;
export type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>;
