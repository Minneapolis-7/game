/* eslint-disable camelcase */
export type SignInRequest = {
  email: string;
  password: string;
};

export type UserDTO = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  password: string;
  email: string;
  phone: string;
  avatar: string;
};

export type SignUpRequest = Omit<UserDTO, 'id' | 'display_name' | 'avatar'>;

export type ProfileRequest = Omit<UserDTO, 'id' | 'password' | 'avatar'>;

export type SignUpResponse = Pick<UserDTO, 'id'>;

export type UserResponse = Omit<UserDTO, 'password'>;

export type ChangePasswordRequest = {
  oldPassword: string;
  newPassword: string;
};
