import { Router } from 'express';

import { forumCategoryApi, forumSectionApi, forumThreadApi } from '@/server/controllers/forum';
import forumThreadEmojiApi from '@/server/controllers/forum/ForumThreadEmojiApi';

const forumRouter = Router();

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

forumRouter.post('/threads/:id/emojis', forumThreadEmojiApi.create);
forumRouter.delete('/threads/:id/emojis', forumThreadEmojiApi.delete);

export default forumRouter;
