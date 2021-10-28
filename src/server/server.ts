import compression from 'compression';
import cookieParser from 'cookie-parser';
import express from 'express';
import helmet from 'helmet';
import path from 'path';

import router from './router/router';
import sequelize from './sequelize/sequelize';
import { checkAuth, nonce, ssr } from './middlewares';

import settings from '../../webpack/settings';

const app = express();
const distStatic = path.resolve(__dirname, settings.paths.dist.static);
const isProduction = process.env.NODE_ENV === 'production';

app
  .use(cookieParser())
  .use(compression())
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(express.static(distStatic))
  .use(nonce)
  .use((req, res, next) => {
    const { nonce: nonceValue } = res.locals;

    helmet({
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'script-src': ["'self'", `'nonce-${nonceValue}'`, !isProduction ? "'unsafe-eval'" : ''],
          'style-src': ["'self'", "'unsafe-inline'"],
          'connect-src': ["'self'", 'ya-praktikum.tech'],
          'img-src': ["'self'", 'data:', 'ya-praktikum.tech'],
          'object-src': ["'self'"],
        },
      },
    })(req, res, next);
  })
  .use(checkAuth)
  .use(router);

app.get('*', ssr);

export { app, sequelize };
