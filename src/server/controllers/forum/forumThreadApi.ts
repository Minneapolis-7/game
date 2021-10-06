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

export type UpdateThreadVisitedRequest = {
  params: {
    threadId: number;
  };
} & Request;

export type DeleteThreadRequest = {
  params: {
    id: number;
  };
} & Request;

export type FindThreadsBySectionRequest = {
  params: {
    id: number;
  };
} & Request;

export type FindThreadsByUserRequest = {
  params: {
    userId: number;
  };
} & Request;

const forumThreadApi = {
  async create(request: CreateThreadRequest, response: Response): Promise<void> {
    const { body } = request;

    try {
      const record = await forumThreadService.create(body);

      response.json(record);
    } catch (e) {
      response.sendStatus(HttpStatuses.SERVER_ERROR);
    }
  },

  async update(request: UpdateThreadRequest, response: Response): Promise<void> {
    const { id } = request.params;
    const { body } = request;

    try {
      await forumThreadService.update(id, body);
    } catch (e) {
      response.sendStatus(HttpStatuses.SERVER_ERROR);
    }
  },

  // через какие http-глаголы использовать этот метод (и нужно ли это делать именно так)?
  async updateVisited(request: UpdateThreadVisitedRequest, response: Response): Promise<void> {
    const { threadId } = request.params;

    try {
      await forumThreadService.updateVisited(threadId);
    } catch (e) {
      response.sendStatus(HttpStatuses.SERVER_ERROR);
    }
  },

  async delete(request: DeleteThreadRequest, response: Response): Promise<void> {
    const { id } = request.params;

    try {
      await forumThreadService.delete(id);
    } catch (e) {
      response.sendStatus(HttpStatuses.SERVER_ERROR);
    }
  },

  async findBySection(request: FindThreadsBySectionRequest, response: Response): Promise<void> {
    const { id } = request.params;

    try {
      const records = await forumThreadService.findBySection(id);

      response.json(records);
    } catch (e) {
      response.sendStatus(HttpStatuses.SERVER_ERROR);
    }
  },

  async findByUser(request: FindThreadsByUserRequest, response: Response): Promise<void> {
    const { userId } = request.params;

    try {
      const records = await forumThreadService.findByUser(userId);

      response.json(records);
    } catch (e) {
      response.sendStatus(HttpStatuses.SERVER_ERROR);
    }
  },
};

export default forumThreadApi;
