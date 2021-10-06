import {
  ForumCommentEmoji,
  ForumCommentEmojiUser,
  ForumThreadEmoji,
  ForumThreadEmojiUser,
} from '@/server/sequelize/models';
import { ForumCommentEmojiAttributes } from '@/server/sequelize/models/Forum/ForumCommentEmoji';
import { ForumCommentEmojiUserAttributes } from '@/server/sequelize/models/Forum/ForumCommentEmojiUser';
import { ForumThreadEmojiAttributes } from '@/server/sequelize/models/Forum/ForumThreadEmoji';
import { ForumThreadEmojiUserAttributes } from '@/server/sequelize/models/Forum/ForumThreadEmojiUser';

import BaseService from '../BaseService';

export type ForumEmojiCreatePayload = Partial<
  Pick<ForumEmojiCreationAttributes, 'title' | 'content'>
>;

class ForumEmojiService extends BaseService {
  async create(record: ForumEmojiCreationAttributes): Promise<ForumEmoji> {
    return ForumEmoji.create(record);
  }

  async delete(threadId: number): Promise<void> {
    await ForumEmoji.destroy({ where: { id: threadId } });
  }

  async findByThread(sectionId: number): Promise<ForumEmoji[]> {
    return ForumEmoji.findAll({ where: { sectionId } });
  }

  async findByComment(userId: number): Promise<ForumEmoji[]> {
    return ForumEmoji.findAll({ where: { userId } });
  }
}

export default new ForumEmojiService();
