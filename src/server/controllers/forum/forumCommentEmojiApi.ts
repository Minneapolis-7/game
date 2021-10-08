import type { Request, Response } from 'express';

import { forumCommentEmojiService } from '@/server/services/forum';
import { ForumCommentEmojiUserIdentifier } from '@/server/services/forum/forumCommentEmojiService';
import { HttpStatuses } from '@/shared/const/const';

export type CreateCommentEmojiRequest = {
  body: Omit<ForumCommentEmojiUserIdentifier, 'commentId'>;
  params: {
    id: number;
  };
} & Request;

export type DeleteCommentRequest = CreateCommentEmojiRequest & Request;

const forumCommentEmojiApi = {
  async create(request: CreateCommentEmojiRequest, response: Response): Promise<void> {
    const { id: commentId } = request.params;
    const { body } = request;

    try {
      const record = await forumCommentEmojiService.create({
        commentId,
        ...body,
      });

      response.json(record);
    } catch (e) {
      response.status(HttpStatuses.SERVER_ERROR).json({
        error: e,
      });
    }
  },

  async delete(request: DeleteCommentRequest, response: Response): Promise<void> {
    const { id: commentId } = request.params;
    const { body } = request;

    try {
      await forumCommentEmojiService.delete({
        commentId,
        ...body,
      });
      response.sendStatus(HttpStatuses.OK);
    } catch (e) {
      response.status(HttpStatuses.SERVER_ERROR).json({
        error: e,
      });
    }
  },
};

export default forumCommentEmojiApi;
