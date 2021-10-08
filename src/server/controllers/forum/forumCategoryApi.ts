import type { Request, Response } from 'express';

import { ForumCategoryCreationAttributes } from '@/server/sequelize/models/Forum/ForumCategory';
import { forumCategoryService } from '@/server/services/forum';
import { HttpStatuses } from '@/shared/const/const';

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
        await forumCategoryApi.createBulk(request, response);

        return;
      }

      const record = await forumCategoryService.create(body);

      response.json(record);
    } catch (e) {
      response.sendStatus(HttpStatuses.SERVER_ERROR);
    }
  },

  async createBulk(request: CreateCategoriesRequest, response: Response): Promise<void> {
    const { body } = request;

    try {
      const records = await forumCategoryService.createBulk(body);

      response.json(records);
    } catch (e) {
      response.sendStatus(HttpStatuses.SERVER_ERROR);
    }
  },

  async delete(request: DeleteCategoryRequest, response: Response): Promise<void> {
    const { id } = request.params;

    try {
      await forumCategoryService.delete(id);
    } catch (e) {
      response.sendStatus(HttpStatuses.SERVER_ERROR);
    }
  },

  async findAll(_request: Request, response: Response): Promise<void> {
    try {
      const records = await forumCategoryService.findAll();

      response.json(records);
    } catch (e) {
      response.sendStatus(HttpStatuses.SERVER_ERROR);
    }
  },
};

export default forumCategoryApi;
