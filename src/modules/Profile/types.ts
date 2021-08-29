export type ProfileFields = {
  displayName: string;
} & Omit<RegistrationData, 'password' | 'passwordRepeat'>;

export type PasswordFields = {
  oldPassword: string;
  newPassword: string;
};
