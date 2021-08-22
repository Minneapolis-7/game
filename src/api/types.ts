/* eslint-disable camelcase */
export type SignInRequest = {
  email: string;
  password: string;
};

// SignUpRequest
export type UserDTO = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
};

export type SignUpResponse = {
  id: number;
};