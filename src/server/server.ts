import compression from 'compression';
import cookieParser from 'cookie-parser';
import express from 'express';
import path from 'path';

import router from './router/router';
import sequelize from './sequelize/sequelize';
import { checkAuth, ssr } from './middlewares';

import settings from '../../webpack/settings';

const app = express();
const distStatic = path.resolve(__dirname, settings.paths.dist.static);

app
  .use(cookieParser())
  .use(checkAuth)
  .use(compression())
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(express.static(distStatic))
  .use(router);

app.get('*', ssr);

export { app, sequelize };
