import { ForumThreadEmoji, ForumThreadEmojiUser } from '@/server/sequelize/models';

import BaseService from '../BaseService';

export type ForumThreadEmojiUserIdentifier = {
  emojiId: number;
  userId: number;
  threadId: number;
};

class ForumThreadEmojiService extends BaseService {
  async create({ emojiId, userId, threadId }: ForumThreadEmojiUserIdentifier): Promise<void> {
    const { id: threadEmojiId } = await ForumThreadEmoji.create({ threadId, emojiId });

    await ForumThreadEmojiUser.create({ userId, threadEmojiId });
  }

  async delete({ emojiId, userId, threadId }: ForumThreadEmojiUserIdentifier): Promise<void> {
    const query = {
      where: {
        threadId,
        emojiId,
      },
    };
    const threadEmoji = await ForumThreadEmoji.findOne(query);

    if (!threadEmoji) {
      return;
    }

    const threadEmojiId = threadEmoji.id;

    await ForumThreadEmoji.destroy(query);
    await ForumThreadEmojiUser.destroy({
      where: { userId, threadEmojiId },
    });
  }
}

export default new ForumThreadEmojiService();
