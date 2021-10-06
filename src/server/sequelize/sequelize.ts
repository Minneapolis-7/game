import { Sequelize, SequelizeOptions } from 'sequelize-typescript';

import * as models from './models';
// import { UserTheme } from './models';

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT, IS_DOCKER } = process.env;

const sequelize = new Sequelize({
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  // `localhost` используется только для разрабоки вне контейнера
  host: IS_DOCKER ? 'postgres' : 'localhost',
  port: POSTGRES_PORT,
  dialect: 'postgres',
  models: Object.values(models),
} as SequelizeOptions);

// sequelize.addModels([UserTheme]);

export default sequelize;
