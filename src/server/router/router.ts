import { Router } from 'express';

import { api } from './routes';

const router = Router();

api(router);

export default router;
