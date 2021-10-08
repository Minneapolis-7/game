import type { Request, Response } from 'express';

import { ForumSectionCreationAttributes } from '@/server/sequelize/models/Forum/ForumSection';
import { forumSectionService } from '@/server/services/forum';
import { HttpStatuses } from '@/shared/const/const';

export type CreateSectionRequest = {
  body: ForumSectionCreationAttributes;
} & Request;

export type CreateSectionsRequest = {
  body: ForumSectionCreationAttributes[];
} & Request;

export type SectionRequest = {
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
      response.status(HttpStatuses.SERVER_ERROR).json({
        error: e,
      });
    }
  },

  async createBulk(request: CreateSectionsRequest, response: Response): Promise<void> {
    const { body } = request;

    try {
      const records = await forumSectionService.createBulk(body);

      response.json(records);
    } catch (e) {
      response.status(HttpStatuses.SERVER_ERROR).json({
        error: e,
      });
    }
  },

  async delete(request: SectionRequest, response: Response): Promise<void> {
    const { id } = request.params;

    try {
      await forumSectionService.delete(id);
      response.sendStatus(HttpStatuses.OK);
    } catch (e) {
      response.status(HttpStatuses.SERVER_ERROR).json({
        error: e,
      });
    }
  },

  async find(request: SectionRequest, response: Response): Promise<void> {
    const { id } = request.params;

    try {
      const record = await forumSectionService.find(id);

      response.json(record);
    } catch (e) {
      response.status(HttpStatuses.SERVER_ERROR).json({
        error: e,
      });
    }
  },
};

export default forumSectionApi;
