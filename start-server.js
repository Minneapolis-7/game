// eslint-disable-next-line import/no-unresolved, import/extensions
const { app, sequelize } = require('./dist/server.js');

const { execSync } = require('child_process');

const { APP_PORT = 4000 } = process.env;

(async () => {
  try {
    await sequelize.sync({ alter: process.env.NODE_ENV !== 'production' });

    execSync('npm run db:seed');

    app.listen(APP_PORT, () => console.log(`Server http://localhost:${APP_PORT}`));
  } catch (e) {
    throw new Error(`Соединение с БД неудачно: ${e}`);
  }
})();
