import { Router } from 'express';

import { API_CUSTOM } from '@/shared/const/const';

import { apiRouter } from './routes';

const router = Router();

router.use(API_CUSTOM, apiRouter);

export default router;
