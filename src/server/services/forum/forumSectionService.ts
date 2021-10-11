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
      order: [[ForumThread, 'lastPosted', 'DESC']],
    });
  }
}

export default new ForumSectionService();
