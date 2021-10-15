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
      where: { id: threadId },
      include: [
        User,
        {
          model: Emoji,
          through: { attributes: [] },
          include: [
            {
              model: ForumThreadEmoji,
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
