import { Router } from 'express';

import userApi from '@/server/controllers/userApi';
import { protect } from '@/server/middlewares';

const userRouter = Router();

userRouter.post('/', userApi.create);
userRouter.get('/:userId', [protect], userApi.request);
userRouter.put('/:userId', [protect], userApi.update);

export default userRouter;
