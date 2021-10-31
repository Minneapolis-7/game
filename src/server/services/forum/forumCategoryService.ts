import {
  ForumCategory,
  ForumComment,
  ForumSection,
  ForumThread,
  User,
} from '@/server/sequelize/models';
import { ForumCategoryCreationAttributes } from '@/server/sequelize/models/Forum/ForumCategory';

import BaseService from '../BaseService';

class ForumCategoryService extends BaseService {
  async create(record: ForumCategoryCreationAttributes): Promise<ForumCategory> {
    return ForumCategory.create(record);
  }

  async delete(categoryId: number): Promise<void> {
    await ForumCategory.destroy({ where: { id: categoryId } });
  }

  async findAll(): Promise<ForumCategory[]> {
    return ForumCategory.findAll({
      include: {
        model: ForumSection,
        include: [
          {
            model: ForumThread,
            limit: 1,
            separate: true,
            order: [['lastPosted', 'DESC']],
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
        ],
      },
      order: [
        ['createdAt', 'DESC'],
        [{ model: ForumSection, as: 'sections' }, 'createdAt', 'DESC'],
      ],
    });
  }
}

export default new ForumCategoryService();
