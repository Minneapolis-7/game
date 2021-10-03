import { Router } from 'express';

import { forumRoutes } from './routes';

const router = Router();

forumRoutes(router);

export default router;
