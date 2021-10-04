import type { Request, Response } from 'express';

import { ForumThreadCreationAttributes } from '@/server/sequelize/models/Forum/ForumThread';
import forumThreadService, {
  ForumThreadUpdatePayload,
} from '@/server/services/forum/ForumThreadService';

export type CreateThreadRequest = {
  body: ForumThreadCreationAttributes;
} & Request;

export type UpdateThreadRequest = {
  body: ForumThreadUpdatePayload;
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
      throw new Error(e);
    }
  },

  async update(request: UpdateThreadRequest): Promise<void> {
    const { id } = request.params;
    const { body } = request;

    try {
      await forumThreadService.update(Number(id), body);
    } catch (e) {
      throw new Error(e);
    }
  },

  // через какие http-глаголы использовать этот метод (и нужно ли это делать именно так)?
  async updateVisited(request: UpdateThreadVisitedRequest): Promise<void> {
    const { threadId } = request.params;

    try {
      await forumThreadService.updateVisited(threadId);
    } catch (e) {
      throw new Error(e);
    }
  },

  async delete(request: DeleteThreadRequest): Promise<void> {
    const { id } = request.params;

    try {
      await forumThreadService.delete(id);
    } catch (e) {
      throw new Error(e);
    }
  },

  async findBySection(request: FindThreadsBySectionRequest, response: Response): Promise<void> {
    const { id } = request.params;

    try {
      const records = await forumThreadService.findBySection(id);

      response.json(records);
    } catch (e) {
      throw new Error(e);
    }
  },

  async findByUser(request: FindThreadsByUserRequest, response: Response): Promise<void> {
    const { userId } = request.params;

    try {
      const records = await forumThreadService.findByUser(userId);

      response.json(records);
    } catch (e) {
      throw new Error(e);
    }
  },
};

export default forumThreadApi;
