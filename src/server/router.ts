import { Router } from 'express';

import userThemeRoutes from './routes/userThemeRoutes';

const router: Router = Router();

userThemeRoutes(router);

export default router;
