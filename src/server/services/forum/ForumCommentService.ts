import { Emoji, ForumComment, ForumCommentEmoji, User } from '@/server/sequelize/models';
import { ForumCommentCreationAttributes } from '@/server/sequelize/models/Forum/ForumComment';

import BaseService from '../BaseService';

export type ForumCommentUpdatePayload = Pick<ForumCommentCreationAttributes, 'content'>;

class ForumCommentService extends BaseService {
  async create(record: ForumCommentCreationAttributes): Promise<ForumComment> {
    const comment = await ForumComment.create(record);
    const thread = await comment.$get('thread');

    if (thread) {
      thread.set('lastPosted', comment.get('createdAt'));
      await thread.save();
    }

    return comment;
  }

  async update(commentId: number, record: ForumCommentUpdatePayload): Promise<void> {
    await ForumComment.update(
      {
        isModified: true,
        ...record,
      },
      { where: { id: commentId } }
    );
  }

  async delete(commentId: number): Promise<void> {
    await ForumComment.destroy({ where: { id: commentId } });
  }

  async findByUser(userId: number): Promise<ForumComment[]> {
    return ForumComment.findAll({
      where: { userId },
      include: {
        model: ForumCommentEmoji,
        include: [
          {
            model: User,
            through: { attributes: [] },
          },
          Emoji,
        ],
      },
    });
  }
}

export default new ForumCommentService();
