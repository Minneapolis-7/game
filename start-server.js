// eslint-disable-next-line import/no-unresolved, import/extensions
const { app, sequelize } = require('./dist/server.js');

const { execSync } = require('child_process');
const fs = require('fs');

const { APP_PORT = 4000 } = process.env;
const isProduction = process.env.NODE_ENV === 'production';
const DB_SEEDED_CHECK_PATH = './DB_SEEDED';
const isDbSeeded = fs.existsSync(DB_SEEDED_CHECK_PATH);

(async () => {
  try {
    await sequelize.sync({ alter: !isProduction });

    if (isProduction && !isDbSeeded) {
      execSync('npm run db:seed');
      fs.mkdirSync(DB_SEEDED_CHECK_PATH);
    }

    app.listen(APP_PORT, () => console.log(`Server http://localhost:${APP_PORT}`));
  } catch (e) {
    throw new Error(`Соединение с БД неудачно: ${e}`);
  }
})();
