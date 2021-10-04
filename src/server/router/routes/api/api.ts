import { Router } from 'express';

import { forum } from '@/server/router/routes/api';
import { API_CUSTOM } from '@/shared/const/const';

export default function api(router: Router) {
  const apiRouter = Router();

  apiRouter.use('/forum', forum);

  router.use(API_CUSTOM, apiRouter);
}
