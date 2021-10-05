import type { Request, Response } from 'express';

import { ForumSectionCreationAttributes } from '@/server/sequelize/models/Forum/ForumSection';
import forumSectionService from '@/server/services/forum/ForumSectionService';

export type CreateSectionRequest = {
  body: ForumSectionCreationAttributes;
} & Request;

export type CreateSectionsRequest = {
  body: ForumSectionCreationAttributes[];
} & Request;

export type DeleteSectionRequest = {
  params: {
    id: number;
  };
} & Request;

export type FindSectionsByCategoryRequest = {
  params: {
    id: number;
  };
} & Request;

const forumSectionApi = {
  async create(request: CreateSectionRequest, response: Response): Promise<void> {
    const { body } = request;

    try {
      if (Array.isArray(body)) {
        await forumSectionApi.createBulk(request, response);

        return;
      }

      const record = await forumSectionService.create(body);

      response.json(record);
    } catch (e) {
      throw new Error(e);
    }
  },

  async createBulk(request: CreateSectionsRequest, response: Response): Promise<void> {
    const { body } = request;

    try {
      const records = await forumSectionService.createBulk(body);

      response.json(records);
    } catch (e) {
      throw new Error(e);
    }
  },

  async delete(request: DeleteSectionRequest): Promise<void> {
    const { id } = request.params;

    try {
      await forumSectionService.delete(Number(id));
    } catch (e) {
      throw new Error(e);
    }
  },

  async findByCategory(request: FindSectionsByCategoryRequest, response: Response): Promise<void> {
    const { id } = request.params;

    try {
      const records = await forumSectionService.findByCategory(Number(id));

      response.json(records);
    } catch (e) {
      throw new Error(e);
    }
  },
};

export default forumSectionApi;
