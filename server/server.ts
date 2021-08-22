import express from 'express';
import path from 'path';

const { PORT = 4000 } = process.env;

const frontendDistPath = path.join(__dirname, 'static');

const app = express();

app.use(express.static(frontendDistPath));

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'static/index.html'));
});

app.listen(PORT, () => console.log(`Server http://localhost:${PORT}`));
