const express = require('express');
const app = express();

const {Client} = require('pg');

const client = new Client({
    connectionString: 'postgres://postgres:1234@localhost:5432/postgres',
    ssl: false,
});
var resp;

client.connect();
//var db = pgp('postgres://postgres:1234@localhost:5432/postgres')

//var pgp = require('pg-promise')(/*options*/)
//var db = pgp('postgres://username:password@host:port/database')

app.get('/', (req, res) => {
    client.query('SELECT * FROM customers;', (err, res) => {
        if (err) throw err;
        resp = res.rows;
        for (let row of res.rows) {
            console.log(JSON.stringify(row));
        }
        client.end()
    });

    res.send(resp || 'sorry')
});

app.listen(process.env.PORT || 5000, () => console.log('Example app listening on port 3000!'))

/*app.get('/', (req, res) => {
 db.one('SELECT $1 AS value', 123)
 .then(function (data) {
 console.log('DATA:', data.value)

 res.send('j')
 })
 .catch(function (error) {
 console.log('ERROR:', error)
 res.send(error)
 })
 //res.send('Hello World!')
 })

 app.listen(3000, () => console.log('Example app listening on port 3000!'))

 app.get('/dev', function (req, res) {
 res.send('Hello, you are now on the Dev route!');
 });*/
	