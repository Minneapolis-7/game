import type { Request, Response } from 'express';

import { ForumThreadCreationAttributes } from '@/server/sequelize/models/Forum/ForumThread';
import { forumThreadService } from '@/server/services/forum';
import { ForumThreadUpdatePayload } from '@/server/services/forum/forumThreadService';

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

const forumEmojiApi = {
  async create(request: CreateThreadRequest, response: Response): Promise<void> {
    const { body } = request;

    try {
      const record = await forumThreadService.create(body);

      response.json(record);
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

  async findByThread(request: FindThreadsBySectionRequest, response: Response): Promise<void> {
    const { id } = request.params;

    try {
      const records = await forumThreadService.findBySection(id);

      response.json(records);
    } catch (e) {
      throw new Error(e);
    }
  },

  async findByComment(request: FindThreadsByUserRequest, response: Response): Promise<void> {
    const { userId } = request.params;

    try {
      const records = await forumThreadService.findByUser(userId);

      response.json(records);
    } catch (e) {
      throw new Error(e);
    }
  },
};

export default forumEmojiApi;
