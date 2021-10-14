import { ForumCategoryAttributes } from '@/server/sequelize/models/Forum/ForumCategory';
import { ForumCommentAttributes } from '@/server/sequelize/models/Forum/ForumComment';
import { ForumCommentEmojiAttributes } from '@/server/sequelize/models/Forum/ForumCommentEmoji';
import { ForumSectionAttributes } from '@/server/sequelize/models/Forum/ForumSection';
import { ForumThreadAttributes } from '@/server/sequelize/models/Forum/ForumThread';
import { ForumThreadEmojiAttributes } from '@/server/sequelize/models/Forum/ForumThreadEmoji';
import { UserAttributes } from '@/server/sequelize/models/User';

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

export type ForumStatsData = {
  registeredCount: number;
  onlineUsers?: UserAttributes[];
};
export type ForumCommentEmojiData = ForumCommentEmojiAttributes & {
  users: UserAttributes[];
};
export type ForumThreadEmojiData = ForumThreadEmojiAttributes & {
  users: UserAttributes[];
};
export type ForumCommentData = ForumCommentAttributes & {
  commentEmojis: ForumCommentEmojiData[];
  user: UserAttributes;
};
export type ForumThreadData = ForumThreadAttributes & {
  comments: ForumCommentData[];
  threadEmojis: ForumThreadEmojiData[];
  user: UserAttributes;
};
export type ForumSectionData = ForumSectionAttributes & {
  threads: (ForumThreadAttributes & {
    comments: (ForumCommentAttributes & {
      user: UserAttributes;
    })[];
    user: UserAttributes;
  })[];
};

// это повторение того что уже определено в модели `ForumCategory`, правильно ли это?
// если использовать серверные модели в качестве клиентских типов, то возникают проблемы:
// - надо постоянно подтверждать тайпскрипту наличие опциональных полей (ведущих к ассоциированным сущностям),
// и это зависит от того, какая выборка из БД исопльзуется в данный момент (сделан ли include опциональных полей/ассоциаций)
// - сервера/моделей вообще может не быть в коде, а типы нужны
export type ForumCategoryData = ForumCategoryAttributes & {
  sections: ForumSectionData[];
};
