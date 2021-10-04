import compression from 'compression';
import express from 'express';
import path from 'path';

import ssr from './middlewares/ssr';
import sequelize from './sequelize/sequelize';
import router from './router';

import settings from '../../webpack/settings';

const app = express();
const distStatic = path.resolve(__dirname, settings.paths.dist.static);

app
  .use(compression())
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(express.static(distStatic))
  .use(router);

app.get('*', ssr);

export { app, sequelize };
