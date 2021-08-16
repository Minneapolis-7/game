import { User } from '../types';
import { UserDTO } from '../api/types';

export function transformUserFromDTO(playload: UserDTO): User {
  return {
    firstName: playload.first_name,
    lastName: playload.second_name,
    login: playload.login,
    email: playload.email,
    password: playload.password,
    phone: playload.phone,
  };
}

export function transformUserToDTO(playload: User): UserDTO {
  return {
    first_name: playload.firstName,
    second_name: playload.lastName,
    login: playload.login,
    email: playload.email,
    password: playload.password,
    phone: playload.phone,
  };
}
