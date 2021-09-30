const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'game-db',
  password: 'test',
  port: 5432,
});

client.connect();

client
  .query('SELECT * FROM cookies WHERE owner_id = 2')
  .then((res) => {
    console.log(res.rows);
    client.end();
  })
  .catch((err) => {
    console.log('error', err);
  });
