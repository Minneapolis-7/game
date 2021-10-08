import type { Request, Response } from 'express';

import { ForumCommentCreationAttributes } from '@/server/sequelize/models/Forum/ForumComment';
import { forumCommentService } from '@/server/services/forum';
import { ForumCommentUpdatePayload } from '@/server/services/forum/ForumCommentService';
import { HttpStatuses } from '@/shared/const/const';

export type CreateCommentRequest = {
  body: ForumCommentCreationAttributes;
} & Request;

export type UpdateCommentRequest = {
  body: ForumCommentUpdatePayload;
  params: {
    id: number;
  };
} & Request;

export type CommentRequest = {
  params: {
    id: number;
  };
} & Request;

const forumCommentApi = {
  async create(request: CreateCommentRequest, response: Response): Promise<void> {
    const { body } = request;

    try {
      const record = await forumCommentService.create(body);

      response.json(record);
    } catch (e) {
      response.status(HttpStatuses.SERVER_ERROR).json({
        error: e,
      });
    }
  },

  async update(request: UpdateCommentRequest, response: Response): Promise<void> {
    const { id } = request.params;
    const { body } = request;

    try {
      await forumCommentService.update(id, body);
      response.sendStatus(HttpStatuses.OK);
    } catch (e) {
      response.status(HttpStatuses.SERVER_ERROR).json({
        error: e,
      });
    }
  },

  async delete(request: CommentRequest, response: Response): Promise<void> {
    const { id } = request.params;

    try {
      await forumCommentService.delete(id);
      response.sendStatus(HttpStatuses.OK);
    } catch (e) {
      response.status(HttpStatuses.SERVER_ERROR).json({
        error: e,
      });
    }
  },
};

export default forumCommentApi;
