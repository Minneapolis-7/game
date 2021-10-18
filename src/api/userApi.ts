import type { Optional } from 'utility-types';

import { SiteThemeAttributes } from '@/server/sequelize/models/Themes/SiteTheme';
import { UserCreationAttributes } from '@/server/sequelize/models/User';
import { UserUpdatePayload } from '@/server/services/userService';

import { apiCustom, apiYandex } from './api';
import {
  SignInRequest,
  SignUpRequest,
  UpdatePasswordRequest,
  UpdateProfileRequest,
  UserLocalProfile,
  UserProfile,
  UserTheme,
} from './types';

/**
 * Все возвраты информации о юзере содержат данные о "локальном" юзере: `id` используется из локальной БД,
 * яндексовый `id` возвращается под свойством `yandexUserId`
 */
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

    const { data } = await apiCustom.post('/user', {
      yandexUserId,
      ...userCopy,
    } as UserCreationAttributes);

    return data.id;
  },

  async logout(): Promise<void> {
    await apiYandex.post('/auth/logout');
  },

  async getUser(): Promise<UserLocalProfile> {
    const yandexUser: Optional<UserProfile, 'id'> = await this.getYandexUser();
    const yandexUserId = yandexUser.id;
    let { data } = await apiCustom.get(`/user/${yandexUserId}`);

    if (!data) {
      delete yandexUser.id;

      const localUserData = {
        yandexUserId,
        ...yandexUser,
      };

      ({ data } = await apiCustom.post('/user', localUserData));
    }

    return data;
  },

  async getYandexUser(): Promise<UserProfile> {
    const { data } = await apiYandex.get('/auth/user');

    return data;
  },

  async getUserTheme(userId: number): Promise<SiteThemeAttributes> {
    const { data } = await apiCustom.get(`/theme/${userId}`);

    return data;
  },

  async setUserTheme(userTheme: UserTheme): Promise<void> {
    await apiCustom.post('/theme', userTheme);
  },

  async updateProfile(user: UpdateProfileRequest): Promise<UserLocalProfile> {
    const { data } = await apiYandex.put<UserProfile>('/user/profile', user);

    const { data: updatedUser } = await apiCustom.put(
      `/user/${data.id}`,
      user as UserUpdatePayload
    );

    return updatedUser;
  },

  async updateAvatar(formData: FormData): Promise<UserLocalProfile> {
    const { data } = await apiYandex.put<UserProfile>('/user/profile/avatar', formData);
    const { avatar, id } = data;

    const { data: updatedUser } = await apiCustom.put(`/user/${id}`, {
      avatar,
    } as UserUpdatePayload);

    return updatedUser;
  },

  async updatePassword(password: UpdatePasswordRequest): Promise<void> {
    await apiYandex.put('/user/password', password);
  },
};
