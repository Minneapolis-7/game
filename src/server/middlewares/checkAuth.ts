import { NextFunction, Request, Response } from 'express';

import userApi from '@/api/userApi';

export default async function checkAuth(req: Request, res: Response, next: NextFunction) {
  const { uuid, authCookie } = req.cookies;
  const { yandexUser } = req.app.locals;

  try {
    if (!yandexUser) {
      req.app.locals.yandexUser = await userApi.getYandexUser(
        uuid && authCookie && { uuid, authCookie }
      );
      res.once('finish', () => {
        delete req.app.locals.yandexUser;
      });
    }

    next();
  } catch (e) {
    next();
  }
}
