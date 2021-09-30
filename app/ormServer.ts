import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import express from 'express';

const sequelizeOptions: SequelizeOptions = {
  host: 'localhost',
  port: 5432,
  username: 'user',
  password: 'pass',
  database: 'dbname',
  dialect: 'postgres'
};

const sequelize = new Sequelize(sequelizeOptions); 

const server = express();

server
    .disable('x-powered-by')
    .enable('trust proxy')
    // .set('query parser', queryParser)
    // .use(cookieParser())
    // .use(logger)
    .use(router);
    // .use(notFound);

(async function() {
    await sequelize.sync({force: true});
    server.listen(...);
})();    