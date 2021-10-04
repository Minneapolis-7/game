import { ForumThread } from '@/server/sequelize/models';
import type { ForumThreadCreationAttributes } from '@/server/sequelize/models/Forum/ForumThread';

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

  async updateVisited(threadId: number): Promise<void> {
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

  async findBySection(sectionId: number): Promise<ForumThread[]> {
    return ForumThread.findAll({ where: { sectionId } });
  }

  async findByUser(userId: number): Promise<ForumThread[]> {
    return ForumThread.findAll({ where: { userId } });
  }
}

export default new ForumThreadService();
