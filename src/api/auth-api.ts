import { AxiosResponse } from 'axios';
import { apiYandex } from './api';
import { SignInRequest, UserDTO } from './types';
import { User } from '../types';
import { transformUserToDTO } from '../utils/transformUser';

export default {
  async signin(user: SignInRequest): Promise<void> {
    await apiYandex.post('/auth/signin', user);
  },

  async signup(user: User): Promise<AxiosResponse<number>> {
    const userDTO: UserDTO = transformUserToDTO(user);
    const response = await apiYandex.post('/auth/signup', userDTO);
    return response?.data?.id;
  },
};
