import { apiYandex } from './api';
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
    const { data } = await apiYandex.post<{ id: number }>('/auth/signup', user);

    return data.id;
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

    return data;
  },

  async updateAvatar(formData: FormData): Promise<UserProfile> {
    const { data } = await apiYandex.put<UserProfile>('/user/profile/avatar', formData);

    return data;
  },

  async updatePassword(password: UpdatePasswordRequest): Promise<void> {
    await apiYandex.put('/user/password', password);
  },
};
