import { User } from '../types';
import { UserDTO } from '../api/types';

export function transformUserFromDTO(data: UserDTO): User {
  return {
    firstName: data.first_name,
    lastName: data.second_name,
    login: data.login,
    email: data.email,
    password: data.password,
    phone: data.phone,
  };
}

export function transformUserToDTO(data: User): UserDTO {
  return {
    first_name: data.firstName,
    second_name: data.lastName,
    login: data.login,
    email: data.email,
    password: data.password,
    phone: data.phone,
  };
}
