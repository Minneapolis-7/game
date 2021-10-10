import type { Request, Response } from 'express';

import { forumCommentEmojiService } from '@/server/services/forum';
import { HttpStatuses } from '@/shared/const/const';
import { EmojiUserIdentifier } from '@/shared/types/types';

export type CommentCreateEmojiRequest = Request<
  {
    id: string;
  },
  unknown,
  EmojiUserIdentifier
>;
export type CommentDeleteEmojiRequest = Request<
  {
    commentId: string;
    emojiId: string;
  },
  unknown,
  unknown,
  {
    user: string;
  }
>;

const forumCommentEmojiApi = {
  async create(request: CommentCreateEmojiRequest, response: Response): Promise<void> {
    const { id } = request.params;
    const { body } = request;

    try {
      const record = await forumCommentEmojiService.create({
        ...body,
        commentId: Number(id),
      });

      response.json(record);
    } catch (e) {
      response.status(HttpStatuses.SERVER_ERROR).json({
        error: e,
      });
    }
  },

  async delete(request: CommentDeleteEmojiRequest, response: Response): Promise<void> {
    const { commentId, emojiId } = request.params;
    const { user } = request.query;

    try {
      await forumCommentEmojiService.delete({
        commentId: Number(commentId),
        emojiId: Number(emojiId),
        userId: Number(user),
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
