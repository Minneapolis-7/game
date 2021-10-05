import { Router } from 'express';

import ThemeAPI from '../controllers/themeAPI';

const userThemeRouter = Router();

userThemeRouter.get('/', ThemeAPI.find);

export default userThemeRouter;
