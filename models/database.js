const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://postgres:1234@localhost:5432/postgres';

const client = new pg.Client(connectionString);
client.connect(function (err, client, done) {
    const query = client.query(new pg.Query ('CREATE TABLE items(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)'));
    query.on('end', () => { client.end(); });
});
