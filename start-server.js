// eslint-disable-next-line import/no-unresolved, import/extensions
const { app } = require('./dist/server.js');

const { APP_PORT = 4000 } = process.env;

app.listen(APP_PORT, () => console.log(`Server http://localhost:${APP_PORT}`));
