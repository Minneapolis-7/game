import { Router } from 'express';

import { setApiRoutes } from './routes';

const router = Router();

setApiRoutes(router);

export default router;
