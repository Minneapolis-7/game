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

  async find(commentId: number): Promise<ForumComment | null> {
    return ForumComment.findOne({
      where: { id: commentId },
      include: [
        User,
        {
          model: Emoji,
          through: { attributes: [] },
          include: [
            {
              model: ForumCommentEmoji,
              where: { id: commentId },
              include: [
                {
                  model: User,
                  through: { attributes: [] },
                },
              ],
            },
          ],
        },
      ],
    });
  }
}

export default new ForumCommentService();
