import type { Request, Response } from 'express';

import { ForumCommentEmojiAttributes } from '@/server/sequelize/models/Forum/ForumCommentEmoji';
import { ForumThreadCreationAttributes } from '@/server/sequelize/models/Forum/ForumThread';
import { ForumThreadEmojiAttributes } from '@/server/sequelize/models/Forum/ForumThreadEmoji';
import { UserAttributes } from '@/server/sequelize/models/User';
import { forumThreadService } from '@/server/services/forum';
import { ForumThreadUpdatePayload } from '@/server/services/forum/forumThreadService';
import { HttpStatuses } from '@/shared/const/const';
import { ForumEmojiData, ForumThreadData } from '@/shared/types/types';
import uniqueBy from '@/shared/utils/uniqueBy';

export type CreateThreadRequest = Request<unknown, unknown, ForumThreadCreationAttributes>;
export type UpdateThreadRequest = Request<
  {
    id: string;
  },
  unknown,
  ForumThreadUpdatePayload
>;
export type ThreadRequest = Request<{
  id: string;
}>;

export type SurrogateThreadEmojiMixin = {
  threadEmojis?: (ForumThreadEmojiAttributes & {
    users: UserAttributes[];
  })[];
};
export type SurrogateCommentEmojiMixin = {
  commentEmojis?: (ForumCommentEmojiAttributes & {
    users: UserAttributes[];
  })[];
};

const forumThreadApi = {
  async create(request: CreateThreadRequest, response: Response): Promise<void> {
    const { body } = request;

    try {
      const record = await forumThreadService.create(body);

      response.json(record);
    } catch (e) {
      response.status(HttpStatuses.SERVER_ERROR).json({
        error: e,
      });
    }
  },

  async update(request: UpdateThreadRequest, response: Response): Promise<void> {
    const { id } = request.params;
    const { body } = request;

    try {
      await forumThreadService.update(Number(id), body);
      response.sendStatus(HttpStatuses.OK);
    } catch (e) {
      response.status(HttpStatuses.SERVER_ERROR).json({
        error: e,
      });
    }
  },

  // todo: https://stackoverflow.com/questions/1426845/incrementing-resource-counter-in-a-restful-way-put-vs-post
  async incrementVisited(request: ThreadRequest, response: Response): Promise<void> {
    const { id } = request.params;

    try {
      await forumThreadService.incrementVisited(Number(id));
      response.sendStatus(HttpStatuses.OK);
    } catch (e) {
      response.status(HttpStatuses.SERVER_ERROR).json({
        error: e,
      });
    }
  },

  async delete(request: ThreadRequest, response: Response): Promise<void> {
    const { id } = request.params;

    try {
      await forumThreadService.delete(Number(id));
      response.sendStatus(HttpStatuses.OK);
    } catch (e) {
      response.status(HttpStatuses.SERVER_ERROR).json({
        error: e,
      });
    }
  },

  async find(request: ThreadRequest, response: Response): Promise<void> {
    const { id } = request.params;

    try {
      const record = await forumThreadService.find(Number(id));

      if (!record) {
        response.json(record);

        return;
      }

      const plainRecord = record.get({ plain: true }) as ForumThreadData;

      plainRecord.emojis.forEach((emoji) => {
        const modifiedEmoji = emoji as ForumEmojiData & SurrogateThreadEmojiMixin;
        const { threadEmojis } = modifiedEmoji;

        if (!threadEmojis) {
          return;
        }

        const { threadId } = threadEmojis[0];

        modifiedEmoji.users = threadEmojis.flatMap((item) => item.users);
        modifiedEmoji.threadId = threadId;

        delete modifiedEmoji.threadEmojis;
      });

      plainRecord.comments.forEach((comment) => {
        comment.emojis.forEach((emoji) => {
          const modifiedEmoji = emoji as ForumEmojiData & SurrogateCommentEmojiMixin;
          const { commentEmojis } = modifiedEmoji;

          if (!commentEmojis) {
            return;
          }

          modifiedEmoji.users = uniqueBy(
            'id',
            commentEmojis
              .filter(({ commentId }) => commentId === comment.id)
              .flatMap((item) => item.users)
          );
          modifiedEmoji.commentId = comment.id;

          delete modifiedEmoji.commentEmojis;
        });
      });

      response.json(plainRecord);
    } catch (e) {
      response.status(HttpStatuses.SERVER_ERROR).json({
        error: e,
      });
    }
  },
};

export default forumThreadApi;
