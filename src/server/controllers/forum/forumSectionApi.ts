import type { Request, Response } from 'express';

import { ForumSectionCreationAttributes } from '@/server/sequelize/models/Forum/ForumSection';
import { forumSectionService } from '@/server/services/forum';
import { HttpStatuses } from '@/shared/const/const';

export type CreateSectionRequest = Request<unknown, unknown, ForumSectionCreationAttributes>;
export type SectionRequest = Request<{
  id: string;
}>;

const forumSectionApi = {
  async create(request: CreateSectionRequest, response: Response): Promise<void> {
    const { body } = request;

    try {
      const record = await forumSectionService.create(body);

      response.json(record);
    } catch (e) {
      response.status(HttpStatuses.SERVER_ERROR).json({
        error: e,
      });
    }
  },

  async delete(request: SectionRequest, response: Response): Promise<void> {
    const { id } = request.params;

    try {
      await forumSectionService.delete(Number(id));
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
      const record = await forumSectionService.find(Number(id));

      response.json(record);
    } catch (e) {
      response.status(HttpStatuses.SERVER_ERROR).json({
        error: e,
      });
    }
  },
};

export default forumSectionApi;
