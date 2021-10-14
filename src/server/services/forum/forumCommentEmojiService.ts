import { Emoji, ForumCommentEmoji, ForumCommentEmojiUser, User } from '@/server/sequelize/models';
import { EmojiUserIdentifier } from '@/shared/types/types';

import BaseService from '../BaseService';

export type ForumCommentEmojiUserIdentifier = EmojiUserIdentifier & {
  commentId: number;
};

class ForumCommentEmojiService extends BaseService {
  async create({
    emojiId,
    userId,
    commentId,
  }: ForumCommentEmojiUserIdentifier): Promise<ForumCommentEmojiUser> {
    const commentEmoji = await ForumCommentEmoji.create({ commentId, emojiId });

    return ForumCommentEmojiUser.create({ userId, commentEmojiId: commentEmoji.get('id') });
  }

  async find(commentEmojiId: number): Promise<ForumCommentEmoji | null> {
    return ForumCommentEmoji.findOne({
      where: { id: commentEmojiId },
      include: [
        {
          model: User,
          through: { attributes: [] },
        },
        Emoji,
      ],
    });
  }

  async delete({
    emojiId,
    userId,
    commentId,
  }: ForumCommentEmojiUserIdentifier): Promise<ForumCommentEmoji | false> {
    const query = {
      where: {
        commentId,
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
    const commentEmoji = await ForumCommentEmoji.findOne(query);

    if (!commentEmoji) {
      return false;
    }

    const commentEmojiId = commentEmoji.get('id');

    await ForumCommentEmoji.destroy({
      where: { id: commentEmojiId },
    });

    return commentEmoji;
  }
}

export default new ForumCommentEmojiService();
