import type { Request, Response } from 'express';

import { SurrogateCommentEmojiMixin } from '@/server/controllers/forum/forumThreadApi';
import { ForumCommentCreationAttributes } from '@/server/sequelize/models/Forum/ForumComment';
import { forumCommentService } from '@/server/services/forum';
import { ForumCommentUpdatePayload } from '@/server/services/forum/forumCommentService';
import { HttpStatuses } from '@/shared/const/const';
import { ForumCommentData, ForumEmojiData } from '@/shared/types/types';

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

async function findById(id: string) {
  const record = await forumCommentService.find(Number(id));

  if (!record) {
    return null;
  }

  const plainRecord = record.get({ plain: true }) as ForumCommentData;

  plainRecord.emojis.forEach((emoji) => {
    const modifiedEmoji = emoji as ForumEmojiData & SurrogateCommentEmojiMixin;
    const { commentEmojis } = modifiedEmoji;

    if (!commentEmojis) {
      return;
    }

    const { commentId } = commentEmojis[0];

    modifiedEmoji.users = commentEmojis.flatMap((item) => item.users);
    modifiedEmoji.commentId = commentId;

    delete modifiedEmoji.commentEmojis;
  });

  return plainRecord;
}

const forumCommentApi = {
  async create(request: CreateCommentRequest, response: Response): Promise<void> {
    const { body } = request;

    try {
      const commentRecord = await forumCommentService.create(body);
      const augumentedUser = await findById(commentRecord.id);

      response.json(augumentedUser);
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
