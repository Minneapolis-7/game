import { Router } from 'express';

import { forum, theme, user } from '@/server/router/routes/api';

const apiRouter = Router();

apiRouter.use('/forum', forum);
apiRouter.use('/users', user);
apiRouter.use('/theme', theme);

export default apiRouter;
