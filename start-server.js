// eslint-disable-next-line import/no-unresolved, import/extensions
const { app, sequelize } = require('./dist/server.js');

const { APP_PORT = 4000 } = process.env;

(async () => {
  try {
    await sequelize.sync({ force: process.env.NODE_ENV !== 'production' });

    app.listen(APP_PORT, () => console.log(`Server http://localhost:${APP_PORT}`));
  } catch (e) {
    throw new Error(`Соединение с БД неудачно: ${e}`);
  }
})();
