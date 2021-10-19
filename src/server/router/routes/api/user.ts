import { Router } from 'express';

import userApi from '@/server/controllers/userApi';

const userRouter = Router();

userRouter.post('/', userApi.create);
userRouter.get('/:yandexUserId', userApi.request);
userRouter.put('/:yandexUserId', userApi.update);

export default userRouter;
