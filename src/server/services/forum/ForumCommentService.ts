import { Emoji, ForumComment, ForumCommentEmoji, User } from '@/server/sequelize/models';
import { ForumCommentCreationAttributes } from '@/server/sequelize/models/Forum/ForumComment';

import BaseService from '../BaseService';

export type ForumCommentUpdatePayload = Pick<ForumCommentCreationAttributes, 'content'>;

class ForumCommentService extends BaseService {
  async create(record: ForumCommentCreationAttributes): Promise<ForumComment> {
    return ForumComment.create(record);
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
