// eslint-disable-next-line import/no-unresolved, import/extensions
const { app } = require('./dist/server.js');

const { PORT = 4000 } = process.env;

app.listen(PORT, () => console.log(`Server http://localhost:${PORT}`));
