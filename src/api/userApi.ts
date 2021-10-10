import type { Optional } from 'utility-types';

import { UserCreationAttributes } from '@/server/sequelize/models/User';
import { UserUpdatePayload } from '@/server/services/userService';

import { apiCustom, apiYandex } from './api';
import {
  SignInRequest,
  SignUpRequest,
  UpdatePasswordRequest,
  UpdateProfileRequest,
  UserProfile,
} from './types';

export default {
  async signin(user: SignInRequest): Promise<void> {
    await apiYandex.post('/auth/signin', user);
  },

  async signup(user: SignUpRequest): Promise<number> {
    const {
      data: { id: yandexUserId },
    } = await apiYandex.post<{ id: number }>('/auth/signup', user);
    const userCopy: Optional<SignUpRequest, 'password'> = user;

    delete userCopy.password;

    await apiCustom.post('/user', {
      yandexUserId,
      ...userCopy,
    } as UserCreationAttributes);

    return yandexUserId;
  },

  async logout(): Promise<void> {
    await apiYandex.post('/auth/logout');
  },

  async getUser(): Promise<UserProfile> {
    const { data } = await apiYandex.get('/auth/user');

    return data;
  },

  async updateProfile(user: UpdateProfileRequest): Promise<UserProfile> {
    const { data } = await apiYandex.put<UserProfile>('/user/profile', user);

    await apiCustom.put(`/user/${data.id}`, user as UserUpdatePayload);

    return data;
  },

  async updateAvatar(formData: FormData): Promise<UserProfile> {
    const { data } = await apiYandex.put<UserProfile>('/user/profile/avatar', formData);
    const { avatar, id } = data;

    await apiCustom.put(`/user/${id}`, { avatar } as UserUpdatePayload);

    return data;
  },

  async updatePassword(password: UpdatePasswordRequest): Promise<void> {
    await apiYandex.put('/user/password', password);
  },
};
