import { transformUserToDTO } from 'utils/transformUser';
import { User } from 'types';
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
