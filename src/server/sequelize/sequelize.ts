import { Sequelize, SequelizeOptions } from 'sequelize-typescript';

import * as models from './models';

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT, POSTGRES_DB_HOST } =
  process.env;

const sequelize = new Sequelize({
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  host: POSTGRES_DB_HOST || 'localhost',
  port: POSTGRES_PORT,
  dialect: 'postgres',
  models: Object.values(models),
} as SequelizeOptions);

export default sequelize;
