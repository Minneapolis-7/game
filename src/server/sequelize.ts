import { Sequelize, SequelizeOptions } from 'sequelize-typescript';

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT_HOST } = process.env;

const sequelize = new Sequelize({
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  host: 'localhost',
  port: POSTGRES_PORT_HOST,
  dialect: 'postgres',
  models: [`${__dirname}/models`],
} as SequelizeOptions);

export default sequelize;
