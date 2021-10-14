import type { Request, Response } from 'express';

import { forumThreadEmojiService } from '@/server/services/forum';
import { HttpStatuses } from '@/shared/const/const';
import { EmojiUserIdentifier } from '@/shared/types/types';

export type ThreadCreateEmojiRequest = Request<
  {
    id: string;
  },
  unknown,
  EmojiUserIdentifier
>;
export type ThreadDeleteEmojiRequest = Request<
  {
    threadId: string;
    emojiId: string;
  },
  unknown,
  unknown,
  {
    user: string;
  }
>;

const forumThreadEmojiApi = {
  async create(request: ThreadCreateEmojiRequest, response: Response): Promise<void> {
    const { id } = request.params;
    const { body } = request;

    try {
      const threadEmojiUser = await forumThreadEmojiService.create({
        ...body,
        threadId: Number(id),
      });

      const record = await forumThreadEmojiService.find(threadEmojiUser.get('threadEmojiId'));

      response.json(record);
    } catch (e) {
      response.status(HttpStatuses.SERVER_ERROR).json({
        error: e,
      });
    }
  },

  async delete(request: ThreadDeleteEmojiRequest, response: Response): Promise<void> {
    const { threadId, emojiId } = request.params;
    const { user } = request.query;

    try {
      const deletedThreadEmoji = await forumThreadEmojiService.delete({
        threadId: Number(threadId),
        emojiId: Number(emojiId),
        userId: Number(user),
      });

      response.json(deletedThreadEmoji);
    } catch (e) {
      response.status(HttpStatuses.SERVER_ERROR).json({
        error: e,
      });
    }
  },
};

export default forumThreadEmojiApi;
