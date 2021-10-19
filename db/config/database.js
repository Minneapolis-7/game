// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config();

const { POSTGRES_DB_HOST, POSTGRES_PORT, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB } =
  process.env;

module.exports = {
  development: {
    username: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DB,
    host: POSTGRES_DB_HOST || 'localhost',
    port: POSTGRES_PORT,
    dialect: 'postgres',
  },
};
