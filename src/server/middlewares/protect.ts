import { NextFunction, Request, Response } from 'express';

import { HttpStatuses } from '@/shared/const/const';

const isProduction = process.env.NODE_ENV === 'production';

export default async function protect(req: Request, res: Response, next: NextFunction) {
  const { yandexUser } = req.app.locals;

  if (isProduction && !yandexUser) {
    res.sendStatus(HttpStatuses.CLIENT_ERROR_UNAUTHORIZED);

    return;
  }

  next();
}
