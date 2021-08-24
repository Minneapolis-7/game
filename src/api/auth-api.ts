import { User } from '@/shared/types/types';
import { transformUserToDTO } from '@/shared/utils/transformUser';

import { apiYandex } from './api';
import { SignInRequest, UserDTO } from './types';

export default {
  async signin(user: SignInRequest): Promise<void> {
    await apiYandex.post('/auth/signin', user);
  },

  async signup(user: User): Promise<number> {
    const userDTO: UserDTO = transformUserToDTO(user);
    const response = await apiYandex.post<{ id: number }>('/auth/signup', userDTO);

    return response?.data?.id;
  },
};
