import {Router} from 'express';
import {ThemeAPI} from '../controllers/theme';

export const userThemeRoutes = (router) => {
  const userThemeRoutes: Router = Router();

  userThemeRoutes
      .post('/', ThemeAPI.create)
      .get('/', ThemeAPI.find);

  router.use('/theme', userThemeRoutes);
};