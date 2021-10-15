// import { Op } from 'sequelize';

import {
  Emoji,
  ForumComment,
  ForumCommentEmoji,
  ForumThread,
  ForumThreadEmoji,
  User,
} from '@/server/sequelize/models';
import { ForumThreadCreationAttributes } from '@/server/sequelize/models/Forum/ForumThread';

import BaseService from '../BaseService';

export type ForumThreadUpdatePayload = Partial<
  Pick<ForumThreadCreationAttributes, 'title' | 'content'>
>;

class ForumThreadService extends BaseService {
  async create(record: ForumThreadCreationAttributes): Promise<ForumThread> {
    return ForumThread.create(record);
  }

  async update(threadId: number, record: ForumThreadUpdatePayload): Promise<void> {
    await ForumThread.update(
      {
        isModified: true,
        ...record,
      },
      { where: { id: threadId } }
    );
  }

  async incrementVisited(threadId: number): Promise<void> {
    await ForumThread.increment(
      {
        visitedCounter: 1,
      },
      { where: { id: threadId } }
    );
  }

  async delete(threadId: number): Promise<void> {
    await ForumThread.destroy({ where: { id: threadId } });
  }

  async find(threadId: number): Promise<ForumThread | null> {
    return ForumThread.findOne({
      where: {
        id: threadId,
        // '$ForumCommentEmoji.id$': { [Op.eq]: Sequelize.col('ForumComment.id') },
      },
      include: [
        User,
        {
          model: Emoji,
          through: { attributes: [] },
          include: [
            {
              model: ForumThreadEmoji,
              where: { threadId },
              include: [
                {
                  model: User,
                  through: { attributes: [] },
                },
              ],
            },
          ],
        },
        {
          model: ForumComment,
          include: [
            User,
            {
              model: Emoji,
              through: { attributes: [] },
              include: [
                {
                  model: ForumCommentEmoji,
                  // where: { commentId: Sequelize.col('ForumComment.id') },
                  // where: { commentId: { [Op.col]: 'ForumComment.id' } },
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
        },
      ],
      order: [[{ model: ForumComment, as: 'comments' }, 'createdAt', 'ASC']],
    });
  }
}

export default new ForumThreadService();
