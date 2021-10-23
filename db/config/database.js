// production использует env-переменные, установленные через Docker
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line import/no-extraneous-dependencies, global-require
  require('dotenv').config();
}

const { POSTGRES_DB_HOST, POSTGRES_PORT, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB } =
  process.env;
const baseDbOptions = {
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  port: POSTGRES_PORT,
  dialect: 'postgres',
};

module.exports = {
  development: {
    ...baseDbOptions,
    host: 'localhost',
  },
  production: {
    ...baseDbOptions,
    host: POSTGRES_DB_HOST,
  },
};
