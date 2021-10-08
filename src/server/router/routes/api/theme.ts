import { Router } from 'express';

import ThemeAPI from '@/server/controllers/theme/themeAPI';

const userThemeRouter = Router();

userThemeRouter.get('/all', ThemeAPI.findAll);
userThemeRouter.post('/:id', ThemeAPI.find);

export default userThemeRouter;
