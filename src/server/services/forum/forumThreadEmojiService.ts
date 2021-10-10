import { ForumThreadEmoji, ForumThreadEmojiUser } from '@/server/sequelize/models';
import { EmojiUserIdentifier } from '@/shared/types/types';

import BaseService from '../BaseService';

export type ForumThreadEmojiUserIdentifier = EmojiUserIdentifier & {
  threadId: number;
};

class ForumThreadEmojiService extends BaseService {
  async create({ emojiId, userId, threadId }: ForumThreadEmojiUserIdentifier): Promise<void> {
    const threadEmoji = await ForumThreadEmoji.create({ threadId, emojiId });

    await ForumThreadEmojiUser.create({ userId, threadEmojiId: threadEmoji.get('id') });
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

    const threadEmojiId = threadEmoji.get('id');

    await ForumThreadEmoji.destroy(query);
    await ForumThreadEmojiUser.destroy({
      where: { userId, threadEmojiId },
    });
  }
}

export default new ForumThreadEmojiService();
