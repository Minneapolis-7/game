import { NextFunction, Request, Response } from 'express';

import userApi from '@/api/userApi';

export default async function checkAuth(req: Request, res: Response, next: NextFunction) {
  try {
    res.locals.user = await userApi.getUser(req.cookies.authCookie);
  } finally {
    next();
  }
}
