import { Router } from 'express';

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

forumRouter.get('/stats', forumStatsApi.request);

forumRouter.get('/emojis', emojiApi.findAll);

forumRouter.get('/categories', forumCategoryApi.findAll);
forumRouter.post('/categories', forumCategoryApi.create);
forumRouter.delete('/categories/:id', forumCategoryApi.delete);

forumRouter.get('/sections/:id', forumSectionApi.find);
forumRouter.post('/sections', forumSectionApi.create);
forumRouter.delete('/sections/:id', forumSectionApi.delete);

forumRouter.get('/threads/:id', forumThreadApi.find);
forumRouter.post('/threads', forumThreadApi.create);
forumRouter.delete('/threads/:id', forumThreadApi.delete);
forumRouter.put('/threads/:id', forumThreadApi.update);

forumRouter.post('/comments', forumCommentApi.create);
forumRouter.delete('/comments/:id', forumCommentApi.delete);
forumRouter.put('/comments/:id', forumCommentApi.update);

forumRouter.put('/threads/:id/views', forumThreadApi.incrementVisited);

forumRouter.post('/threads/:id/emojis', forumThreadEmojiApi.create);
forumRouter.delete('/threads/:threadId/emojis/:emojiId', forumThreadEmojiApi.delete);

forumRouter.post('/comments/:id/emojis', forumCommentEmojiApi.create);
forumRouter.delete('/comments/:commentId/emojis/:emojiId', forumCommentEmojiApi.delete);

export default forumRouter;
