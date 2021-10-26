import { NextFunction, Request, Response } from 'express';

import userApi from '@/api/userApi';
import { HttpStatuses } from '@/shared/const/const';

export default async function protect(req: Request, res: Response, next: NextFunction) {
  try {
    await userApi.getYandexUser(req.cookies.authCookie);
    next();
  } catch (e) {
    res.sendStatus(HttpStatuses.CLIENT_ERROR_UNAUTHORIZED);
  }
}
