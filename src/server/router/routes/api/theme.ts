import { Router } from 'express';

import themeAPI from '@/server/controllers/theme/themeAPI';
import { protect } from '@/server/middlewares';

const userThemeRouter = Router();

userThemeRouter.get('/', themeAPI.findAllThemes);
userThemeRouter.get('/:userId', [protect], themeAPI.getUserTheme);
userThemeRouter.post('/', [protect], themeAPI.setUserTheme);

export default userThemeRouter;
