import type { Request, Response } from 'express';

import { forumThreadEmojiService } from '@/server/services/forum';
import { ForumThreadEmojiUserIdentifier } from '@/server/services/forum/forumThreadEmojiService';

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
      throw new Error(e);
    }
  },

  async delete(request: DeleteThreadRequest): Promise<void> {
    const { id: threadId } = request.params;
    const { body } = request;

    try {
      await forumThreadEmojiService.delete({
        threadId,
        ...body,
      });
    } catch (e) {
      throw new Error(e);
    }
  },
};

export default forumThreadEmojiApi;
