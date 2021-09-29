// eslint-disable-next-line import/no-unresolved, import/extensions
const { app, sequilize } = require('./dist/server.js');

const { APP_PORT = 4000 } = process.env;

sequilize.sync({ force: process.env.NODE_ENV !== 'production' }).then(() => {
  app.listen(APP_PORT, () => console.log(`Server http://localhost:${APP_PORT}`));
});
