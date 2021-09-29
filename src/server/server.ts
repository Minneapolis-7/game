import compression from 'compression';
import express from 'express';
import path from 'path';

import ssr from './middlewares/ssr';
import sequelize from './sequelize';

import settings from '../../webpack/settings';

const app = express();
const distStatic = path.resolve(__dirname, settings.paths.dist.static);

app.use(compression()).use(express.static(distStatic));

app.get('*', ssr);

// eslint-disable-next-line import/prefer-default-export
export { app, sequelize };
