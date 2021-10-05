import { Sequelize, SequelizeOptions } from 'sequelize-typescript';

import { UserTheme } from './models';

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT, IS_DOCKER } = process.env;

console.log('-----ENV POSTGRES_USER', POSTGRES_USER);

const sequelize = new Sequelize({
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  // `localhost` используется только для разрабоки вне контейнера
  host: IS_DOCKER ? 'postgres' : 'localhost',
  port: POSTGRES_PORT,
  dialect: 'postgres',
} as SequelizeOptions);

export const User = sequelize.addModels([UserTheme]);

export default sequelize;
