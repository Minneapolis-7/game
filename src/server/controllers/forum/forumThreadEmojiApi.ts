import type { Request, Response } from 'express';

import { forumThreadEmojiService } from '@/server/services/forum';
import { ForumThreadEmojiUserIdentifier } from '@/server/services/forum/forumThreadEmojiService';
import { HttpStatuses } from '@/shared/const/const';

export type CreateThreadEmojiRequest = {
  body: Omit<ForumThreadEmojiUserIdentifier, 'threadId'>;
  params: {
    id: number;
  };
} & Request;

export type DeleteThreadRequest = CreateThreadEmojiRequest & Request;

const forumThreadEmojiApi = {
  async create(request: CreateThreadEmojiRequest, response: Response): Promise<void> {
    const { id: threadId } = request.params;
    const { body } = request;

    try {
      const record = await forumThreadEmojiService.create({
        threadId,
        ...body,
      });

      response.json(record);
    } catch (e) {
      response.status(HttpStatuses.SERVER_ERROR).json({
        error: e,
      });
    }
  },

  async delete(request: DeleteThreadRequest, response: Response): Promise<void> {
    const { id: threadId } = request.params;
    const { body } = request;

    try {
      await forumThreadEmojiService.delete({
        threadId,
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

export default forumThreadEmojiApi;
