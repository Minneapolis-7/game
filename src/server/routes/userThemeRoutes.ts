import { Router } from 'express';

import ThemeAPI from '../controllers/theme/themeAPI';

const userThemeRouter = Router();

userThemeRouter.get('/all', ThemeAPI.findAll);
userThemeRouter.post('/:id', ThemeAPI.find);

export default userThemeRouter;
