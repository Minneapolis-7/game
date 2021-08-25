import camelcaseKeys from 'camelcase-keys';
import snakecaseKeys from 'snakecase-keys';

import { UserProfileRequest, UserProfileResponse, UserRegistration } from '@/shared/types/types';

import { apiYandex } from './api';
import { ChangePasswordRequest, ProfileRequest, SignInRequest, SignUpRequest } from './types';

export default {
  async signin(user: SignInRequest): Promise<void> {
    await apiYandex.post('/auth/signin', user);
  },

  async signup(user: UserRegistration): Promise<number> {
    const userDTO: SignUpRequest = snakecaseKeys(user);
    const response = await apiYandex.post<{ id: number }>('/auth/signup', userDTO);

    return response?.data?.id;
  },

  async logout(): Promise<void> {
    await apiYandex.post('/auth/logout');
  },

  async profile(user: UserProfileRequest): Promise<UserProfileResponse> {
    const profile: ProfileRequest = snakecaseKeys(user);
    const { data } = await apiYandex.put<UserProfileResponse>('/user/profile', profile);
    const userProfile: UserProfileResponse = camelcaseKeys(data);

    return userProfile;
  },

  async profileAvatar(formData: FormData): Promise<UserProfileResponse> {
    const { data } = await apiYandex.put<UserProfileResponse>('/user/profile/avatar', formData);
    const userProfile: UserProfileResponse = camelcaseKeys(data);

    return userProfile;
  },

  async password(password: ChangePasswordRequest): Promise<void> {
    await apiYandex.put('/user/password', password);
  },
};
