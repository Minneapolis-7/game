import { Router } from 'express';

import {
  FORUM_CATEGORIES_ENDPOINT,
  FORUM_COMMENTS_ENDPOINT,
  FORUM_EMOJIS_ENDPOINT,
  FORUM_POST_EMOJIS_ENDPOINT,
  FORUM_SECTIONS_ENDPOINT,
  FORUM_STATS_ENDPOINT,
  FORUM_THREADS_ENDPOINT,
} from '@/api/forumApi';
import {
  emojiApi,
  forumCategoryApi,
  forumCommentApi,
  forumCommentEmojiApi,
  forumSectionApi,
  forumStatsApi,
  forumThreadApi,
  forumThreadEmojiApi,
} from '@/server/controllers/forum';

const forumRouter = Router();

forumRouter.get(FORUM_STATS_ENDPOINT, forumStatsApi.request);

forumRouter.get(FORUM_EMOJIS_ENDPOINT, emojiApi.findAll);

forumRouter.get(FORUM_CATEGORIES_ENDPOINT, forumCategoryApi.findAll);
forumRouter.post(FORUM_CATEGORIES_ENDPOINT, forumCategoryApi.create);
forumRouter.delete(`${FORUM_CATEGORIES_ENDPOINT}/:id`, forumCategoryApi.delete);

forumRouter.get(`${FORUM_SECTIONS_ENDPOINT}/:id`, forumSectionApi.find);
forumRouter.post(FORUM_SECTIONS_ENDPOINT, forumSectionApi.create);
forumRouter.delete(`${FORUM_SECTIONS_ENDPOINT}/:id`, forumSectionApi.delete);

forumRouter.get(`${FORUM_THREADS_ENDPOINT}/:id`, forumThreadApi.find);
forumRouter.post(FORUM_THREADS_ENDPOINT, forumThreadApi.create);
forumRouter.delete(`${FORUM_THREADS_ENDPOINT}/:id`, forumThreadApi.delete);
forumRouter.put(`${FORUM_THREADS_ENDPOINT}/:id`, forumThreadApi.update);

forumRouter.post(FORUM_COMMENTS_ENDPOINT, forumCommentApi.create);
forumRouter.delete(`${FORUM_COMMENTS_ENDPOINT}/:id`, forumCommentApi.delete);
forumRouter.put(`${FORUM_COMMENTS_ENDPOINT}/:id`, forumCommentApi.update);

forumRouter.put(`${FORUM_THREADS_ENDPOINT}/:id/views`, forumThreadApi.incrementVisited);

forumRouter.post(
  `${FORUM_THREADS_ENDPOINT}/:id${FORUM_POST_EMOJIS_ENDPOINT}`,
  forumThreadEmojiApi.create
);
forumRouter.delete(
  `${FORUM_THREADS_ENDPOINT}/:threadId${FORUM_POST_EMOJIS_ENDPOINT}/:emojiId`,
  forumThreadEmojiApi.delete
);

forumRouter.post(
  `${FORUM_COMMENTS_ENDPOINT}/:id${FORUM_POST_EMOJIS_ENDPOINT}`,
  forumCommentEmojiApi.create
);
forumRouter.delete(
  `${FORUM_COMMENTS_ENDPOINT}/:commentId${FORUM_POST_EMOJIS_ENDPOINT}/:emojiId`,
  forumCommentEmojiApi.delete
);

export default forumRouter;
