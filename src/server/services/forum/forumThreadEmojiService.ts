import { Emoji, ForumThreadEmoji, ForumThreadEmojiUser, User } from '@/server/sequelize/models';
import { EmojiUserIdentifier } from '@/shared/types/types';

import BaseService from '../BaseService';

export type ForumThreadEmojiUserIdentifier = EmojiUserIdentifier & {
  threadId: number;
};

class ForumThreadEmojiService extends BaseService {
  async create({
    emojiId,
    userId,
    threadId,
  }: ForumThreadEmojiUserIdentifier): Promise<ForumThreadEmojiUser> {
    const threadEmoji = await ForumThreadEmoji.create({ threadId, emojiId });

    return ForumThreadEmojiUser.create({ userId, threadEmojiId: threadEmoji.get('id') });
  }

  async find(threadEmojiId: number): Promise<ForumThreadEmoji | null> {
    return ForumThreadEmoji.findOne({
      where: { id: threadEmojiId },
      include: [
        {
          model: User,
          through: { attributes: [] },
        },
        Emoji,
      ],
    });
  }

  async delete({ emojiId, userId, threadId }: ForumThreadEmojiUserIdentifier): Promise<void> {
    const query = {
      where: {
        threadId,
        emojiId,
      },
      include: [
        {
          model: User,
          where: { id: userId },
          required: true,
        },
        Emoji,
      ],
    };
    const threadEmoji = await ForumThreadEmoji.findOne(query);

    if (!threadEmoji) {
      return;
    }

    await ForumThreadEmoji.destroy({
      where: { id: threadEmoji.get('id') },
    });
  }
}

export default new ForumThreadEmojiService();
