import type { Request, Response } from 'express';

import { ForumCategoryCreationAttributes } from '@/server/sequelize/models/Forum/ForumCategory';
import forumCategoryService from '@/server/services/forum/ForumCategoryService';

export type CreateCategoryRequest = {
  body: ForumCategoryCreationAttributes;
} & Request;

export type CreateCategoriesRequest = {
  body: ForumCategoryCreationAttributes[];
} & Request;

export type DeleteCategoryRequest = {
  params: {
    id: number;
  };
} & Request;

const forumCategoryApi = {
  async create(request: CreateCategoryRequest, response: Response): Promise<void> {
    const { body } = request;

    try {
      if (Array.isArray(body)) {
        await this.createBulk(request, response);

        return;
      }

      const record = await forumCategoryService.create(body);

      response.json(record);
    } catch (e) {
      throw new Error(e);
    }
  },

  async createBulk(request: CreateCategoriesRequest, response: Response): Promise<void> {
    const { body } = request;

    try {
      const records = await forumCategoryService.createBulk(body);

      response.json(records);
    } catch (e) {
      throw new Error(e);
    }
  },

  async delete(request: DeleteCategoryRequest): Promise<void> {
    const { id } = request.params;

    try {
      await forumCategoryService.delete(Number(id));
    } catch (e) {
      throw new Error(e);
    }
  },

  async findAll(_request: Request, response: Response): Promise<void> {
    try {
      const records = await forumCategoryService.findAll();

      response.json(records);
    } catch (e) {
      throw new Error(e);
    }
  },
};

export default forumCategoryApi;
