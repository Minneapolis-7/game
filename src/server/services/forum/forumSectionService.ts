import { ForumComment, ForumSection, ForumThread, User } from '@/server/sequelize/models';
import { ForumSectionCreationAttributes } from '@/server/sequelize/models/Forum/ForumSection';

import BaseService from '../BaseService';

class ForumSectionService extends BaseService {
  async create(record: ForumSectionCreationAttributes): Promise<ForumSection> {
    return ForumSection.create(record);
  }

  async delete(sectionId: number): Promise<void> {
    await ForumSection.destroy({ where: { id: sectionId } });
  }

  async find(sectionId: number): Promise<ForumSection | null> {
    return ForumSection.findOne({
      where: { id: sectionId },
      include: {
        model: ForumThread,
        // todo: включать количество комментариев в тредах
        // https://github.com/sequelize/sequelize/issues/222
        // https://stackoverflow.com/questions/37817808/counting-associated-entries-with-sequelize
        include: [
          {
            model: ForumComment,
            limit: 1,
            separate: true,
            order: [['createdAt', 'DESC']],
            include: [User],
          },
          User,
        ],
      },
      order: [[{ model: ForumThread, as: 'threads' }, 'lastPosted', 'DESC']],
    });
  }
}

export default new ForumSectionService();
