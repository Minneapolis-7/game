import { ForumCategoryAttributes } from '@/server/sequelize/models/Forum/ForumCategory';
import { ForumCommentAttributes } from '@/server/sequelize/models/Forum/ForumComment';
import { ForumSectionAttributes } from '@/server/sequelize/models/Forum/ForumSection';
import { ForumThreadAttributes } from '@/server/sequelize/models/Forum/ForumThread';

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

export type ForumCommentData = ForumCommentAttributes & {
  commentEmojis: ForumCommentData[];
};
export type ForumThreadData = ForumThreadAttributes & {
  comments: ForumCommentData[];
  threadEmojis: ForumCommentData[];
};
export type ForumSectionData = ForumSectionAttributes & {
  threads: ForumThreadAttributes[];
};
export type ForumCategoryData = ForumCategoryAttributes & {
  sections: ForumSectionAttributes[];
};
