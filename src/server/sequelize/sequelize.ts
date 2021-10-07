import { Sequelize, SequelizeOptions } from 'sequelize-typescript';

import * as models from './models';

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT, DB_HOST } = process.env;

const sequelize = new Sequelize({
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
<<<<<<< HEAD
=======
  // `localhost` используется только для разрабоки вне контейнера
>>>>>>> 6d4d555 (task-119: feat: начать таск)
  host: DB_HOST || 'localhost',
  port: POSTGRES_PORT,
  dialect: 'postgres',
  models: Object.values(models),
} as SequelizeOptions);

export default sequelize;
