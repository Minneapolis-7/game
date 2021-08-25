export type User = {
  id: number;
  firstName: string;
  secondName: string;
  displayName: string | null;
  login: string;
  email: string;
  password: string;
  phone: string;
  avatar: string | null;
};

export type UserRegistration = Omit<User, 'id' | 'displayName' | 'avatar'>;

export type UserProfileRequest = Omit<User, 'id' | 'password' | 'avatar'>;

export type UserProfileResponse = Omit<User, 'password'>;

export type UserResponse = Omit<User, 'password'>;
