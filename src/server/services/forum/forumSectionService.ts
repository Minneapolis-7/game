import { ForumSection } from '@/server/sequelize/models';
import { ForumSectionAttributes } from '@/server/sequelize/models/Forum/ForumSection';

import BaseService from '../BaseService';

class ForumSectionService extends BaseService {
  async create(record: ForumSectionAttributes): Promise<ForumSection> {
    return ForumSection.create(record);
  }

  async createBulk(records: ForumSectionAttributes[]): Promise<ForumSection[]> {
    return ForumSection.bulkCreate(records);
  }

  async delete(sectionId: number): Promise<void> {
    await ForumSection.destroy({ where: { id: sectionId } });
  }

  async findByCategory(id: number): Promise<ForumSection[]> {
    return ForumSection.findAll({ where: { categoryId: id } });
  }
}

export default new ForumSectionService();
