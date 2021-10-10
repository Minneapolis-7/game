export type UserData = {
  id: number | null;
  firstName: string;
  secondName: string;
  displayName: string | null;
  login: string;
  email: string;
  password: string;
  phone: string;
  avatar: string | null;
};

export type EmojiUserIdentifier = {
  userId: number;
  emojiId: number;
};
