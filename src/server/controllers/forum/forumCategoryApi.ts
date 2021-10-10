import type { Request, Response } from 'express';

import { ForumCategoryCreationAttributes } from '@/server/sequelize/models/Forum/ForumCategory';
import { forumCategoryService } from '@/server/services/forum';
import { HttpStatuses } from '@/shared/const/const';

export type CreateCategoryRequest = Request<unknown, unknown, ForumCategoryCreationAttributes>;
export type DeleteCategoryRequest = Request<{
  id: string;
}>;

const forumCategoryApi = {
  async create(request: CreateCategoryRequest, response: Response): Promise<void> {
    const { body } = request;

    try {
      const record = await forumCategoryService.create(body);

      response.json(record);
    } catch (e) {
      response.status(HttpStatuses.SERVER_ERROR).json({
        error: e,
      });
    }
  },

  async delete(request: DeleteCategoryRequest, response: Response): Promise<void> {
    const { id } = request.params;

    try {
      await forumCategoryService.delete(Number(id));
      response.sendStatus(200);
    } catch (e) {
      response.status(HttpStatuses.SERVER_ERROR).json({
        error: e,
      });
    }
  },

  async findAll(_request: Request, response: Response): Promise<void> {
    try {
      const records = await forumCategoryService.findAll();

      response.json(records);
    } catch (e) {
      response.status(HttpStatuses.SERVER_ERROR).json({
        error: e,
      });
    }
  },
};

export default forumCategoryApi;
