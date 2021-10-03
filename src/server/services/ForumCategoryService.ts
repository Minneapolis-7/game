import { ForumCategory, ForumSection } from '@/server/sequelize/models';
import type { ForumCategoryAttributes } from '@/server/sequelize/models/Forum/ForumCategory';

import BaseService from './BaseService';

export default class ForumCategoryService extends BaseService {
  async create(record: ForumCategoryAttributes): Promise<ForumCategory> {
    return ForumCategory.create(record);
  }

  async createBulk(records: ForumCategoryAttributes[]): Promise<ForumCategory[]> {
    return ForumCategory.bulkCreate(records);
  }

  async delete(categoryId: number): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await ForumSection.destroy({ where: { id: categoryId } });
  }

  async findAll(): Promise<ForumCategory[]> {
    return ForumCategory.findAll();
  }
}
