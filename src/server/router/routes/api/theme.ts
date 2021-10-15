import { Router } from 'express';

import ThemeAPI from '@/server/controllers/theme/themeAPI';

const userThemeRouter = Router();

userThemeRouter.get('/all', ThemeAPI.findAll);
userThemeRouter.get('/:id', ThemeAPI.find);
userThemeRouter.post('/', ThemeAPI.save);

export default userThemeRouter;
