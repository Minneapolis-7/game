import { Router } from 'express';

import themeAPI from '@/server/controllers/theme/themeAPI';

const userThemeRouter = Router();

userThemeRouter.get('/', themeAPI.findAllThemes);
userThemeRouter.get('/:userId', themeAPI.getUserTheme);
userThemeRouter.post('/', themeAPI.setUserTheme);

export default userThemeRouter;
