var express = require('express');
var router = express.Router();

const pg = require('pg');
const path = require('path');
const connectionString = process.env.DATABASE_URL || 'postgres://postgres:1234@localhost:5432/postgres';

/* GET home page. */
router.post('/api/v1/books', (req, res, next) => {
    const results = [];
    // Grab data from http request
    console.log(req.body.test, 'DATA1');
    console.log(req.body, 'DATA2');
    console.log(req.params, 'DATA3');
    const data = req.body;
    // Get a Postgres client from the connection pool
    pg.connect(connectionString, (err, client, done) => {
        // console.log(req, 'data');
        // Handle connection errors
        // if(err) {
        //     done();
        //     console.log(err);
        //     return res.status(500).json({success: false, data: err});
        // }
        // SQL Query > Insert Data
        const value = 'test3';
        client.query('INSERT INTO books (title) values ($1)', [data.title]);
        // SQL Query > Select Data
        // const query = client.query('SELECT * FROM books');
        // // Stream results back one row at a time
        // query.on('row', (row) => {
        //     results.push(row);
        // });
        // After all data is returned, close connection and return results
        // query.on('end', () => {
            done();
            // res.send({ title: 'Express' });
            return res.json(results);
        // });
    });
});

// router.get('/api/v1/todos', (req, res, next) => {
//     const results = [];
//     // Get a Postgres client from the connection pool
//     pg.connect(connectionString, (err, client, done) => {
//         // Handle connection errors
//         if(err) {
//             done();
//             console.log(err);
//             return res.status(500).json({success: false, data: err});
//         }
//         // SQL Query > Select Data
//         const query = client.query('SELECT * FROM items ORDER BY id ASC;');
//         // Stream results back one row at a time
//         query.on('row', (row) => {
//             results.push(row);
//         });
//         // After all data is returned, close connection and return results
//         query.on('end', () => {
//             done();
//             return res.json(results);
//         });
//     });
// });
//
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
