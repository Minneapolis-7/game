import { UserData } from '@/shared/types/types';

export type UserProfile = Omit<UserData, 'password'>;

export type SignInRequest = {
  login: string;
  password: string;
};

export type SignUpRequest = Omit<UserData, 'id' | 'displayName' | 'avatar'>;

export type UpdateProfileRequest = Omit<UserProfile, 'id' | 'avatar'>;

export type UpdatePasswordRequest = {
  oldPassword: string;
  newPassword: string;
};

export type OAuthClientIdRequest = {
  redirectUri: string;
};

export type OauthSignInRequest = {
  code: string;
  redirectUri: string;
};

export type Leader = {
  id: number;
  nickname: string;
  points: number;
};

export type NewLeaderData = {
  data: Leader;
  ratingFieldName: string;
};

export type LeaderboardRequest = {
  ratingFieldName: string;
  cursor: number;
  limit: number;
};

export type TeamLeaderboardRequest = {
  teamName: string;
  value: LeaderboardRequest;
};
