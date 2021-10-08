import type { Request, Response } from 'express';

import { ForumThreadCreationAttributes } from '@/server/sequelize/models/Forum/ForumThread';
import { forumThreadService } from '@/server/services/forum';
import { ForumThreadUpdatePayload } from '@/server/services/forum/forumThreadService';
import { HttpStatuses } from '@/shared/const/const';

export type CreateThreadRequest = {
  body: ForumThreadCreationAttributes;
} & Request;

export type UpdateThreadRequest = {
  body: ForumThreadUpdatePayload;
  params: {
    id: number;
  };
} & Request;

export type ThreadRequest = {
  params: {
    id: number;
  };
} & Request;

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
      await forumThreadService.update(id, body);
      response.sendStatus(HttpStatuses.OK);
    } catch (e) {
      response.status(HttpStatuses.SERVER_ERROR).json({
        error: e,
      });
    }
  },

  // через какие http-глаголы использовать этот метод (и нужно ли это делать именно так)?
  async updateVisited(request: ThreadRequest, response: Response): Promise<void> {
    const { id } = request.params;

    try {
      await forumThreadService.updateVisited(id);
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
      await forumThreadService.delete(id);
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
      const record = await forumThreadService.find(id);

      response.json(record);
    } catch (e) {
      response.status(HttpStatuses.SERVER_ERROR).json({
        error: e,
      });
    }
  },
};

export default forumThreadApi;
