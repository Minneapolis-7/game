import type { Request, Response } from 'express';

import { Emoji } from '@/server/sequelize/models';
import { UserAttributes } from '@/server/sequelize/models/User';
import { forumCommentEmojiService } from '@/server/services/forum';
import { HttpStatuses } from '@/shared/const/const';
import { EmojiUserIdentifier, ForumCommentEmojiData, ForumEmojiData } from '@/shared/types/types';

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
    const commentId = Number(id);

    try {
      const commentEmojiUser = await forumCommentEmojiService.create({
        ...body,
        commentId,
      });

      const record = await forumCommentEmojiService.find(commentEmojiUser.get('commentEmojiId'));

      if (!record) {
        response.json(record);

        return;
      }

      const plainRecord = record.get({ plain: true }) as ForumCommentEmojiData;

      const addedEmoji: ForumEmojiData = {
        ...(plainRecord.emoji as Required<Emoji>),
        users: plainRecord.users as UserAttributes[],
        commentId,
      };

      response.json(addedEmoji);
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
      const identifier = {
        commentId: Number(commentId),
        emojiId: Number(emojiId),
        userId: Number(user),
      };

      await forumCommentEmojiService.delete(identifier);

      response.json(identifier);
    } catch (e) {
      response.status(HttpStatuses.SERVER_ERROR).json({
        error: e,
      });
    }
  },
};

export default forumCommentEmojiApi;
