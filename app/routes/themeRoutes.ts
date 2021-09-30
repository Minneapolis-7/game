import {Router} from 'express';
import {ThemeAPI} from '../controllers/theme';

export const themesRoutes = (router) => {
  const themesRouter: Router = Router();

  themesRouter
      .post('/', ThemeAPI.create)
      .get('/', ThemeAPI.find);

  router.use('/theme', themesRouter);
};