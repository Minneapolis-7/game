import { Router } from 'express';

import { FORUM_API_BASE } from '@/api/forumApi';
import { protect } from '@/server/middlewares';
import { forum, theme, user } from '@/server/router/routes/api';

const apiRouter = Router();

apiRouter.use(FORUM_API_BASE, [protect], forum);
apiRouter.use('/user', user);
apiRouter.use('/theme', theme);

export default apiRouter;
