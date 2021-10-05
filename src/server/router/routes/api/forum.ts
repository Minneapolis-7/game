import { Router } from 'express';

import { forumCategoryApi, forumSectionApi, forumThreadApi } from '@/server/controllers/forum';

const forumRouter = Router();

forumRouter.get('/categories', forumCategoryApi.findAll);
forumRouter.post('/categories', forumCategoryApi.create);
forumRouter.delete('/categories/:id', forumCategoryApi.delete);

// где должен определяться `findByCategory` — в API секций, или категорий? REST-синтаксис `/categories/:id/sections` заставляет задуматься
forumRouter.get('/categories/:id/sections', forumSectionApi.findByCategory);

forumRouter.post('/sections', forumSectionApi.create);
forumRouter.delete('/sections/:id', forumSectionApi.delete);

// где должен определяться `findBySection` — в API тредов, или секций? REST-синтаксис `/sections/:id/threads` заставляет задуматься
forumRouter.get('/sections/:id/threads', forumThreadApi.findBySection);

forumRouter.post('/threads', forumThreadApi.create);
forumRouter.delete('/threads/:id', forumThreadApi.delete);
forumRouter.put('/threads/:id', forumThreadApi.update);

export default forumRouter;
