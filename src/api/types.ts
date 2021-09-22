import { User } from '@/shared/types/types';

export type UserProfile = Omit<User, 'password'>;

export type SignInRequest = {
  login: string;
  password: string;
};

export type SignUpRequest = Omit<User, 'id' | 'displayName' | 'avatar'>;

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
