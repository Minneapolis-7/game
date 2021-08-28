import { User } from '@/shared/types/types';

export type SignInRequest = {
  email: string;
  password: string;
};

export type SignUpRequest = Omit<User, 'id' | 'displayName' | 'avatar'>;

export type GetProfileRequest = Omit<User, 'password'>;

export type UpdateProfileRequest = Omit<User, 'id' | 'password' | 'avatar'>;

export type UpdateProfileResponse = Omit<User, 'password'>;

export type UpdatePasswordRequest = {
  oldPassword: string;
  newPassword: string;
};
