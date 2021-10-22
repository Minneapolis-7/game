import { Router } from 'express';

import { apiRouter } from './routes';

const router = Router();

router.use('API_CUSTOM', apiRouter);

export default router;
