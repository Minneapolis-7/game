import { Router } from 'express';

import ThemeAPI from '../controllers/themeAPI';

const userThemeRoutes = (router: Router): void => {
  const userThemeRouter: Router = Router();

  userThemeRouter.get('/', ThemeAPI.find);

  router.use('/theme', userThemeRouter);
};

export default userThemeRoutes;
