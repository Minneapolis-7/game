import { Router } from 'express';

import userThemeRouter from './routes/userThemeRoutes';

const router = Router();

router.use('/theme', userThemeRouter);

export default router;
