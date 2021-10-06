import { ForumCommentEmoji, ForumCommentEmojiUser } from '@/server/sequelize/models';

import BaseService from '../BaseService';

export type ForumCommentEmojiUserIdentifier = {
  emojiId: number;
  userId: number;
  commentId: number;
};

class ForumCommentEmojiService extends BaseService {
  async create({ emojiId, userId, commentId }: ForumCommentEmojiUserIdentifier): Promise<void> {
    const { id: commentEmojiId } = await ForumCommentEmoji.create({ commentId, emojiId });

    await ForumCommentEmojiUser.create({ userId, commentEmojiId });
  }

  async delete({ emojiId, userId, commentId }: ForumCommentEmojiUserIdentifier): Promise<void> {
    const query = {
      where: {
        commentId,
        emojiId,
      },
    };
    const commentEmoji = await ForumCommentEmoji.findOne(query);

    if (!commentEmoji) {
      return;
    }

    const commentEmojiId = commentEmoji.id;

    await ForumCommentEmoji.destroy(query);
    await ForumCommentEmojiUser.destroy({
      where: { userId, commentEmojiId },
    });
  }
}

export default new ForumCommentEmojiService();
