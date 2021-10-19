import { Router } from 'express';

import { FORUM_API_BASE } from '@/api/forumApi';
import { forum, theme, user } from '@/server/router/routes/api';

const apiRouter = Router();

apiRouter.use(FORUM_API_BASE, forum);
apiRouter.use('/user', user);
apiRouter.use('/theme', theme);

export default apiRouter;
