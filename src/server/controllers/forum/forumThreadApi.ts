import type { Request, Response } from 'express';

import { ForumThreadCreationAttributes } from '@/server/sequelize/models/Forum/ForumThread';
import { forumThreadService } from '@/server/services/forum';
import { ForumThreadUpdatePayload } from '@/server/services/forum/forumThreadService';
import { HttpStatuses } from '@/shared/const/const';

export type CreateThreadRequest = Request<unknown, unknown, ForumThreadCreationAttributes>;
export type UpdateThreadRequest = Request<
  {
    id: string;
  },
  unknown,
  ForumThreadUpdatePayload
>;
export type ThreadRequest = Request<{
  id: string;
}>;

const forumThreadApi = {
  async create(request: CreateThreadRequest, response: Response): Promise<void> {
    const { body } = request;

    try {
      const record = await forumThreadService.create(body);

      response.json(record);
    } catch (e) {
      response.status(HttpStatuses.SERVER_ERROR).json({
        error: e,
      });
    }
  },

  async update(request: UpdateThreadRequest, response: Response): Promise<void> {
    const { id } = request.params;
    const { body } = request;

    try {
      await forumThreadService.update(Number(id), body);
      response.sendStatus(HttpStatuses.OK);
    } catch (e) {
      response.status(HttpStatuses.SERVER_ERROR).json({
        error: e,
      });
    }
  },

  // todo: https://stackoverflow.com/questions/1426845/incrementing-resource-counter-in-a-restful-way-put-vs-post
  async incrementVisited(request: ThreadRequest, response: Response): Promise<void> {
    const { id } = request.params;

    try {
      await forumThreadService.incrementVisited(Number(id));
      response.sendStatus(HttpStatuses.OK);
    } catch (e) {
      response.status(HttpStatuses.SERVER_ERROR).json({
        error: e,
      });
    }
  },

  async delete(request: ThreadRequest, response: Response): Promise<void> {
    const { id } = request.params;

    try {
      await forumThreadService.delete(Number(id));
      response.sendStatus(HttpStatuses.OK);
    } catch (e) {
      response.status(HttpStatuses.SERVER_ERROR).json({
        error: e,
      });
    }
  },

  async find(request: ThreadRequest, response: Response): Promise<void> {
    const { id } = request.params;

    try {
      const record = await forumThreadService.find(Number(id));

      response.json(record);
    } catch (e) {
      response.status(HttpStatuses.SERVER_ERROR).json({
        error: e,
      });
    }
  },
};

export default forumThreadApi;
