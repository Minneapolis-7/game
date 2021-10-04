import { ForumCategory } from '@/server/sequelize/models';
import { ForumCategoryCreationAttributes } from '@/server/sequelize/models/Forum/ForumCategory';

import BaseService from '../BaseService';

class ForumCategoryService extends BaseService {
  async create(record: ForumCategoryCreationAttributes): Promise<ForumCategory> {
    return ForumCategory.create(record);
  }

  async createBulk(records: ForumCategoryCreationAttributes[]): Promise<ForumCategory[]> {
    return ForumCategory.bulkCreate(records);
  }

  async delete(categoryId: number): Promise<void> {
    await ForumCategory.destroy({ where: { id: categoryId } });
  }

  async findAll(): Promise<ForumCategory[]> {
    return ForumCategory.findAll();
  }
}

export default new ForumCategoryService();
