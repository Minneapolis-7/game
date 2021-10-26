import { NextFunction, Request, Response } from 'express';

import { HttpStatuses } from '@/shared/const/const';

export default async function protect(_req: Request, res: Response, next: NextFunction) {
  const { user } = res.locals;

  if (!user) {
    res.sendStatus(HttpStatuses.CLIENT_ERROR_UNAUTHORIZED);

    return;
  }

  next();
}
