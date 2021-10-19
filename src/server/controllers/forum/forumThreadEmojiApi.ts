import type { Request, Response } from 'express';

import { Emoji } from '@/server/sequelize/models';
import { UserAttributes } from '@/server/sequelize/models/User';
import { forumThreadEmojiService } from '@/server/services/forum';
import { HttpStatuses } from '@/shared/const/const';
import { EmojiUserIdentifier, ForumEmojiData, ForumThreadEmojiData } from '@/shared/types/types';

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
    const threadId = Number(id);

    try {
      const threadEmojiUser = await forumThreadEmojiService.create({
        ...body,
        threadId,
      });

      const record = await forumThreadEmojiService.find(threadEmojiUser.get('threadEmojiId'));

      if (!record) {
        response.json(record);

        return;
      }

      const plainRecord = record.get({ plain: true }) as ForumThreadEmojiData;

      const addedEmoji: ForumEmojiData = {
        ...(plainRecord.emoji as Required<Emoji>),
        users: plainRecord.users as UserAttributes[],
        threadId,
      };

      response.json(addedEmoji);
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
      const identifier = {
        threadId: Number(threadId),
        emojiId: Number(emojiId),
        userId: Number(user),
      };

      await forumThreadEmojiService.delete(identifier);

      response.json(identifier);
    } catch (e) {
      response.status(HttpStatuses.SERVER_ERROR).json({
        error: e,
      });
    }
  },
};

export default forumThreadEmojiApi;
