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

type AuthCookies = {
  uuid: string;
  authCookie: string;
};

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

    await this.updateProfile({
      ...userCopy,
      displayName: data.login,
    });

    return data.id;
  },

  async logout(): Promise<void> {
    await apiYandex.post('/auth/logout');
  },

  async getLocalUser(userId: number): Promise<UserLocalProfile> {
    const { data } = await apiCustom.get(`/user/${userId}`);

    return data;
  },

  async setLocalUser(user: UserProfile): Promise<UserLocalProfile> {
    const yandexUser: Optional<UserProfile, 'id'> = user;
    const yandexUserId = yandexUser.id as number;

    delete yandexUser.id;

    const localUserData = {
      yandexUserId,
      ...yandexUser,
    } as UserLocalProfile;

    const { data } = await apiCustom.post('/user', localUserData);

    localUserData.id = data.id;

    return localUserData;
  },

  async getUser(authCookies?: AuthCookies): Promise<UserLocalProfile> {
    const yandexUser = await this.getYandexUser(authCookies);

    return this.setLocalUser(yandexUser);
  },

  async getYandexUser(authCookies?: AuthCookies): Promise<UserProfile> {
    let config = {};

    if (authCookies) {
      const cookies = Object.entries(authCookies)
        .map((entry) => `${entry[0]}=${entry[1]}`)
        .join('; ');

      config = {
        headers: {
          Cookie: cookies,
        },
      };
    }

    const { data } = await apiYandex.get('/auth/user', config);

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
