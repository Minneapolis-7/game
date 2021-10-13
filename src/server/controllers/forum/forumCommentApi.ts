import type { Request, Response } from 'express';

import { ForumCommentCreationAttributes } from '@/server/sequelize/models/Forum/ForumComment';
import { forumCommentService } from '@/server/services/forum';
import { ForumCommentUpdatePayload } from '@/server/services/forum/forumCommentService';
import { HttpStatuses } from '@/shared/const/const';

export type CreateCommentRequest = Request<unknown, unknown, ForumCommentCreationAttributes>;
export type UpdateCommentRequest = Request<
  {
    id: string;
  },
  unknown,
  ForumCommentUpdatePayload
>;
export type CommentRequest = Request<{
  id: string;
}>;

const forumCommentApi = {
  async create(request: CreateCommentRequest, response: Response): Promise<void> {
    const { body } = request;

    try {
      const commentRecord = await forumCommentService.create(body);
      const commentWithUser = await forumCommentService.find(commentRecord.id);

      response.json(commentWithUser);
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
      await forumCommentService.update(Number(id), body);
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
      await forumCommentService.delete(Number(id));
      response.sendStatus(HttpStatuses.OK);
    } catch (e) {
      response.status(HttpStatuses.SERVER_ERROR).json({
        error: e,
      });
    }
  },
};

export default forumCommentApi;
